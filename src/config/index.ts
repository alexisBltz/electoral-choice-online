import { z } from 'zod';

// Esquemas de validación de configuración
const EnvConfigSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  VITE_API_BASE_URL: z.string().url().default('http://localhost:8080'),
  VITE_APP_NAME: z.string().default('Sistema Electoral Digital'),
  VITE_ORG_NAME: z.string().default('ONPE'),
  VITE_APP_VERSION: z.string().default('1.0.0'),
  VITE_ENABLE_LOGGING: z.string().transform(val => val === 'true').default('true'),
  VITE_REFRESH_INTERVAL: z.string().transform(val => parseInt(val, 10)).default('30000'),
  VITE_TOAST_DURATION: z.string().transform(val => parseInt(val, 10)).default('5000'),
  VITE_MAX_UPLOAD_SIZE: z.string().transform(val => parseInt(val, 10)).default('5242880'), // 5MB
});

type EnvConfig = z.infer<typeof EnvConfigSchema>;

// Función para obtener configuración del entorno
function getEnvConfig(): EnvConfig {
  const env = {
    NODE_ENV: import.meta.env.NODE_ENV,
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
    VITE_ORG_NAME: import.meta.env.VITE_ORG_NAME,
    VITE_APP_VERSION: import.meta.env.VITE_APP_VERSION,
    VITE_ENABLE_LOGGING: import.meta.env.VITE_ENABLE_LOGGING,
    VITE_REFRESH_INTERVAL: import.meta.env.VITE_REFRESH_INTERVAL,
    VITE_TOAST_DURATION: import.meta.env.VITE_TOAST_DURATION,
    VITE_MAX_UPLOAD_SIZE: import.meta.env.VITE_MAX_UPLOAD_SIZE,
  };

  try {
    return EnvConfigSchema.parse(env);
  } catch (error) {
    console.error('Error parsing environment configuration:', error);
    throw new Error('Invalid environment configuration');
  }
}

// Configuración principal de la aplicación
export const appConfig = getEnvConfig();

// Configuraciones específicas por entorno
export const config = {
  // Configuración general
  app: {
    name: appConfig.VITE_APP_NAME,
    organization: appConfig.VITE_ORG_NAME,
    version: appConfig.VITE_APP_VERSION,
    environment: appConfig.NODE_ENV,
    enableLogging: appConfig.VITE_ENABLE_LOGGING,
  },

  // Configuración de API
  api: {
    baseUrl: appConfig.VITE_API_BASE_URL,
    timeout: 10000,
    retries: 3,
    endpoints: {
      auth: {
        login: '/api/auth/login',
        register: '/api/auth/register',
        logout: '/api/auth/logout',
        refresh: '/api/auth/refresh',
        profile: '/api/auth/profile',
      },
      candidates: {
        list: '/api/candidates',
        create: '/api/candidates',
        update: '/api/candidates',
        delete: '/api/candidates',
        search: '/api/candidates/search',
      },
      votes: {
        cast: '/api/votes/cast',
        results: '/api/votes/results',
        status: '/api/votes/status',
      },
      admin: {
        stats: '/api/admin/stats',
        users: '/api/admin/users',
        config: '/api/admin/config',
      },
    },
  },

  // Configuración de UI
  ui: {
    refreshInterval: appConfig.VITE_REFRESH_INTERVAL,
    toastDuration: appConfig.VITE_TOAST_DURATION,
    maxUploadSize: appConfig.VITE_MAX_UPLOAD_SIZE,
    animationDuration: 200,
    debounceDelay: 300,
  },

  // Configuración de validación
  validation: {
    password: {
      minLength: 8,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
      errorMessage: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número',
    },
    dni: {
      length: 8,
      pattern: /^\d{8}$/,
      errorMessage: 'El DNI debe tener 8 dígitos',
    },
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMessage: 'Ingrese un email válido',
    },
    name: {
      minLength: 2,
      maxLength: 100,
      pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      errorMessage: 'El nombre debe contener solo letras y espacios',
    },
  },

  // Configuración de colores para candidatos
  candidateColors: {
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      border: 'border-blue-200',
      accent: 'bg-blue-500',
      hover: 'hover:bg-blue-50',
    },
    red: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-200',
      accent: 'bg-red-500',
      hover: 'hover:bg-red-50',
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-200',
      accent: 'bg-green-500',
      hover: 'hover:bg-green-50',
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-800',
      border: 'border-purple-200',
      accent: 'bg-purple-500',
      hover: 'hover:bg-purple-50',
    },
  },

  // Configuración de rutas
  routes: {
    home: '/',
    login: '/login',
    register: '/register',
    dashboard: '/dashboard',
    candidates: '/candidates',
    voting: '/voting',
    results: '/results',
    admin: '/admin',
    profile: '/profile',
    notFound: '*',
  },

  // Configuración de almacenamiento local
  storage: {
    keys: {
      authStore: 'auth-store',
      appStore: 'app-store',
      userPreferences: 'user-preferences',
      theme: 'theme',
    },
  },

  // Configuración de características por entorno
  features: {
    enableDevTools: appConfig.NODE_ENV === 'development',
    enableAnalytics: appConfig.NODE_ENV === 'production',
    enableMockData: appConfig.NODE_ENV === 'development',
    enableHotReload: appConfig.NODE_ENV === 'development',
  },
} as const;
