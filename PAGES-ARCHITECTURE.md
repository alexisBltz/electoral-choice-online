# Estructura de Páginas - Sistema Electoral Digital

## Arquitectura Modular de Páginas

El sistema ha sido refactorizado para tener una estructura de páginas altamente modular y escalable, organizada por dominios funcionales y subdominios.

## Estructura de Directorios

```
src/pages/
├── index.ts                    # Re-exports centralizados
├── Index.tsx                   # Página principal
├── NotFound.tsx               # Página 404
├── auth/                      # Módulo de autenticación
│   ├── index.ts
│   ├── LoginPage.tsx
│   └── RegisterPage.tsx
├── dashboard/                 # Módulo de dashboard
│   ├── index.ts
│   ├── DashboardOverviewPage.tsx
│   ├── DashboardAnalyticsPage.tsx
│   └── DashboardNotificationsPage.tsx
├── candidates/                # Módulo de candidatos
│   ├── index.ts
│   ├── CandidateListPage.tsx
│   ├── CandidateDetailPage.tsx
│   ├── CandidateFormPage.tsx
│   └── CandidateAnalyticsPage.tsx
├── voting/                    # Módulo de votación
│   ├── index.ts
│   ├── VotingPortalPage.tsx
│   ├── VotingBallotPage.tsx
│   ├── VotingConfirmationPage.tsx
│   └── VotingGuidePage.tsx
├── results/                   # Módulo de resultados
│   ├── index.ts
│   ├── ElectionResultsPage.tsx
│   └── ResultsAnalyticsPage.tsx
├── admin/                     # Módulo de administración
│   ├── index.ts
│   └── AdminDashboardPage.tsx
├── settings/                  # Módulo de configuración
│   ├── index.ts
│   └── SystemSettingsPage.tsx
├── reports/                   # Módulo de reportes
│   ├── index.ts
│   ├── ReportsOverviewPage.tsx
│   ├── ReportGeneratorPage.tsx
│   └── ReportStatusPage.tsx
└── profile/                   # Módulo de perfil
    └── UserProfilePage.tsx
```

## Rutas del Sistema

### Rutas Principales
- `/` - Página principal
- `*` - Página 404

### Autenticación (`/auth`)
- `/auth/login` - Página de inicio de sesión
- `/auth/register` - Página de registro

### Dashboard (`/dashboard`)
- `/dashboard` - Dashboard principal (overview)
- `/dashboard/overview` - Vista general del dashboard
- `/dashboard/analytics` - Análisis y métricas
- `/dashboard/notifications` - Centro de notificaciones

### Candidatos (`/candidates`)
- `/candidates` - Lista de candidatos
- `/candidates/list` - Lista de candidatos (alias)
- `/candidates/:id` - Detalle de candidato
- `/candidates/create` - Crear nuevo candidato
- `/candidates/:id/edit` - Editar candidato
- `/candidates/analytics` - Análisis de candidatos

### Votación (`/voting`)
- `/voting` - Portal de votación
- `/voting/portal` - Portal de votación (alias)
- `/voting/ballot` - Boleta electoral
- `/voting/confirmation` - Confirmación de voto
- `/voting/guide` - Guía de votación

### Resultados (`/results`)
- `/results` - Resultados electorales
- `/results/elections` - Resultados electorales (alias)
- `/results/analytics` - Análisis de resultados

### Administración (`/admin`)
- `/admin` - Dashboard de administración
- `/admin/dashboard` - Dashboard de administración (alias)

### Configuración (`/settings`)
- `/settings` - Configuración del sistema
- `/settings/system` - Configuración del sistema (alias)

### Reportes (`/reports`)
- `/reports` - Centro de reportes
- `/reports/overview` - Vista general de reportes (alias)
- `/reports/generator` - Generador de reportes
- `/reports/status` - Estado de reportes

### Perfil (`/profile`)
- `/profile` - Perfil de usuario

## Características de la Arquitectura

### Modularidad
- Cada módulo funcional tiene su propia carpeta
- Imports/exports centralizados en archivos `index.ts`
- Componentes de página reutilizables y independientes

### Escalabilidad
- Fácil agregar nuevas páginas a cada módulo
- Estructura consistente entre módulos
- Separación clara de responsabilidades

### Mantenibilidad
- Código organizado por dominio funcional
- Navegación programática usando constantes de rutas
- Documentación clara de la estructura

### Navegación
- Router centralizado en `src/components/AppRouter.tsx`
- Constantes de rutas definidas en `src/constants/index.ts`
- Navegación programática usando `useNavigate()`

## Cómo Agregar Nuevas Páginas

### 1. Agregar página a un módulo existente
```typescript
// Crear archivo: src/pages/candidates/CandidateReportsPage.tsx
import React from 'react';

const CandidateReportsPage: React.FC = () => {
  return <div>Nueva página de reportes de candidatos</div>;
};

export default CandidateReportsPage;
```

### 2. Actualizar el índice del módulo
```typescript
// En src/pages/candidates/index.ts
export { default as CandidateReportsPage } from './CandidateReportsPage';
```

### 3. Agregar ruta al router
```typescript
// En src/components/AppRouter.tsx
<Route path="/candidates/reports" element={<CandidateReportsPage />} />
```

### 4. Actualizar constantes de rutas
```typescript
// En src/constants/index.ts
CANDIDATES: {
  // ...rutas existentes
  REPORTS: '/candidates/reports'
}
```

## Buenas Prácticas

### Nomenclatura
- Archivos de página terminan en `Page.tsx`
- Nombres descriptivos y específicos
- CamelCase para componentes
- kebab-case para rutas

### Organización
- Un componente por archivo
- Imports organizados (externos primero, internos después)
- Props tipadas con TypeScript
- Uso de hooks personalizados para lógica de negocio

### Navegación
- Usar constantes de rutas en lugar de strings hardcodeados
- Implementar breadcrumbs cuando sea apropiado
- Manejar estados de carga y error

### UX/UI
- Consistencia en diseño entre páginas del mismo módulo
- Uso de componentes UI reutilizables
- Implementación de skeleton loaders
- Manejo adecuado de estados vacíos

## Integración con Stores

Cada página puede conectarse a los stores de Zustand correspondientes:

```typescript
import { useAuthStore } from '@/store/authStore';
import { useCandidatesStore } from '@/store/candidatesStore';

const CandidateListPage: React.FC = () => {
  const { user } = useAuthStore();
  const { candidates, loading, fetchCandidates } = useCandidatesStore();
  
  // Lógica del componente...
};
```

## Testing

Para cada página se recomienda:
- Tests unitarios de componentes
- Tests de integración con stores
- Tests de navegación
- Tests de accesibilidad

```typescript
// Ejemplo: CandidateListPage.test.tsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CandidateListPage from './CandidateListPage';

test('renders candidate list page', () => {
  render(
    <BrowserRouter>
      <CandidateListPage />
    </BrowserRouter>
  );
  
  expect(screen.getByText('Lista de Candidatos')).toBeInTheDocument();
});
```

Esta estructura modular permite un crecimiento ordenado y mantenible del sistema electoral digital.
