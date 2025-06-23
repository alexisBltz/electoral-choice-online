import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft, 
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  RefreshCw,
  Eye,
  Share2
} from 'lucide-react';

const ReportStatusPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [refreshing, setRefreshing] = useState(false);

  // Obtener datos del reporte desde el estado de navegación
  const reportData = location.state || {
    reportId: 'RPT-12345',
    type: 'election-results',
    status: 'completado'
  };

  const mockReportStatus = {
    id: reportData.reportId,
    name: 'Reporte de Resultados Electorales',
    type: reportData.type,
    status: reportData.status || 'generando', // generando, completado, error, cancelado
    progress: 85,
    createdAt: new Date().toISOString(),
    estimatedTime: '2 minutos restantes',
    fileSize: '2.4 MB',
    format: 'PDF',
    downloadUrl: '/downloads/report-12345.pdf',
    logs: [
      { time: '14:30:15', message: 'Iniciando generación del reporte...', type: 'info' },
      { time: '14:30:45', message: 'Obteniendo datos electorales...', type: 'info' },
      { time: '14:31:20', message: 'Procesando estadísticas...', type: 'info' },
      { time: '14:31:55', message: 'Generando gráficos...', type: 'warning' },
      { time: '14:32:10', message: 'Aplicando formato PDF...', type: 'info' },
    ]
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'generando':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'completado':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'cancelado':
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
      default:
        return <Clock className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'generando':
        return 'bg-blue-100 text-blue-800';
      case 'completado':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'cancelado':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulación de actualización
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleDownload = () => {
    // Aquí iría la lógica de descarga real
    const link = document.createElement('a');
    link.href = mockReportStatus.downloadUrl;
    link.download = `reporte-${mockReportStatus.id}.pdf`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/reports')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Reportes
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Actualizar
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Estado del Reporte
          </h1>
          <p className="text-gray-600">
            Monitorea el progreso de generación de tu reporte
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Report Status */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(mockReportStatus.status)}
                    <div>
                      <CardTitle>{mockReportStatus.name}</CardTitle>
                      <CardDescription>ID: {mockReportStatus.id}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(mockReportStatus.status)}>
                    {mockReportStatus.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockReportStatus.status === 'generando' && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progreso</span>
                      <span className="text-sm text-gray-600">{mockReportStatus.progress}%</span>
                    </div>
                    <Progress value={mockReportStatus.progress} className="w-full" />
                    <p className="text-sm text-gray-600 mt-2">
                      {mockReportStatus.estimatedTime}
                    </p>
                  </div>
                )}

                {mockReportStatus.status === 'completado' && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      El reporte se ha generado exitosamente y está listo para descargar.
                    </AlertDescription>
                  </Alert>
                )}

                {mockReportStatus.status === 'error' && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Ha ocurrido un error durante la generación del reporte. 
                      Por favor, revisa los logs o intenta nuevamente.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Creado:</span>
                    <p>{new Date(mockReportStatus.createdAt).toLocaleString('es-ES')}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Formato:</span>
                    <p>{mockReportStatus.format}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Tamaño:</span>
                    <p>{mockReportStatus.fileSize}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Tipo:</span>
                    <p>{mockReportStatus.type}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Log */}
            <Card>
              <CardHeader>
                <CardTitle>Log de Actividad</CardTitle>
                <CardDescription>
                  Historial detallado del proceso de generación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockReportStatus.logs.map((log, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        log.type === 'error' ? 'bg-red-500' : 
                        log.type === 'warning' ? 'bg-yellow-500' : 
                        'bg-blue-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-900">{log.message}</p>
                          <span className="text-xs text-gray-500">{log.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockReportStatus.status === 'completado' && (
                  <>
                    <Button className="w-full" onClick={handleDownload}>
                      <Download className="w-4 h-4 mr-2" />
                      Descargar Reporte
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      Vista Previa
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Share2 className="w-4 h-4 mr-2" />
                      Compartir
                    </Button>
                  </>
                )}

                {mockReportStatus.status === 'generando' && (
                  <Button variant="destructive" className="w-full">
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancelar Generación
                  </Button>
                )}

                {mockReportStatus.status === 'error' && (
                  <Button className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reintentar
                  </Button>
                )}

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/reports/generator')}
                >
                  Generar Nuevo Reporte
                </Button>
              </CardContent>
            </Card>

            {/* Report Details */}
            <Card>
              <CardHeader>
                <CardTitle>Detalles del Reporte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Estado:</span>
                  <Badge className={getStatusColor(mockReportStatus.status)}>
                    {mockReportStatus.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Progreso:</span>
                  <span>{mockReportStatus.progress}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tiempo transcurrido:</span>
                  <span>2m 30s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Prioridad:</span>
                  <Badge variant="outline">Normal</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Help */}
            <Card>
              <CardHeader>
                <CardTitle>¿Necesitas Ayuda?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  📖 Documentación
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  💬 Soporte Técnico
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  ❓ Preguntas Frecuentes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportStatusPage;
