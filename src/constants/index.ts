export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh'
  },
  CANDIDATES: {
    LIST: '/api/candidates',
    CREATE: '/api/candidates',
    UPDATE: '/api/candidates',
    DELETE: '/api/candidates'
  },
  VOTES: {
    CAST: '/api/votes/cast',
    RESULTS: '/api/votes/results'
  },
  ADMIN: {
    STATS: '/api/admin/stats',
    USERS: '/api/admin/users'
  }
} as const;

export const CANDIDATE_COLORS = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-200',
    accent: 'bg-blue-500'
  },
  red: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-200',
    accent: 'bg-red-500'
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200',
    accent: 'bg-green-500'
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-200',
    accent: 'bg-purple-500'
  }
} as const;

export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  DNI_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  DNI_PATTERN: /^\d{8}$/
} as const;

export const APP_CONFIG = {
  APP_NAME: 'Sistema Electoral Digital',
  ORGANIZATION: 'ONPE',
  DESCRIPTION: 'Sistema Electoral Digital de la Oficina Nacional de Procesos Electorales del Perú',
  VERSION: '1.0.0',
  REFRESH_INTERVAL: 30000, // 30 segundos
  TOAST_DURATION: 5000
} as const;

export const ROUTES = {
  // Rutas principales
  HOME: '/',
  NOT_FOUND: '*',
  
  // Autenticación
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password'
  },
  
  // Dashboard
  DASHBOARD: {
    HOME: '/dashboard',
    OVERVIEW: '/dashboard/overview',
    ANALYTICS: '/dashboard/analytics',
    NOTIFICATIONS: '/dashboard/notifications'
  },
  
  // Candidatos
  CANDIDATES: {
    HOME: '/candidates',
    LIST: '/candidates/list',
    DETAIL: '/candidates/:id',
    CREATE: '/candidates/create',
    EDIT: '/candidates/:id/edit',
    ANALYTICS: '/candidates/analytics'
  },
  
  // Votación
  VOTING: {
    HOME: '/voting',
    PORTAL: '/voting/portal',
    BALLOT: '/voting/ballot',
    CONFIRMATION: '/voting/confirmation',
    GUIDE: '/voting/guide'
  },
  
  // Resultados
  RESULTS: {
    HOME: '/results',
    ELECTIONS: '/results/elections',
    ANALYTICS: '/results/analytics',
    REAL_TIME: '/results/real-time'
  },
  
  // Administración
  ADMIN: {
    HOME: '/admin',
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    ELECTIONS: '/admin/elections',
    SYSTEM: '/admin/system'
  },
  
  // Configuración
  SETTINGS: {
    HOME: '/settings',
    SYSTEM: '/settings/system',
    USER: '/settings/user',
    SECURITY: '/settings/security',
    INTEGRATIONS: '/settings/integrations'
  },
  
  // Reportes
  REPORTS: {
    HOME: '/reports',
    OVERVIEW: '/reports/overview',
    GENERATOR: '/reports/generator',
    STATUS: '/reports/status',
    SCHEDULED: '/reports/scheduled'
  },
  
  // Perfil de usuario
  PROFILE: {
    HOME: '/profile',
    EDIT: '/profile/edit',
    SECURITY: '/profile/security',
    PREFERENCES: '/profile/preferences'
  }
} as const;

export const LOCAL_STORAGE_KEYS = {
  USER: 'electoral_user',
  TOKEN: 'electoral_token',
  THEME: 'electoral_theme'
} as const;
