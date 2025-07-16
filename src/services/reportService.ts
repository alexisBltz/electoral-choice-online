// src/services/reportService.ts

import { ApiResponse, CandidateVotesDTO, OverallResultsDTO } from '../types/reports';

/**
 * Configuración base para el servicio de reportes
 */
const REPORTS_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const API_TIMEOUT = 10000; // 10 segundos

/**
 * Clase para manejar las llamadas a la API del reports-service
 */
class ReportService {
  private baseUrl: string;
  private timeout: number;

  constructor(baseUrl: string = REPORTS_API_BASE_URL, timeout: number = API_TIMEOUT) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  /**
   * Obtiene el token JWT del localStorage o sessionStorage
   * @returns El token JWT o null si no existe
   */
  private getAuthToken(): string | null {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  }

  /**
   * Crea los headers para las peticiones HTTP
   * @returns Headers con autorización y content-type
   */
  private createHeaders(): HeadersInit {
    const token = this.getAuthToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Realiza una petición HTTP con manejo de errores
   * @param endpoint - El endpoint relativo a la base URL
   * @param options - Opciones adicionales para fetch
   * @returns Promise con la respuesta parseada
   */
  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          ...this.createHeaders(),
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        // Intentar parsear el error del backend
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // Si no se puede parsear, usar el mensaje por defecto
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('La petición ha excedido el tiempo límite');
        }
        throw error;
      }
      
      throw new Error('Error desconocido en la petición');
    }
  }

  /**
   * Obtiene el reporte de votos por candidato
   * @returns Promise con el array de votos por candidato
   */
  async getVotesByCandidate(): Promise<CandidateVotesDTO[]> {
    const response = await this.makeRequest<CandidateVotesDTO[]>('/api/v1/reports/votes-by-candidate');
    
    if (!response.success) {
      throw new Error(response.message || 'Error al obtener votos por candidato');
    }

    return response.data || [];
  }

  /**
   * Obtiene el reporte de resultados generales
   * @returns Promise con los resultados generales
   */
  async getOverallResults(): Promise<OverallResultsDTO> {
    const response = await this.makeRequest<OverallResultsDTO>('/api/v1/reports/overall-results');
    
    if (!response.success) {
      throw new Error(response.message || 'Error al obtener resultados generales');
    }

    if (!response.data) {
      throw new Error('No se recibieron datos de resultados generales');
    }

    return response.data;
  }

  /**
   * Fuerza la actualización de los datos de reportes
   * @returns Promise que se resuelve cuando la actualización es exitosa
   */
  async refreshReports(): Promise<void> {
    const response = await this.makeRequest<void>('/api/v1/reports/refresh', {
      method: 'POST',
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Error al refrescar los reportes');
    }
  }

  /**
   * Verifica si el servicio está disponible
   * @returns Promise que se resuelve si el servicio responde
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/actuator/health`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000), // 5 segundos para health check
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Instancia singleton del servicio
export const reportService = new ReportService();

// Exportar la clase para casos donde se necesite una instancia personalizada
export default ReportService;

