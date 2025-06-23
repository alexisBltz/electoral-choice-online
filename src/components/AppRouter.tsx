import React from 'react';
import { Routes, Route } from 'react-router-dom';

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

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Página principal */}
      <Route path="/" element={<Index />} />
      
      {/* Rutas de autenticación */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      
      {/* Rutas de dashboard */}
      <Route path="/dashboard" element={<DashboardOverviewPage />} />
      <Route path="/dashboard/overview" element={<DashboardOverviewPage />} />
      <Route path="/dashboard/analytics" element={<DashboardAnalyticsPage />} />
      <Route path="/dashboard/notifications" element={<DashboardNotificationsPage />} />
      
      {/* Rutas de candidatos */}
      <Route path="/candidates" element={<CandidateListPage />} />
      <Route path="/candidates/list" element={<CandidateListPage />} />
      <Route path="/candidates/:id" element={<CandidateDetailPage />} />
      <Route path="/candidates/create" element={<CandidateFormPage />} />
      <Route path="/candidates/:id/edit" element={<CandidateFormPage />} />
      <Route path="/candidates/analytics" element={<CandidateAnalyticsPage />} />
      
      {/* Rutas de votación */}
      <Route path="/voting" element={<VotingPortalPage />} />
      <Route path="/voting/portal" element={<VotingPortalPage />} />
      <Route path="/voting/ballot" element={<VotingBallotPage />} />
      <Route path="/voting/confirmation" element={<VotingConfirmationPage />} />
      <Route path="/voting/guide" element={<VotingGuidePage />} />
      
      {/* Rutas de resultados */}
      <Route path="/results" element={<ElectionResultsPage />} />
      <Route path="/results/elections" element={<ElectionResultsPage />} />
      <Route path="/results/analytics" element={<ResultsAnalyticsPage />} />
      
      {/* Rutas de administración */}
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      
      {/* Rutas de configuración */}
      <Route path="/settings" element={<SystemSettingsPage />} />
      <Route path="/settings/system" element={<SystemSettingsPage />} />
      
      {/* Rutas de reportes */}
      <Route path="/reports" element={<ReportsOverviewPage />} />
      <Route path="/reports/overview" element={<ReportsOverviewPage />} />
      <Route path="/reports/generator" element={<ReportGeneratorPage />} />
      <Route path="/reports/status" element={<ReportStatusPage />} />
      
      {/* Rutas de perfil */}
      <Route path="/profile" element={<UserProfilePage />} />
      
      {/* Ruta 404 - DEBE IR AL FINAL */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
