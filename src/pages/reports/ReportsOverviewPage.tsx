// src/pages/reports/ReportsOverviewPage.tsx

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { useReports } from '../../hooks/useReports';
import { CandidateVotesReport } from '../../components/reports/CandidateVotesReport';
import { OverallResultsReport } from '../../components/reports/OverallResultsReport';
import { 
  RefreshCw, 
  Download, 
  FileText, 
  BarChart3, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

/**
 * Página principal de reportes que muestra una vista general de todos los reportes disponibles
 */
export const ReportsOverviewPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  // Hook personalizado para manejar los reportes
  const {
    candidateVotes,
    overallResults,
    isLoading,
    isRefreshing,
    isError,
    error,
    hasData,
    lastUpdated,
    loadAllReports,
    refreshReports,
    clearError,
  } = useReports({
    autoLoad: true,
    refreshInterval: 30000, // Refrescar cada 30 segundos
    debug: process.env.NODE_ENV === 'development',
  });

  /**
   * Maneja la acción de refrescar reportes
   */
  const handleRefresh = async () => {
    try {
      await refreshReports();
    } catch (error) {
      console.error('Error al refrescar reportes:', error);
    }
  };

  /**
   * Maneja la descarga de reportes (placeholder)
   */
  const handleDownload = () => {
    // TODO: Implementar descarga de reportes en formato PDF/Excel
    alert('Funcionalidad de descarga en desarrollo');
  };

  /**
   * Obtiene el estado de la conexión con el servicio
   */
  const getConnectionStatus = () => {
    if (isError) {
      return {
        icon: AlertCircle,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        label: 'Error de Conexión',
        description: 'No se puede conectar con el servicio de reportes'
      };
    }
    
    if (isLoading || isRefreshing) {
      return {
        icon: Clock,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        label: 'Actualizando',
        description: 'Obteniendo los datos más recientes'
      };
    }
    
    return {
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      label: 'Conectado',
      description: 'Datos actualizados correctamente'
    };
  };

  const connectionStatus = getConnectionStatus();
  const StatusIcon = connectionStatus.icon;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reportes de Votación</h1>
          <p className="text-gray-600">
            Análisis y resultados del proceso electoral en tiempo real
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Estado de conexión */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${connectionStatus.bgColor}`}>
            <StatusIcon className={`h-4 w-4 ${connectionStatus.color}`} />
            <span className={`text-sm font-medium ${connectionStatus.color}`}>
              {connectionStatus.label}
            </span>
          </div>
          
          {/* Botones de acción */}
          <Button
            onClick={handleRefresh}
            disabled={isLoading || isRefreshing}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
          
          <Button
            onClick={handleDownload}
            disabled={!hasData}
            size="sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Descargar
          </Button>
        </div>
      </div>

      {/* Información de última actualización */}
      {lastUpdated && (
        <div className="text-sm text-gray-500">
          Última actualización: {lastUpdated.toLocaleString()}
        </div>
      )}

      {/* Alert de error */}
      {isError && error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button
              onClick={clearError}
              variant="outline"
              size="sm"
            >
              Reintentar
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Estadísticas rápidas */}
      {hasData && overallResults && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Votos</p>
                  <p className="text-2xl font-bold">{overallResults.totalVotes.toLocaleString()}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Participación</p>
                  <p className="text-2xl font-bold">{overallResults.participationPercentage.toFixed(1)}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Candidatos</p>
                  <p className="text-2xl font-bold">{candidateVotes.length}</p>
                </div>
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Estado</p>
                  <Badge variant="outline" className="mt-1">
                    {overallResults.votingStatus}
                  </Badge>
                </div>
                <CheckCircle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Contenido principal con tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Resumen General</TabsTrigger>
          <TabsTrigger value="candidates">Votos por Candidato</TabsTrigger>
          <TabsTrigger value="analytics">Análisis Detallado</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverallResultsReport
            overallResults={overallResults}
            isLoading={isLoading}
            error={error}
          />
        </TabsContent>

        <TabsContent value="candidates" className="space-y-6">
          <CandidateVotesReport
            candidateVotes={candidateVotes}
            isLoading={isLoading}
            error={error}
            viewMode="both"
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Análisis Avanzado</CardTitle>
              <CardDescription>
                Métricas detalladas y tendencias de votación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Análisis de participación */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Análisis de Participación</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {overallResults ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Usuarios que votaron:</span>
                          <span className="font-bold">{overallResults.totalVotes.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Usuarios registrados:</span>
                          <span className="font-bold">{overallResults.totalUsers.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Usuarios sin votar:</span>
                          <span className="font-bold">
                            {(overallResults.totalUsers - overallResults.totalVotes).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500">No hay datos disponibles</p>
                    )}
                  </CardContent>
                </Card>

                {/* Distribución de votos */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Distribución de Votos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {candidateVotes.length > 0 ? (
                      <div className="space-y-3">
                        {candidateVotes
                          .sort((a, b) => b.voteCount - a.voteCount)
                          .slice(0, 3)
                          .map((candidate, index) => (
                            <div key={candidate.candidateName} className="flex justify-between items-center">
                              <span className="flex items-center gap-2">
                                <Badge variant={index === 0 ? 'default' : 'secondary'}>
                                  #{index + 1}
                                </Badge>
                                {candidate.candidateName}
                              </span>
                              <span className="font-bold">{candidate.percentage.toFixed(1)}%</span>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No hay datos disponibles</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsOverviewPage;
