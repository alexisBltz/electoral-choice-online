import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Download,
  Calendar,
  Users,
  FileBarChart
} from 'lucide-react';

const ReportsOverviewPage: React.FC = () => {
  const navigate = useNavigate();

  const reportCategories = [
    {
      id: 'election-reports',
      title: 'Reportes Electorales',
      description: 'Informes detallados sobre procesos electorales',
      icon: FileBarChart,
      color: 'bg-blue-500',
      reports: [
        { name: 'Reporte de Resultados Finales', status: 'disponible' },
        { name: 'Análisis de Participación', status: 'generando' },
        { name: 'Estadísticas por Distrito', status: 'disponible' }
      ]
    },
    {
      id: 'candidate-reports',
      title: 'Reportes de Candidatos',
      description: 'Análisis y estadísticas de candidatos',
      icon: Users,
      color: 'bg-green-500',
      reports: [
        { name: 'Perfil de Candidatos', status: 'disponible' },
        { name: 'Análisis de Propuestas', status: 'disponible' },
        { name: 'Estadísticas de Votación', status: 'pendiente' }
      ]
    },
    {
      id: 'analytics-reports',
      title: 'Reportes Analíticos',
      description: 'Análisis avanzados y tendencias',
      icon: TrendingUp,
      color: 'bg-purple-500',
      reports: [
        { name: 'Tendencias de Votación', status: 'disponible' },
        { name: 'Análisis Demográfico', status: 'disponible' },
        { name: 'Predicciones y Proyecciones', status: 'generando' }
      ]
    },
    {
      id: 'system-reports',
      title: 'Reportes del Sistema',
      description: 'Informes técnicos y de rendimiento',
      icon: BarChart3,
      color: 'bg-orange-500',
      reports: [
        { name: 'Log de Actividades', status: 'disponible' },
        { name: 'Rendimiento del Sistema', status: 'disponible' },
        { name: 'Auditoría de Seguridad', status: 'programado' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disponible': return 'bg-green-100 text-green-800';
      case 'generando': return 'bg-yellow-100 text-yellow-800';
      case 'pendiente': return 'bg-gray-100 text-gray-800';
      case 'programado': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
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
                Centro de Reportes
              </h1>
              <p className="text-gray-600">
                Genera, visualiza y descarga reportes del sistema electoral
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => navigate('/reports/generator')}>
                <FileText className="w-4 h-4 mr-2" />
                Generar Reporte
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/reports/scheduled')}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Reportes Programados
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Reportes</p>
                  <p className="text-2xl font-bold text-gray-900">245</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Download className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Descargas Hoy</p>
                  <p className="text-2xl font-bold text-gray-900">87</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <PieChart className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">En Proceso</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Programados</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {reportCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/reports/${category.id}`)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${category.color} bg-opacity-10`}>
                      <IconComponent className={`h-6 w-6 ${category.color.replace('bg-', 'text-')}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.reports.map((report, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">
                          {report.name}
                        </span>
                        <Badge 
                          variant="secondary"
                          className={getStatusColor(report.status)}
                        >
                          {report.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/reports/${category.id}`);
                      }}
                    >
                      Ver Todos los Reportes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReportsOverviewPage;
