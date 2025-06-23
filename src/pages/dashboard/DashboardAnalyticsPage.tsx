import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Users, 
  Vote, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Globe,
  Shield
} from 'lucide-react';

const DashboardAnalyticsPage: React.FC = () => {
  const navigate = useNavigate();

  const analyticsData = {
    totalVotes: 1234567,
    totalCandidates: 12,
    activeElections: 3,
    completedElections: 8,
    participationRate: 78.5,
    systemUptime: 99.9,
    averageResponseTime: 120,
    securityAlerts: 2
  };

  const votingTrends = [
    { period: 'Últimas 24h', votes: 45632, change: 12.5, trending: 'up' },
    { period: 'Última semana', votes: 234567, change: -3.2, trending: 'down' },
    { period: 'Último mes', votes: 987654, change: 8.7, trending: 'up' },
    { period: 'Último año', votes: 5432109, change: 15.3, trending: 'up' }
  ];

  const systemMetrics = [
    { 
      name: 'Rendimiento del Sistema', 
      value: 94, 
      status: 'good',
      description: 'Óptimo funcionamiento'
    },
    { 
      name: 'Disponibilidad', 
      value: 99.9, 
      status: 'excellent',
      description: 'Excelente disponibilidad'
    },
    { 
      name: 'Carga del Servidor', 
      value: 65, 
      status: 'warning',
      description: 'Carga moderada'
    },
    { 
      name: 'Respuesta Promedio', 
      value: 85, 
      status: 'good',
      description: '120ms promedio'
    }
  ];

  const recentActivities = [
    {
      type: 'election',
      title: 'Nueva elección creada',
      description: 'Elección Municipal Lima 2024',
      timestamp: '2 horas atrás',
      icon: Vote,
      color: 'text-blue-600'
    },
    {
      type: 'candidate',
      title: 'Candidato registrado',
      description: 'María García - Partido Democrático',
      timestamp: '4 horas atrás',
      icon: Users,
      color: 'text-green-600'
    },
    {
      type: 'system',
      title: 'Actualización del sistema',
      description: 'Versión 2.1.0 implementada',
      timestamp: '1 día atrás',
      icon: Shield,
      color: 'text-purple-600'
    },
    {
      type: 'alert',
      title: 'Alerta de seguridad',
      description: 'Intento de acceso no autorizado detectado',
      timestamp: '2 días atrás',
      icon: AlertTriangle,
      color: 'text-orange-600'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'danger': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'warning': return 'bg-yellow-500';
      case 'danger': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600">
                Análisis detallado y métricas del sistema electoral
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => navigate('/dashboard')}>
                Volver al Dashboard
              </Button>
              <Button variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                Exportar Datos
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Votos</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData.totalVotes.toLocaleString()}
                  </p>
                </div>
                <Vote className="h-8 w-8 text-blue-600" />
              </div>
              <div className="mt-2 flex items-center text-sm">
                <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600">12.5%</span>
                <span className="text-gray-600 ml-1">vs mes anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Participación</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData.participationRate}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="mt-2">
                <Progress value={analyticsData.participationRate} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Elecciones Activas</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData.activeElections}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-orange-600" />
              </div>
              <div className="mt-2 flex items-center text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-gray-600">{analyticsData.completedElections} completadas</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Uptime Sistema</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData.systemUptime}%
                  </p>
                </div>
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <div className="mt-2 flex items-center text-sm">
                <Clock className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-gray-600">{analyticsData.averageResponseTime}ms promedio</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Voting Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Tendencias de Votación</CardTitle>
              <CardDescription>
                Análisis de participación en diferentes períodos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {votingTrends.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{trend.period}</p>
                      <p className="text-sm text-gray-600">
                        {trend.votes.toLocaleString()} votos
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {trend.trending === 'up' ? (
                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`font-medium ${
                        trend.trending === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {Math.abs(trend.change)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento del Sistema</CardTitle>
              <CardDescription>
                Métricas de rendimiento y disponibilidad
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        {metric.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${getStatusColor(metric.status)}`}>
                          {metric.value}%
                        </span>
                        <Badge 
                          variant="outline"
                          className={getStatusColor(metric.status)}
                        >
                          {metric.status}
                        </Badge>
                      </div>
                    </div>
                    <Progress 
                      value={metric.value} 
                      className="h-2"
                    />
                    <p className="text-xs text-gray-500">{metric.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Últimos eventos y actividades del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const IconComponent = activity.icon;
                return (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-lg bg-white ${activity.color}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{activity.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{activity.timestamp}</span>
                        <Badge variant="outline" className="text-xs">
                          {activity.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline">
                Ver Todas las Actividades
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardAnalyticsPage;
