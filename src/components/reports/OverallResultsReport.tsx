// src/components/reports/OverallResultsReport.tsx

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';
import { OverallResultsDTO } from '../../types/reports';
import { 
  Trophy, 
  Users, 
  Vote, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Crown
} from 'lucide-react';

interface OverallResultsReportProps {
  /** Datos de resultados generales */
  overallResults: OverallResultsDTO | null;
  /** Si está cargando los datos */
  isLoading?: boolean;
  /** Mensaje de error si existe */
  error?: string | null;
  /** Clase CSS adicional */
  className?: string;
}

/**
 * Obtiene el icono y color apropiado para el estado de votación
 */
const getVotingStatusInfo = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'activa':
    case 'en_progreso':
      return {
        icon: Clock,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        label: 'Votación Activa'
      };
    case 'completed':
    case 'completada':
    case 'finalizada':
      return {
        icon: CheckCircle,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        label: 'Votación Completada'
      };
    case 'pending':
    case 'pendiente':
      return {
        icon: AlertCircle,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        label: 'Votación Pendiente'
      };
    default:
      return {
        icon: AlertCircle,
        color: 'text-gray-600',
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-200',
        label: status
      };
  }
};

/**
 * Componente para mostrar el reporte de resultados generales
 */
export const OverallResultsReport: React.FC<OverallResultsReportProps> = ({
  overallResults,
  isLoading = false,
  error = null,
  className = '',
}) => {
  // Renderizar estado de carga
  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Resultados Generales
          </CardTitle>
          <CardDescription>Cargando resumen de la votación...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Renderizar estado de error
  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Trophy className="h-5 w-5" />
            Error al Cargar Resultados
          </CardTitle>
          <CardDescription className="text-red-500">{error}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Renderizar estado sin datos
  if (!overallResults) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Resultados Generales
          </CardTitle>
          <CardDescription>No hay datos de resultados disponibles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Los resultados aún no están disponibles</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const statusInfo = getVotingStatusInfo(overallResults.votingStatus);
  const StatusIcon = statusInfo.icon;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Tarjeta principal de resultados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Resultados Generales de la Votación
          </CardTitle>
          <CardDescription>
            Resumen completo del proceso electoral
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Métricas principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Total de votos */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total de Votos</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {overallResults.totalVotes.toLocaleString()}
                    </p>
                  </div>
                  <Vote className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            {/* Total de usuarios */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Usuarios Registrados</p>
                    <p className="text-2xl font-bold text-green-600">
                      {overallResults.totalUsers.toLocaleString()}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            {/* Porcentaje de participación */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Participación</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {overallResults.participationPercentage.toFixed(1)}%
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <div className="mt-2">
                  <Progress 
                    value={overallResults.participationPercentage} 
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Estado de la votación */}
            <Card className={`${statusInfo.bgColor} ${statusInfo.borderColor} border-2`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Estado</p>
                    <p className={`text-lg font-bold ${statusInfo.color}`}>
                      {statusInfo.label}
                    </p>
                  </div>
                  <StatusIcon className={`h-8 w-8 ${statusInfo.color}`} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ganador de la votación */}
          {overallResults.winner && (
            <Alert className="border-yellow-200 bg-yellow-50">
              <Crown className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-yellow-800">
                    Candidato Ganador: 
                  </span>
                  <span className="ml-2 text-yellow-900 font-bold">
                    {overallResults.winner}
                  </span>
                </div>
                <Badge variant="outline" className="border-yellow-300 text-yellow-700">
                  Líder Actual
                </Badge>
              </AlertDescription>
            </Alert>
          )}

          {/* Información adicional si no hay ganador */}
          {!overallResults.winner && overallResults.totalVotes > 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                La votación está en progreso. El ganador se determinará cuando se complete el proceso electoral.
              </AlertDescription>
            </Alert>
          )}

          {/* Mensaje si no hay votos */}
          {overallResults.totalVotes === 0 && (
            <Alert className="border-blue-200 bg-blue-50">
              <Clock className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                La votación aún no ha comenzado o no se han registrado votos.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Resumen de candidatos (si está disponible) */}
      {overallResults.candidateResults && overallResults.candidateResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Resumen por Candidato</CardTitle>
            <CardDescription>
              Top {Math.min(5, overallResults.candidateResults.length)} candidatos con más votos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {overallResults.candidateResults
                .sort((a, b) => b.voteCount - a.voteCount)
                .slice(0, 5)
                .map((candidate, index) => (
                  <div 
                    key={candidate.candidateName}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      {index === 0 && <Crown className="h-5 w-5 text-yellow-500" />}
                      <div>
                        <p className="font-medium">{candidate.candidateName}</p>
                        <p className="text-sm text-gray-500">
                          {candidate.voteCount.toLocaleString()} votos
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={index === 0 ? 'default' : 'secondary'}>
                        {candidate.percentage.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

