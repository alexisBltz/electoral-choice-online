import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { authService } from '@/services';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean };

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    name: string;
    dni: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Verificar si el usuario está autenticado al cargar la app
    const checkAuth = () => {
      if (authService.isAuthenticated()) {
        const user = authService.getCurrentUser();
        if (user) {
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        }
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const response = await authService.login({ email, password });
      
      if (response.success && response.data) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: response.error || 'Error de autenticación' });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Error de conexión' });
    }
  };

  const register = async (userData: {
    name: string;
    dni: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const response = await authService.register(userData);
      
      if (response.success && response.data) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: response.error || 'Error en el registro' });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Error de conexión' });
    }
  };

  const logout = () => {
    authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    clearError
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
