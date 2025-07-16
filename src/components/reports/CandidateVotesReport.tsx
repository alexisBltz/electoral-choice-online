// src/components/reports/CandidateVotesReport.tsx

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CandidateVotesDTO } from '../../types/reports';
import { Users, TrendingUp, Award } from 'lucide-react';

interface CandidateVotesReportProps {
  /** Datos de votos por candidato */
  candidateVotes: CandidateVotesDTO[];
  /** Si está cargando los datos */
  isLoading?: boolean;
  /** Mensaje de error si existe */
  error?: string | null;
  /** Estilo de visualización */
  viewMode?: 'table' | 'chart' | 'both';
  /** Clase CSS adicional */
  className?: string;
}

/**
 * Colores para el gráfico de pastel
 */
const CHART_COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
  '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C',
  '#8DD1E1', '#D084D0', '#87D068', '#FFB347'
];

/**
 * Componente para mostrar el reporte de votos por candidato
 */
export const CandidateVotesReport: React.FC<CandidateVotesReportProps> = ({
  candidateVotes,
  isLoading = false,
  error = null,
  viewMode = 'both',
  className = '',
}) => {
  // Calcular estadísticas
  const totalVotes = candidateVotes.reduce((sum, candidate) => sum + candidate.voteCount, 0);
  const leadingCandidate = candidateVotes.length > 0 
    ? candidateVotes.reduce((prev, current) => (prev.voteCount > current.voteCount) ? prev : current)
    : null;

  // Preparar datos para los gráficos
  const chartData = candidateVotes.map(candidate => ({
    name: candidate.candidateName,
    votes: candidate.voteCount,
    percentage: candidate.percentage,
  }));

  // Renderizar estado de carga
  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Votos por Candidato
          </CardTitle>
          <CardDescription>Cargando datos de votación...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-2 bg-gray-200 rounded w-full"></div>
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
            <Users className="h-5 w-5" />
            Error al Cargar Votos
          </CardTitle>
          <CardDescription className="text-red-500">{error}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Renderizar estado sin datos
  if (candidateVotes.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Votos por Candidato
          </CardTitle>
          <CardDescription>No hay datos de votación disponibles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Aún no se han registrado votos</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Resumen de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Votos</p>
                <p className="text-2xl font-bold">{totalVotes.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
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
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        {leadingCandidate && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Líder Actual</p>
                  <p className="text-lg font-bold truncate">{leadingCandidate.candidateName}</p>
                  <p className="text-sm text-gray-500">{leadingCandidate.percentage.toFixed(1)}%</p>
                </div>
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Tabla de resultados */}
      {(viewMode === 'table' || viewMode === 'both') && (
        <Card>
          <CardHeader>
            <CardTitle>Resultados Detallados</CardTitle>
            <CardDescription>Votos y porcentajes por candidato</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidato</TableHead>
                  <TableHead className="text-right">Votos</TableHead>
                  <TableHead className="text-right">Porcentaje</TableHead>
                  <TableHead>Progreso</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidateVotes
                  .sort((a, b) => b.voteCount - a.voteCount)
                  .map((candidate, index) => (
                    <TableRow key={candidate.candidateName}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {index === 0 && <Award className="h-4 w-4 text-yellow-500" />}
                          {candidate.candidateName}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {candidate.voteCount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant={index === 0 ? 'default' : 'secondary'}>
                          {candidate.percentage.toFixed(1)}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Progress 
                          value={candidate.percentage} 
                          className="w-full"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Gráficos */}
      {(viewMode === 'chart' || viewMode === 'both') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de barras */}
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Votos</CardTitle>
              <CardDescription>Comparación visual por candidato</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      `${value.toLocaleString()} votos`,
                      'Votos'
                    ]}
                    labelFormatter={(label) => `Candidato: ${label}`}
                  />
                  <Bar dataKey="votes" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gráfico de pastel */}
          <Card>
            <CardHeader>
              <CardTitle>Proporción de Votos</CardTitle>
              <CardDescription>Distribución porcentual</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="votes"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value.toLocaleString()} votos`, 'Votos']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};