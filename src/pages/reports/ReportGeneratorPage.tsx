import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  ArrowLeft, 
  FileText, 
  Settings, 
  Download,
  Calendar as CalendarIcon,
  Clock,
  Filter,
  Play
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ReportGeneratorPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [reportConfig, setReportConfig] = useState({
    type: '',
    format: 'pdf',
    includeCharts: true,
    includeDetails: true,
    includeStatistics: true,
    scheduleGeneration: false,
    scheduledDate: null as Date | null,
    recipients: '',
    customFilters: {
      district: '',
      candidate: '',
      dateRange: {
        start: null as Date | null,
        end: null as Date | null
      }
    }
  });

  const reportTypes = [
    { value: 'election-results', label: 'Resultados Electorales', description: 'Resultados completos de elecciones' },
    { value: 'candidate-analysis', label: 'Análisis de Candidatos', description: 'Perfiles y estadísticas de candidatos' },
    { value: 'participation-stats', label: 'Estadísticas de Participación', description: 'Análisis de participación ciudadana' },
    { value: 'district-breakdown', label: 'Desglose por Distrito', description: 'Resultados segmentados por distrito' },
    { value: 'demographic-analysis', label: 'Análisis Demográfico', description: 'Patrones de votación por demografía' },
    { value: 'system-audit', label: 'Auditoría del Sistema', description: 'Reporte técnico y de seguridad' }
  ];

  const formats = [
    { value: 'pdf', label: 'PDF', icon: '📄' },
    { value: 'excel', label: 'Excel', icon: '📊' },
    { value: 'csv', label: 'CSV', icon: '📋' },
    { value: 'html', label: 'HTML', icon: '🌐' }
  ];

  const handleGenerateReport = () => {
    // Aquí iría la lógica para generar el reporte
    console.log('Generando reporte con configuración:', reportConfig);
    
    // Simulación de generación exitosa
    setTimeout(() => {
      navigate('/reports/status', { 
        state: { 
          reportId: 'RPT-' + Date.now(),
          type: reportConfig.type,
          status: 'generando'
        }
      });
    }, 1000);
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
              Volver
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Generador de Reportes
          </h1>
          <p className="text-gray-600">
            Configure y genere reportes personalizados del sistema electoral
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Report Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Tipo de Reporte
                </CardTitle>
                <CardDescription>
                  Seleccione el tipo de reporte que desea generar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reportTypes.map((type) => (
                    <div
                      key={type.value}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        reportConfig.type === type.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setReportConfig(prev => ({ ...prev, type: type.value }))}
                    >
                      <h3 className="font-medium text-gray-900 mb-1">{type.label}</h3>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Format and Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Formato y Opciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Format Selection */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Formato de Salida</Label>
                  <div className="flex flex-wrap gap-2">
                    {formats.map((format) => (
                      <Button
                        key={format.value}
                        variant={reportConfig.format === format.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setReportConfig(prev => ({ ...prev, format: format.value }))}
                      >
                        <span className="mr-2">{format.icon}</span>
                        {format.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Content Options */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Incluir en el Reporte</Label>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="includeCharts"
                      checked={reportConfig.includeCharts}
                      onCheckedChange={(checked) => 
                        setReportConfig(prev => ({ ...prev, includeCharts: !!checked }))
                      }
                    />
                    <Label htmlFor="includeCharts" className="text-sm">
                      Gráficos y visualizaciones
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="includeDetails"
                      checked={reportConfig.includeDetails}
                      onCheckedChange={(checked) => 
                        setReportConfig(prev => ({ ...prev, includeDetails: !!checked }))
                      }
                    />
                    <Label htmlFor="includeDetails" className="text-sm">
                      Datos detallados
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="includeStatistics"
                      checked={reportConfig.includeStatistics}
                      onCheckedChange={(checked) => 
                        setReportConfig(prev => ({ ...prev, includeStatistics: !!checked }))
                      }
                    />
                    <Label htmlFor="includeStatistics" className="text-sm">
                      Análisis estadístico
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filtros Personalizados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="district">Distrito</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos los distritos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los distritos</SelectItem>
                        <SelectItem value="lima">Lima</SelectItem>
                        <SelectItem value="callao">Callao</SelectItem>
                        <SelectItem value="arequipa">Arequipa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="candidate">Candidato</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos los candidatos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los candidatos</SelectItem>
                        <SelectItem value="candidate1">Candidato 1</SelectItem>
                        <SelectItem value="candidate2">Candidato 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Rango de Fechas</Label>
                  <div className="flex space-x-2 mt-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, 'dd/MM/yyyy', { locale: es }) : 'Fecha inicio'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          Fecha fin
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scheduling */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Programación (Opcional)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="scheduleGeneration"
                    checked={reportConfig.scheduleGeneration}
                    onCheckedChange={(checked) => 
                      setReportConfig(prev => ({ ...prev, scheduleGeneration: !!checked }))
                    }
                  />
                  <Label htmlFor="scheduleGeneration" className="text-sm">
                    Programar generación automática
                  </Label>
                </div>

                {reportConfig.scheduleGeneration && (
                  <div className="space-y-3">
                    <div>
                      <Label>Fecha y Hora</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            Seleccionar fecha y hora
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label htmlFor="recipients">Destinatarios (emails)</Label>
                      <Textarea
                        id="recipients"
                        placeholder="email1@dominio.com, email2@dominio.com"
                        value={reportConfig.recipients}
                        onChange={(e) => setReportConfig(prev => ({ 
                          ...prev, 
                          recipients: e.target.value 
                        }))}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Summary and Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumen de Configuración</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Tipo:</Label>
                  <p className="text-sm">
                    {reportTypes.find(t => t.value === reportConfig.type)?.label || 'No seleccionado'}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">Formato:</Label>
                  <Badge variant="outline" className="ml-2">
                    {formats.find(f => f.value === reportConfig.format)?.label}
                  </Badge>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">Opciones:</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {reportConfig.includeCharts && <Badge variant="secondary" className="text-xs">Gráficos</Badge>}
                    {reportConfig.includeDetails && <Badge variant="secondary" className="text-xs">Detalles</Badge>}
                    {reportConfig.includeStatistics && <Badge variant="secondary" className="text-xs">Estadísticas</Badge>}
                  </div>
                </div>

                {reportConfig.scheduleGeneration && (
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Programado:</Label>
                    <p className="text-sm text-blue-600">Sí</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button 
                className="w-full" 
                onClick={handleGenerateReport}
                disabled={!reportConfig.type}
              >
                <Play className="w-4 h-4 mr-2" />
                Generar Reporte
              </Button>

              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Guardar Configuración
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportGeneratorPage;
