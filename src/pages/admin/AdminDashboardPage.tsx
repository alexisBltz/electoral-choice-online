import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { 
  Shield, 
  Users, 
  Settings, 
  BarChart3,
  AlertTriangle,
  Activity,
  Database,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Plus,
  Download,
  RefreshCw
} from 'lucide-react';

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [refreshing, setRefreshing] = React.useState(false);

  // Mock admin data
  const adminData = {
    systemStatus: {
      uptime: '99.9%',
      lastBackup: '2 horas',
      activeUsers: 15247,
      systemLoad: 23.4,
      errors: 2,
      warnings: 5,
    },
    electionStatus: {
      isActive: true,
      totalVotes: 1847520,
      participation: 43.5,
      candidates: 6,
      issues: 1,
    },
    recentActivity: [
      { time: '2 min', action: 'Nuevo voto registrado', type: 'info', user: 'Sistema' },
      { time: '5 min', action: 'Usuario admin conectado', type: 'success', user: 'admin@sistema.cr' },
      { time: '8 min', action: 'Candidato editado', type: 'warning', user: 'editor@sistema.cr' },
      { time: '12 min', action: 'Backup completado', type: 'success', user: 'Sistema' },
      { time: '15 min', action: 'Error de conexión resuelto', type: 'error', user: 'Sistema' },
    ],
    userStats: {
      totalUsers: 4250000,
      activeUsers: 15247,
      adminUsers: 12,
      moderatorUsers: 45,
    },
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  // Check admin permissions
  if (!user || user.role !== 'admin') {
    return (
      <div className="container mx-auto py-8">
        <Alert className="border-destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            No tienes permisos para acceder al panel de administración.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Panel de Administración</h1>
          <p className="text-muted-foreground">
            Bienvenido, {user.name}. Gestiona el sistema electoral desde aquí.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Actualizando...' : 'Actualizar'}
          </Button>
          <Button
            size="sm"
            onClick={() => navigate('/admin/settings')}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Configuración
          </Button>
        </div>
      </div>

      {/* System Status Alert */}
      <Alert className={`border-${adminData.systemStatus.errors > 0 ? 'destructive' : 'green-500'} bg-${adminData.systemStatus.errors > 0 ? 'red' : 'green'}-50`}>
        <Activity className={`h-4 w-4 text-${adminData.systemStatus.errors > 0 ? 'red' : 'green'}-600`} />
        <AlertDescription className={`text-${adminData.systemStatus.errors > 0 ? 'red' : 'green'}-800`}>
          <strong>Estado del Sistema:</strong> {adminData.systemStatus.errors > 0 ? 'Operativo con advertencias' : 'Operativo'}
          {adminData.systemStatus.errors > 0 && (
            <span className="ml-2">
              • {adminData.systemStatus.errors} errores • {adminData.systemStatus.warnings} advertencias
            </span>
          )}
        </AlertDescription>
      </Alert>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Usuarios Activos</p>
                <p className="text-3xl font-bold">{adminData.userStats.activeUsers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500">Online ahora</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Votos</p>
                <p className="text-3xl font-bold">{adminData.electionStatus.totalVotes.toLocaleString()}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <Activity className="h-4 w-4 text-blue-500 mr-1" />
              <span className="text-blue-500">{adminData.electionStatus.participation}% participación</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Uptime Sistema</p>
                <p className="text-3xl font-bold">{adminData.systemStatus.uptime}</p>
              </div>
              <Shield className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500">Estable</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Carga Sistema</p>
                <p className="text-3xl font-bold">{adminData.systemStatus.systemLoad}%</p>
              </div>
              <Database className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="mt-2">
              <Progress value={adminData.systemStatus.systemLoad} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="election">Elección</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
          <TabsTrigger value="activity">Actividad</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Estado de la Elección
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Estado de Votación</span>
                  <Badge variant={adminData.electionStatus.isActive ? "default" : "secondary"}>
                    {adminData.electionStatus.isActive ? 'Activa' : 'Inactiva'}
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Participación actual</span>
                    <span>{adminData.electionStatus.participation}%</span>
                  </div>
                  <Progress value={adminData.electionStatus.participation} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-3 bg-muted rounded">
                    <p className="text-2xl font-bold">{adminData.electionStatus.candidates}</p>
                    <p className="text-xs text-muted-foreground">Candidatos</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded">
                    <p className="text-2xl font-bold">{adminData.electionStatus.issues}</p>
                    <p className="text-xs text-muted-foreground">Incidencias</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Actividad Reciente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {adminData.recentActivity.slice(0, 5).map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'success' ? 'bg-green-500' :
                        activity.type === 'warning' ? 'bg-yellow-500' :
                        activity.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.user}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate('/admin/users')}>
              <CardContent className="p-6 text-center space-y-4">
                <Users className="h-12 w-12 mx-auto text-primary" />
                <div>
                  <h3 className="font-semibold text-lg">Gestión de Usuarios</h3>
                  <p className="text-sm text-muted-foreground">
                    Administrar cuentas y permisos
                  </p>
                </div>
                <Button className="w-full">
                  Gestionar Usuarios
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate('/admin/election')}>
              <CardContent className="p-6 text-center space-y-4">
                <BarChart3 className="h-12 w-12 mx-auto text-primary" />
                <div>
                  <h3 className="font-semibold text-lg">Control Electoral</h3>
                  <p className="text-sm text-muted-foreground">
                    Configurar y monitorear elecciones
                  </p>
                </div>
                <Button className="w-full">
                  Administrar Elección
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate('/admin/system')}>
              <CardContent className="p-6 text-center space-y-4">
                <Settings className="h-12 w-12 mx-auto text-primary" />
                <div>
                  <h3 className="font-semibold text-lg">Configuración</h3>
                  <p className="text-sm text-muted-foreground">
                    Ajustes del sistema y seguridad
                  </p>
                </div>
                <Button className="w-full">
                  Configurar Sistema
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Gestión de Usuarios</h3>
            <Button onClick={() => navigate('/admin/users/create')} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Usuario
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">{adminData.userStats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Usuarios</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">{adminData.userStats.activeUsers.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Usuarios Activos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">{adminData.userStats.adminUsers}</p>
                <p className="text-sm text-muted-foreground">Administradores</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">{adminData.userStats.moderatorUsers}</p>
                <p className="text-sm text-muted-foreground">Moderadores</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Election Tab */}
        <TabsContent value="election" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Control Electoral</CardTitle>
              <CardDescription>
                Gestiona el proceso electoral en tiempo real
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">Estado de Votación</h4>
                  <p className="text-sm text-muted-foreground">La votación está actualmente activa</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Pausar</Button>
                  <Button variant="destructive" size="sm">Finalizar</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Eye className="h-6 w-6" />
                  <span>Monitorear Votos</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Download className="h-6 w-6" />
                  <span>Exportar Resultados</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Settings className="h-6 w-6" />
                  <span>Configurar Elección</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Estado del Sistema
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Carga del servidor</span>
                    <span>{adminData.systemStatus.systemLoad}%</span>
                  </div>
                  <Progress value={adminData.systemStatus.systemLoad} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-3 bg-green-50 rounded">
                    <CheckCircle className="h-6 w-6 mx-auto text-green-600 mb-1" />
                    <p className="text-sm font-medium">Base de Datos</p>
                    <p className="text-xs text-green-600">Operativa</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded">
                    <Clock className="h-6 w-6 mx-auto text-blue-600 mb-1" />
                    <p className="text-sm font-medium">Último Backup</p>
                    <p className="text-xs text-blue-600">{adminData.systemStatus.lastBackup}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Alertas del Sistema
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <XCircle className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-medium text-sm">2 Errores críticos</p>
                      <p className="text-xs text-muted-foreground">Requieren atención inmediata</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="font-medium text-sm">5 Advertencias</p>
                      <p className="text-xs text-muted-foreground">Monitoreo recomendado</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Registros de Actividad
              </CardTitle>
              <CardDescription>
                Historial completo de actividades del sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adminData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'warning' ? 'bg-yellow-500' :
                      activity.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.user}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">hace {activity.time}</p>
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboardPage;
