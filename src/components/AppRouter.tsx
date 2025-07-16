import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Páginas principales
import { Index, NotFound } from '@/pages';

// Páginas de autenticación
import { LoginPage, RegisterPage } from '@/pages/auth';

// Páginas de dashboard
import { 
  DashboardOverviewPage, 
  DashboardAnalyticsPage, 
  DashboardNotificationsPage 
} from '@/pages/dashboard';

// Páginas de candidatos
import { 
  CandidateListPage,
  CandidateDetailPage,
  CandidateFormPage,
  CandidateAnalyticsPage
} from '@/pages/candidates';

// Páginas de votación
import { 
  VotingPortalPage,
  VotingBallotPage,
  VotingConfirmationPage,
  VotingGuidePage
} from '@/pages/voting';

// Páginas de resultados
import { 
  ElectionResultsPage,
  ResultsAnalyticsPage
} from '@/pages/results';

// Páginas de administración
import { AdminDashboardPage } from '@/pages/admin';

// Páginas de configuración
import { SystemSettingsPage } from '@/pages/settings';

// Páginas de reportes
import { 
  ReportsOverviewPage,
  ReportGeneratorPage,
  ReportStatusPage
} from '@/pages/reports';

// Página de perfil de usuario
import UserProfilePage from '@/pages/profile/UserProfilePage';

// Función para verificar si el token existe y es válido
const checkTokenValidity = (): boolean => {
  const token = localStorage.getItem('electoral_token');
  const tokenTimestamp = localStorage.getItem('tokenTimestamp');
  
  if (!token || !tokenTimestamp) {
    return false;
  }
  
  const currentTime = Date.now();
  const tokenTime = parseInt(tokenTimestamp, 10);
  const oneHour = 60 * 60 * 1000; // 1 hora en milisegundos
  
  // Si ha pasado más de 1 hora, eliminar el token
  if (currentTime - tokenTime > oneHour) {
    localStorage.removeItem('electoral_token');
    localStorage.removeItem('electoral_user');
    localStorage.removeItem('tokenTimestamp');
    return false;
  }
  
  return true;
};

// Componente para manejar la página principal con redirección automática
const HomePage: React.FC = () => {
  const isAuthenticated = checkTokenValidity();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  } else {
    return <Navigate to="/auth/login" replace />;
  }
};

// Componente para proteger rutas
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = checkTokenValidity();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  
  return <>{children}</>;
};

// Componente para rutas de autenticación (redirige al dashboard si ya está autenticado)
const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = checkTokenValidity();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppRouter: React.FC = () => {
  const location = useLocation();
  
  // Verificar token cada minuto para limpieza automática
  useEffect(() => {
    const interval = setInterval(() => {
      checkTokenValidity();
    }, 60000); // Cada 60 segundos
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Routes>
      {/* Página principal - redirige automáticamente */}
      <Route path="/" element={<HomePage />} />
      
      {/* Rutas de autenticación - redirige al dashboard si ya está autenticado */}
      <Route path="/auth/login" element={
        <AuthRoute>
          <LoginPage />
        </AuthRoute>
      } />
      <Route path="/auth/register" element={
        <AuthRoute>
          <RegisterPage />
        </AuthRoute>
      } />
      
      {/* Rutas de dashboard - PROTEGIDAS */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardOverviewPage />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/overview" element={
        <ProtectedRoute>
          <DashboardOverviewPage />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/analytics" element={
        <ProtectedRoute>
          <DashboardAnalyticsPage />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/notifications" element={
        <ProtectedRoute>
          <DashboardNotificationsPage />
        </ProtectedRoute>
      } />
      
      {/* Rutas de candidatos - PROTEGIDAS */}
      <Route path="/candidates" element={
        <ProtectedRoute>
          <CandidateListPage />
        </ProtectedRoute>
      } />
      <Route path="/candidates/list" element={
        <ProtectedRoute>
          <CandidateListPage />
        </ProtectedRoute>
      } />
      <Route path="/candidates/:id" element={
        <ProtectedRoute>
          <CandidateDetailPage />
        </ProtectedRoute>
      } />
      <Route path="/candidates/create" element={
        <ProtectedRoute>
          <CandidateFormPage />
        </ProtectedRoute>
      } />
      <Route path="/candidates/:id/edit" element={
        <ProtectedRoute>
          <CandidateFormPage />
        </ProtectedRoute>
      } />
      <Route path="/candidates/analytics" element={
        <ProtectedRoute>
          <CandidateAnalyticsPage />
        </ProtectedRoute>
      } />
      
      {/* Rutas de votación - PROTEGIDAS */}
      <Route path="/voting" element={
        <ProtectedRoute>
          <VotingPortalPage />
        </ProtectedRoute>
      } />
      <Route path="/voting/portal" element={
        <ProtectedRoute>
          <VotingPortalPage />
        </ProtectedRoute>
      } />
      <Route path="/voting/ballot" element={
        <ProtectedRoute>
          <VotingBallotPage />
        </ProtectedRoute>
      } />
      <Route path="/voting/confirmation" element={
        <ProtectedRoute>
          <VotingConfirmationPage />
        </ProtectedRoute>
      } />
      <Route path="/voting/guide" element={
        <ProtectedRoute>
          <VotingGuidePage />
        </ProtectedRoute>
      } />
      
      {/* Rutas de resultados - PROTEGIDAS */}
      <Route path="/results" element={
        <ProtectedRoute>
          <ElectionResultsPage />
        </ProtectedRoute>
      } />
      <Route path="/results/elections" element={
        <ProtectedRoute>
          <ElectionResultsPage />
        </ProtectedRoute>
      } />
      <Route path="/results/analytics" element={
        <ProtectedRoute>
          <ResultsAnalyticsPage />
        </ProtectedRoute>
      } />
      
      {/* Rutas de administración - PROTEGIDAS */}
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminDashboardPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/dashboard" element={
        <ProtectedRoute>
          <AdminDashboardPage />
        </ProtectedRoute>
      } />
      
      {/* Rutas de configuración - PROTEGIDAS */}
      <Route path="/settings" element={
        <ProtectedRoute>
          <SystemSettingsPage />
        </ProtectedRoute>
      } />
      <Route path="/settings/system" element={
        <ProtectedRoute>
          <SystemSettingsPage />
        </ProtectedRoute>
      } />
      
      {/* Rutas de reportes - PROTEGIDAS */}
      <Route path="/reports" element={
        <ProtectedRoute>
          <ReportsOverviewPage />
        </ProtectedRoute>
      } />
      <Route path="/reports/overview" element={
        <ProtectedRoute>
          <ReportsOverviewPage />
        </ProtectedRoute>
      } />
      <Route path="/reports/generator" element={
        <ProtectedRoute>
          <ReportGeneratorPage />
        </ProtectedRoute>
      } />
      <Route path="/reports/status" element={
        <ProtectedRoute>
          <ReportStatusPage />
        </ProtectedRoute>
      } />
      
      {/* Rutas de perfil - PROTEGIDAS */}
      <Route path="/profile" element={
        <ProtectedRoute>
          <UserProfilePage />
        </ProtectedRoute>
      } />
      
      {/* Ruta 404 - DEBE IR AL FINAL */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;