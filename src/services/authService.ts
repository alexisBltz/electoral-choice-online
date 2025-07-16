import { BaseApiService } from './http';
import { User, AuthCredentials, RegisterData, ApiResponse } from '@/types';
import { config } from '@/config';
import { LOCAL_STORAGE_KEYS } from '@/constants';
import { Mail } from 'lucide-react';

interface AuthResponse {
  user: User;
  token: string;
}

// Interfaz para el registro actualizada según tu API
interface RegisterRequestApi {
  fullName: string;
  username: string;
  password: string;
}

// Interfaz para el login actualizada según tu API
interface LoginRequestApi {
  username: string;
  password: string;
}

export class AuthService extends BaseApiService {
  constructor() {
    super(config.api.endpoints.auth.login.replace('/login', ''));
  }

  async login(credentials: LoginRequestApi): Promise<ApiResponse<AuthResponse>> {
    try {

      // Llamada real a la API
      const response = await this.client.post<{ token: string }>(
        this.buildUrl('/login'),
        credentials
      );

      if (!response.token) {
        return {
          success: false,
          message: 'Credenciales inválidas',
        };
      }

      // Crear objeto usuario a partir de la respuesta
      const user: User = {
        id: Date.now(), // O extraer del token JWT
        name: credentials.username.split('@')[0],
        email: credentials.username,
        dni: '', // Se puede obtener del perfil después
        hasVoted: false,
        isAdmin: credentials.username.includes('admin'),
        createdAt: new Date()
      };

      // Store in localStorage
      console.log('Login exitoso:', response);
      console.log('Guardando token en localStorage:', response.token);

      localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, response.token);
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(user));

      console.log('Token guardado:', localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN));
      console.log('User guardado:', localStorage.getItem(LOCAL_STORAGE_KEYS.USER));
      
      return {
        success: true,
        data: { user, token: response.token },
        message: 'Inicio de sesión exitoso'
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async register(data: RegisterRequestApi): Promise<ApiResponse<{ message: string; email: string }>> {
    try {

      // Llamada real a la API
      const response = await this.client.post<{ message: string; email: string }>(
        this.buildUrl('/register'),
        data
      );

      return {
        success: true,
        data: response,
        message: 'Registro exitoso'
      };
    } catch (error) {
      if (error.message.includes('409')) {
        return {
          success: false,
          message: 'El correo electrónico ya está en uso',
        };
      }

      return this.handleError(error);
    }
  }

  async logout(): Promise<ApiResponse<void>> {
    try {
      if (config.features.enableMockData) {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
        localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
        
        return {
          success: true,
          message: 'Sesión cerrada exitosamente'
        };
      }

      await this.client.post(this.buildUrl('/logout'));
      
      // Limpiar localStorage independientemente de la respuesta
      localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
      
      return {
        success: true,
        message: 'Sesión cerrada exitosamente'
      };
    } catch (error) {
      // Limpiar localStorage aún si hay error
      localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
      return this.handleError(error);
    }
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
  }

  getToken(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
  }

  async refreshToken(): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await this.client.post<AuthResponse>(
        this.buildUrl('/refresh')
      );
      
      return {
        success: true,
        data: response,
        message: 'Token renovado'
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getProfile(): Promise<ApiResponse<User>> {
    try {
      const response = await this.client.get<User>(
        this.buildUrl('/profile')
      );
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateProfile(updates: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const response = await this.client.patch<User>(
        this.buildUrl('/profile'),
        updates
      );
      
      return {
        success: true,
        data: response,
        message: 'Perfil actualizado exitosamente'
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
}

// Instancia singleton del servicio
export const authService = new AuthService();