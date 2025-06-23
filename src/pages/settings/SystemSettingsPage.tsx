import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  ArrowLeft, 
  Save, 
  RefreshCw,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Mail,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Info
} from 'lucide-react';

const SystemSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, language, notifications } = useAppStore();
  const { user } = useAuthStore();
  const { toast } = useToast();

  // Local state for settings
  const [settings, setSettings] = React.useState({
    // General Settings
    siteName: 'Sistema Electoral Digital',
    siteDescription: 'Plataforma oficial para elecciones digitales',
    contactEmail: 'admin@electoral.cr',
    supportPhone: '+506 2234-5678',
    timezone: 'America/Costa_Rica',
    language: language || 'es',
    dateFormat: 'DD/MM/YYYY',
    
    // UI Settings
    theme: theme || 'light',
    compactMode: false,
    animationsEnabled: true,
    highContrast: false,
    fontSize: 'medium',
    
    // Notification Settings
    emailNotifications: notifications?.email ?? true,
    pushNotifications: notifications?.push ?? false,
    smsNotifications: false,
    soundEnabled: true,
    
    // Security Settings
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    requireStrongPassword: true,
    twoFactorAuth: false,
    auditLogging: true,
    
    // Election Settings
    allowVoteChange: false,
    showLiveResults: true,
    enableAnalytics: true,
    maxCandidates: 10,
    votingHours: { start: '08:00', end: '18:00' },
    
    // System Settings
    maintenanceMode: false,
    debugMode: false,
    cacheEnabled: true,
    backupFrequency: 'daily',
    logLevel: 'info',
  });

  const [loading, setLoading] = React.useState(false);

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Configuración guardada',
        description: 'Los cambios se han aplicado correctamente.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudieron guardar los cambios.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetSettings = () => {
    // Reset to default values
    setSettings(prev => ({
      ...prev,
      theme: 'light',
      language: 'es',
      compactMode: false,
      animationsEnabled: true,
      emailNotifications: true,
      pushNotifications: false,
    }));
    
    toast({
      title: 'Configuración restablecida',
      description: 'Se han restaurado los valores predeterminados.',
    });
  };
  const updateSetting = (key: string, value: unknown) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="container mx-auto py-8 space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Configuración del Sistema</h1>
          <p className="text-muted-foreground">
            Ajusta las configuraciones generales del sistema electoral
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleResetSettings}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Restablecer
          </Button>
          <Button
            onClick={handleSaveSettings}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Apariencia</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
          <TabsTrigger value="election">Elección</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Configuración General
              </CardTitle>
              <CardDescription>
                Configuraciones básicas del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nombre del Sitio</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => updateSetting('siteName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email de Contacto</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => updateSetting('contactEmail', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportPhone">Teléfono de Soporte</Label>
                  <Input
                    id="supportPhone"
                    value={settings.supportPhone}
                    onChange={(e) => updateSetting('supportPhone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Zona Horaria</Label>
                  <Select value={settings.timezone} onValueChange={(value) => updateSetting('timezone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Costa_Rica">Costa Rica (GMT-6)</SelectItem>
                      <SelectItem value="America/New_York">Nueva York (GMT-5)</SelectItem>
                      <SelectItem value="America/Mexico_City">Ciudad de México (GMT-6)</SelectItem>
                      <SelectItem value="America/Bogota">Bogotá (GMT-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="pt">Português</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Formato de Fecha</Label>
                  <Select value={settings.dateFormat} onValueChange={(value) => updateSetting('dateFormat', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Descripción del Sitio</Label>
                <Input
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => updateSetting('siteDescription', e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Descripción que aparecerá en los metadatos del sitio
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Configuración de Apariencia
              </CardTitle>
              <CardDescription>
                Personaliza la apariencia de la interfaz
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Tema</Label>
                      <p className="text-sm text-muted-foreground">
                        Selecciona el tema de la interfaz
                      </p>
                    </div>
                    <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center gap-2">
                            <Sun className="h-4 w-4" />
                            Claro
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center gap-2">
                            <Moon className="h-4 w-4" />
                            Oscuro
                          </div>
                        </SelectItem>
                        <SelectItem value="auto">
                          <div className="flex items-center gap-2">
                            <Monitor className="h-4 w-4" />
                            Auto
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Modo Compacto</Label>
                      <p className="text-sm text-muted-foreground">
                        Reduce el espacio entre elementos
                      </p>
                    </div>
                    <Switch
                      checked={settings.compactMode}
                      onCheckedChange={(checked) => updateSetting('compactMode', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Animaciones</Label>
                      <p className="text-sm text-muted-foreground">
                        Habilitar transiciones animadas
                      </p>
                    </div>
                    <Switch
                      checked={settings.animationsEnabled}
                      onCheckedChange={(checked) => updateSetting('animationsEnabled', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Alto Contraste</Label>
                      <p className="text-sm text-muted-foreground">
                        Mejora la legibilidad
                      </p>
                    </div>
                    <Switch
                      checked={settings.highContrast}
                      onCheckedChange={(checked) => updateSetting('highContrast', checked)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tamaño de Fuente</Label>
                    <Select value={settings.fontSize} onValueChange={(value) => updateSetting('fontSize', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Pequeña</SelectItem>
                        <SelectItem value="medium">Mediana</SelectItem>
                        <SelectItem value="large">Grande</SelectItem>
                        <SelectItem value="extra-large">Extra Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Los cambios de apariencia se aplicarán inmediatamente para todos los usuarios.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Configuración de Notificaciones
              </CardTitle>
              <CardDescription>
                Gestiona cómo y cuándo recibir notificaciones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label>Notificaciones por Email</Label>
                      <p className="text-sm text-muted-foreground">
                        Recibir actualizaciones importantes vía email
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label>Notificaciones Push</Label>
                      <p className="text-sm text-muted-foreground">
                        Notificaciones en tiempo real en el navegador
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label>Notificaciones SMS</Label>
                      <p className="text-sm text-muted-foreground">
                        Recibir alertas críticas por mensaje de texto
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => updateSetting('smsNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {settings.soundEnabled ? (
                      <Volume2 className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <VolumeX className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div className="space-y-0.5">
                      <Label>Sonidos de Notificación</Label>
                      <p className="text-sm text-muted-foreground">
                        Reproducir sonidos para alertas
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.soundEnabled}
                    onCheckedChange={(checked) => updateSetting('soundEnabled', checked)}
                  />
                </div>
              </div>

              <Alert>
                <Bell className="h-4 w-4" />
                <AlertDescription>
                  Las notificaciones push requieren permisos del navegador. 
                  Asegúrate de permitir las notificaciones cuando se te solicite.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Configuración de Seguridad
              </CardTitle>
              <CardDescription>
                Configuraciones de seguridad y privacidad del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Tiempo de Sesión (minutos)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                      min="5"
                      max="120"
                    />
                    <p className="text-sm text-muted-foreground">
                      Tiempo antes de cerrar sesión automáticamente
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts">Máximo Intentos de Login</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => updateSetting('maxLoginAttempts', parseInt(e.target.value))}
                      min="3"
                      max="10"
                    />
                    <p className="text-sm text-muted-foreground">
                      Intentos fallidos antes de bloquear cuenta
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Contraseñas Seguras</Label>
                      <p className="text-sm text-muted-foreground">
                        Requerir contraseñas complejas
                      </p>
                    </div>
                    <Switch
                      checked={settings.requireStrongPassword}
                      onCheckedChange={(checked) => updateSetting('requireStrongPassword', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Autenticación de Dos Factores</Label>
                      <p className="text-sm text-muted-foreground">
                        Habilitar 2FA para administradores
                      </p>
                    </div>
                    <Switch
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => updateSetting('twoFactorAuth', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Registro de Auditoría</Label>
                      <p className="text-sm text-muted-foreground">
                        Mantener logs de todas las acciones
                      </p>
                    </div>
                    <Switch
                      checked={settings.auditLogging}
                      onCheckedChange={(checked) => updateSetting('auditLogging', checked)}
                    />
                  </div>
                </div>
              </div>

              <Alert className="border-yellow-500 bg-yellow-50">
                <Shield className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  <strong>Importante:</strong> Los cambios de seguridad afectarán a todos los usuarios.
                  Asegúrate de comunicar estos cambios al equipo antes de aplicarlos.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Election Settings */}
        <TabsContent value="election" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configuración Electoral
              </CardTitle>
              <CardDescription>
                Configuraciones específicas del proceso electoral
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Permitir Cambio de Voto</Label>
                      <p className="text-sm text-muted-foreground">
                        Los usuarios pueden modificar su voto antes del cierre
                      </p>
                    </div>
                    <Switch
                      checked={settings.allowVoteChange}
                      onCheckedChange={(checked) => updateSetting('allowVoteChange', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Mostrar Resultados en Vivo</Label>
                      <p className="text-sm text-muted-foreground">
                        Mostrar resultados durante la votación
                      </p>
                    </div>
                    <Switch
                      checked={settings.showLiveResults}
                      onCheckedChange={(checked) => updateSetting('showLiveResults', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Habilitar Analytics</Label>
                      <p className="text-sm text-muted-foreground">
                        Recopilar estadísticas de participación
                      </p>
                    </div>
                    <Switch
                      checked={settings.enableAnalytics}
                      onCheckedChange={(checked) => updateSetting('enableAnalytics', checked)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxCandidates">Máximo de Candidatos</Label>
                    <Input
                      id="maxCandidates"
                      type="number"
                      value={settings.maxCandidates}
                      onChange={(e) => updateSetting('maxCandidates', parseInt(e.target.value))}
                      min="2"
                      max="20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Horario de Votación</Label>
                    <div className="flex gap-2">
                      <Input
                        type="time"
                        value={settings.votingHours.start}
                        onChange={(e) => updateSetting('votingHours', { ...settings.votingHours, start: e.target.value })}
                      />
                      <Input
                        type="time"
                        value={settings.votingHours.end}
                        onChange={(e) => updateSetting('votingHours', { ...settings.votingHours, end: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Configuración del Sistema
              </CardTitle>
              <CardDescription>
                Configuraciones técnicas y de mantenimiento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5 flex-1">
                      <Label>Modo Mantenimiento</Label>
                      <p className="text-sm text-muted-foreground">
                        Deshabilitar acceso para usuarios regulares
                      </p>
                    </div>
                    <Switch
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) => updateSetting('maintenanceMode', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5 flex-1">
                      <Label>Modo Debug</Label>
                      <p className="text-sm text-muted-foreground">
                        Habilitar información detallada de errores
                      </p>
                    </div>
                    <Switch
                      checked={settings.debugMode}
                      onCheckedChange={(checked) => updateSetting('debugMode', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5 flex-1">
                      <Label>Cache Habilitado</Label>
                      <p className="text-sm text-muted-foreground">
                        Mejorar rendimiento con cache
                      </p>
                    </div>
                    <Switch
                      checked={settings.cacheEnabled}
                      onCheckedChange={(checked) => updateSetting('cacheEnabled', checked)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Frecuencia de Backup</Label>
                    <Select value={settings.backupFrequency} onValueChange={(value) => updateSetting('backupFrequency', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Cada hora</SelectItem>
                        <SelectItem value="daily">Diario</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="monthly">Mensual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Nivel de Logging</Label>
                    <Select value={settings.logLevel} onValueChange={(value) => updateSetting('logLevel', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debug">Debug</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Alert className="border-red-500 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>Precaución:</strong> Los cambios en la configuración del sistema pueden 
                  afectar el rendimiento y la disponibilidad del servicio. Realiza estos cambios 
                  durante ventanas de mantenimiento programadas.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettingsPage;
