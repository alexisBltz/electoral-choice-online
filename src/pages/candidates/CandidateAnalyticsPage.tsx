import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  BarChart3, 
  Users, 
  TrendingUp, 
  Award,
  Vote,
  MapPin,
  Calendar,
  Target,
  PieChart,
  Activity
} from 'lucide-react';

const CandidateAnalyticsPage: React.FC = () => {
  const navigate = useNavigate();

  const analyticsData = {
    totalCandidates: 24,
    activeCandidates: 18,
    pendingApproval: 4,
    rejectedApplications: 2,
    averageAge: 45,
    genderDistribution: {
      male: 65,
      female: 35
    },
    topRegions: [
      { region: 'Lima', count: 8, percentage: 33 },
      { region: 'Arequipa', count: 4, percentage: 17 },
      { region: 'Trujillo', count: 3, percentage: 13 },
      { region: 'Cusco', count: 2, percentage: 8 },
      { region: 'Piura', count: 2, percentage: 8 }
    ],
    candidatesByParty: [
      { party: 'Partido Democrático', count: 6, percentage: 25 },
      { party: 'Alianza Nacional', count: 5, percentage: 21 },
      { party: 'Frente Popular', count: 4, percentage: 17 },
      { party: 'Movimiento Ciudadano', count: 3, percentage: 13 },
      { party: 'Independientes', count: 6, percentage: 25 }
    ],
    topCandidates: [
      { 
        name: 'María González',
        party: 'Partido Democrático',
        region: 'Lima',
        support: 78,
        trend: 'up',
        events: 12
      },
      { 
        name: 'Carlos Rodríguez',
        party: 'Alianza Nacional',
        region: 'Arequipa',
        support: 65,
        trend: 'up',
        events: 8
      },
      { 
        name: 'Ana Martínez',
        party: 'Frente Popular',
        region: 'Trujillo',
        support: 58,
        trend: 'down',
        events: 6
      }
    ]
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? '↗️' : '↘️';
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/candidates')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Candidatos
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Analytics de Candidatos
          </h1>
          <p className="text-gray-600">
            Análisis detallado y estadísticas de los candidatos registrados
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Candidatos</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.totalCandidates}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Activos</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.activeCandidates}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pendientes</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.pendingApproval}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Edad Promedio</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.averageAge}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="demographics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="demographics">Demografía</TabsTrigger>
            <TabsTrigger value="regions">Regiones</TabsTrigger>
            <TabsTrigger value="parties">Partidos</TabsTrigger>
            <TabsTrigger value="performance">Rendimiento</TabsTrigger>
          </TabsList>

          {/* Demographics Tab */}
          <TabsContent value="demographics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Distribución por Género</CardTitle>
                  <CardDescription>
                    Análisis de la distribución de género entre candidatos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Masculino</span>
                        <span className="text-sm text-gray-600">{analyticsData.genderDistribution.male}%</span>
                      </div>
                      <Progress value={analyticsData.genderDistribution.male} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Femenino</span>
                        <span className="text-sm text-gray-600">{analyticsData.genderDistribution.female}%</span>
                      </div>
                      <Progress value={analyticsData.genderDistribution.female} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas de Edad</CardTitle>
                  <CardDescription>
                    Análisis de distribución etaria
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">45</p>
                        <p className="text-sm text-gray-600">Edad Promedio</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">28-65</p>
                        <p className="text-sm text-gray-600">Rango de Edad</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Regions Tab */}
          <TabsContent value="regions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Candidatos por Región</CardTitle>
                <CardDescription>
                  Distribución geográfica de los candidatos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topRegions.map((region, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{region.region}</p>
                          <p className="text-sm text-gray-600">{region.count} candidatos</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-24">
                          <Progress value={region.percentage} className="h-2" />
                        </div>
                        <span className="text-sm font-medium">{region.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Parties Tab */}
          <TabsContent value="parties" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Candidatos por Partido</CardTitle>
                <CardDescription>
                  Distribución de candidatos por organización política
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.candidatesByParty.map((party, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Vote className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{party.party}</p>
                          <p className="text-sm text-gray-600">{party.count} candidatos</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-24">
                          <Progress value={party.percentage} className="h-2" />
                        </div>
                        <span className="text-sm font-medium">{party.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Candidatos por Rendimiento</CardTitle>
                <CardDescription>
                  Candidatos mejor posicionados según métricas de apoyo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topCandidates.map((candidate, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{candidate.name}</p>
                          <p className="text-sm text-gray-600">{candidate.party} • {candidate.region}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{candidate.support}% apoyo</p>
                          <p className={`text-xs ${getTrendColor(candidate.trend)}`}>
                            {getTrendIcon(candidate.trend)} Tendencia
                          </p>
                        </div>
                        <Badge variant="outline">{candidate.events} eventos</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <Button onClick={() => navigate('/reports/generator')}>
            <BarChart3 className="w-4 h-4 mr-2" />
            Generar Reporte
          </Button>
          <Button variant="outline">
            <Activity className="w-4 h-4 mr-2" />
            Exportar Datos
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CandidateAnalyticsPage;
