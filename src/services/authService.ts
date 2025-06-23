import { BaseApiService } from './http';
import { User, AuthCredentials, RegisterData, ApiResponse } from '@/types';
import { config } from '@/config';
import { LOCAL_STORAGE_KEYS } from '@/constants';

interface AuthResponse {
  user: User;
  token: string;
}

export class AuthService extends BaseApiService {
  constructor() {
    super(config.api.endpoints.auth.login.replace('/login', ''));
  }

  async login(credentials: AuthCredentials): Promise<ApiResponse<AuthResponse>> {
    try {
      // Mock implementation for development
      if (config.features.enableMockData) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser: User = {
          id: 1,
          name: credentials.email === 'admin@onpe.gob.pe' ? 'Administrador ONPE' : 'Usuario Demo',
          email: credentials.email,
          dni: '12345678',
          hasVoted: false,
          isAdmin: credentials.email === 'admin@onpe.gob.pe',
          createdAt: new Date()
        };

        const token = 'mock-jwt-token-' + Date.now();
        
        // Store in localStorage for compatibility
        localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token);
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(mockUser));

        return {
          success: true,
          data: { user: mockUser, token },
          message: 'Inicio de sesión exitoso'
        };
      }

      const response = await this.client.post<AuthResponse>(
        this.buildUrl('/login'),
        credentials
      );
      
      return {
        success: true,
        data: response,
        message: 'Inicio de sesión exitoso'
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async register(data: RegisterData): Promise<ApiResponse<AuthResponse>> {
    try {
      // Mock implementation for development
      if (config.features.enableMockData) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser: User = {
          id: Date.now(),
          name: data.name,
          email: data.email,
          dni: data.dni,
          hasVoted: false,
          isAdmin: false,
          createdAt: new Date()
        };

        const token = 'mock-jwt-token-' + Date.now();
        
        // Store in localStorage for compatibility
        localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token);
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(mockUser));

        return {
          success: true,
          data: { user: mockUser, token },
          message: 'Registro exitoso'
        };
      }

      const response = await this.client.post<AuthResponse>(
        this.buildUrl('/register'),
        data
      );
      
      return {
        success: true,
        data: response,
        message: 'Registro exitoso'
      };
    } catch (error) {
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
      
      return {
        success: true,
        message: 'Sesión cerrada exitosamente'
      };
    } catch (error) {
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
