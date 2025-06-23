// Re-exports centralizados para todas las páginas del sistema

// Páginas principales
import HomePageComponent from './HomePage';
import NotFoundComponent from './NotFound';

export { HomePageComponent as Index };
export { NotFoundComponent as NotFound };

// Módulo de autenticación
export * from './auth';

// Módulo de dashboard
export * from './dashboard';

// Módulo de candidatos
export * from './candidates';

// Módulo de votación
export * from './voting';

// Módulo de resultados
export * from './results';

// Módulo de administración
export * from './admin';

// Módulo de configuración
export * from './settings';

// Módulo de reportes
export * from './reports';

// Módulo de perfil
export * from './profile';
