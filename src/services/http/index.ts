import { config } from '@/config';

// Tipos para las configuraciones de HTTP
interface RequestConfig {
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
}

interface RequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

// Clase base para manejo de HTTP
export class HttpClient {
  private baseUrl: string;
  private defaultConfig: RequestConfig;

  constructor(baseUrl: string, defaultConfig: RequestConfig = {}) {
    this.baseUrl = baseUrl;
    this.defaultConfig = {
      timeout: 10000,
      retries: 3,
      headers: {
        'Content-Type': 'application/json',
      },
      ...defaultConfig,
    };
  }

  private async executeRequest<T>(
    url: string,
    options: RequestOptions = {},
    retryCount = 0
  ): Promise<T> {
    const fullUrl = url.startsWith('http') ? url : `${this.baseUrl}${url}`;
    const timeout = options.timeout || this.defaultConfig.timeout!;
    const maxRetries = options.retries || this.defaultConfig.retries!;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(fullUrl, {
        ...options,
        headers: {
          ...this.defaultConfig.headers,
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }

      return await response.text() as T;
    } catch (error) {
      clearTimeout(timeoutId);

      if (retryCount < maxRetries && this.shouldRetry(error)) {
        console.log(`Retrying request to ${fullUrl} (attempt ${retryCount + 1}/${maxRetries})`);
        await this.delay(1000 * Math.pow(2, retryCount)); // Exponential backoff
        return this.executeRequest(url, options, retryCount + 1);
      }

      throw error;
    }
  }

  private shouldRetry(error: unknown): boolean {
    if (error instanceof Error) {
      // Retry on network errors but not on 4xx client errors
      return error.name === 'AbortError' || 
             error.message.includes('fetch') ||
             error.message.includes('Network');
    }
    return false;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async get<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.executeRequest<T>(url, { ...options, method: 'GET' });
  }

  async post<T>(url: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.executeRequest<T>(url, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(url: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.executeRequest<T>(url, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(url: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.executeRequest<T>(url, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.executeRequest<T>(url, { ...options, method: 'DELETE' });
  }

  setAuthToken(token: string): void {
    this.defaultConfig.headers = {
      ...this.defaultConfig.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  removeAuthToken(): void {
    const { Authorization, ...headers } = this.defaultConfig.headers || {};
    this.defaultConfig.headers = headers;
  }
}

// Cliente HTTP configurado para la aplicación
export const httpClient = new HttpClient(config.api.baseUrl, {
  timeout: config.api.timeout,
  retries: config.api.retries,
});

// Factory para crear servicios API
export class ApiServiceFactory {
  private static instance: ApiServiceFactory;
  private client: HttpClient;

  private constructor() {
    this.client = httpClient;
  }

  static getInstance(): ApiServiceFactory {
    if (!ApiServiceFactory.instance) {
      ApiServiceFactory.instance = new ApiServiceFactory();
    }
    return ApiServiceFactory.instance;
  }

  getClient(): HttpClient {
    return this.client;
  }

  setAuthToken(token: string): void {
    this.client.setAuthToken(token);
  }

  removeAuthToken(): void {
    this.client.removeAuthToken();
  }
}

// Clase base para servicios API
export abstract class BaseApiService {
  protected client: HttpClient;
  protected baseEndpoint: string;

  constructor(baseEndpoint: string) {
    this.client = ApiServiceFactory.getInstance().getClient();
    this.baseEndpoint = baseEndpoint;
  }

  protected buildUrl(path: string = ''): string {
    return `${this.baseEndpoint}${path}`;
  }

  protected handleError(error: unknown): { success: false; error: string } {
    console.error('API Error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('HTTP Error: 401')) {
        return { success: false, error: 'No autorizado. Por favor, inicia sesión nuevamente.' };
      }
      if (error.message.includes('HTTP Error: 403')) {
        return { success: false, error: 'No tienes permisos para realizar esta acción.' };
      }
      if (error.message.includes('HTTP Error: 404')) {
        return { success: false, error: 'Recurso no encontrado.' };
      }
      if (error.message.includes('HTTP Error: 500')) {
        return { success: false, error: 'Error interno del servidor.' };
      }
      if (error.name === 'AbortError') {
        return { success: false, error: 'La solicitud ha tardado demasiado tiempo.' };
      }
      return { success: false, error: error.message };
    }
    
    return { success: false, error: 'Error desconocido' };
  }
}

// Interceptores para logging y manejo de errores globales
export class ApiInterceptors {
  static setupRequestInterceptor(): void {
    if (config.features.enableDevTools) {
      const originalFetch = window.fetch;
      window.fetch = async (...args) => {
        console.log('API Request:', args[0], args[1]);
        const response = await originalFetch(...args);
        console.log('API Response:', response.status, response.statusText);
        return response;
      };
    }
  }

  static setupErrorInterceptor(): void {
    window.addEventListener('unhandledrejection', (event) => {
      if (event.reason?.message?.includes('HTTP Error')) {
        console.error('Unhandled API Error:', event.reason);
        // Aquí puedes agregar lógica para mostrar notificaciones globales
      }
    });
  }
}
