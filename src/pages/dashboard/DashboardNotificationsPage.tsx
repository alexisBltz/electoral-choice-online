import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Search,
  Filter,
  MoreVertical,
  Archive,
  Trash2
} from 'lucide-react';

const DashboardNotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const notifications = [
    {
      id: 1,
      type: 'election',
      title: 'Nueva elección programada',
      message: 'Se ha programado la Elección Municipal de Lima para el 15 de octubre de 2024.',
      timestamp: '2024-01-15T10:30:00Z',
      read: false,
      priority: 'high',
      category: 'system',
      action: {
        label: 'Ver detalles',
        url: '/elections/123'
      }
    },
    {
      id: 2,
      type: 'security',
      title: 'Alerta de seguridad',
      message: 'Se detectaron múltiples intentos de acceso no autorizado desde la IP 192.168.1.100.',
      timestamp: '2024-01-15T09:15:00Z',
      read: false,
      priority: 'critical',
      category: 'security',
      action: {
        label: 'Investigar',
        url: '/security/alerts'
      }
    },
    {
      id: 3,
      type: 'candidate',
      title: 'Nuevo candidato registrado',
      message: 'Carlos Mendoza se ha registrado como candidato para la Alcaldía de Miraflores.',
      timestamp: '2024-01-15T08:45:00Z',
      read: true,
      priority: 'medium',
      category: 'registration',
      action: {
        label: 'Ver perfil',
        url: '/candidates/456'
      }
    },
    {
      id: 4,
      type: 'system',
      title: 'Mantenimiento programado',
      message: 'Mantenimiento del sistema programado para el 20 de enero de 2024 a las 02:00 AM.',
      timestamp: '2024-01-14T16:20:00Z',
      read: true,
      priority: 'low',
      category: 'maintenance',
      action: {
        label: 'Ver cronograma',
        url: '/system/maintenance'
      }
    },
    {
      id: 5,
      type: 'vote',
      title: 'Pico de votación detectado',
      message: 'Se registró un aumento del 300% en la actividad de votación en las últimas 2 horas.',
      timestamp: '2024-01-14T14:10:00Z',
      read: false,
      priority: 'medium',
      category: 'analytics',
      action: {
        label: 'Ver estadísticas',
        url: '/analytics/voting'
      }
    },
    {
      id: 6,
      type: 'backup',
      title: 'Respaldo completado',
      message: 'El respaldo automático diario se completó exitosamente. Tamaño: 2.4 GB.',
      timestamp: '2024-01-14T12:00:00Z',
      read: true,
      priority: 'low',
      category: 'system',
      action: null
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'election': return <Bell className="w-4 h-4" />;
      case 'security': return <AlertTriangle className="w-4 h-4" />;
      case 'candidate': return <CheckCircle className="w-4 h-4" />;
      case 'system': return <Settings className="w-4 h-4" />;
      case 'vote': return <MessageSquare className="w-4 h-4" />;
      case 'backup': return <Archive className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'election': return 'text-purple-600 bg-purple-50';
      case 'security': return 'text-red-600 bg-red-50';
      case 'candidate': return 'text-green-600 bg-green-50';
      case 'system': return 'text-blue-600 bg-blue-50';
      case 'vote': return 'text-orange-600 bg-orange-50';
      case 'backup': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
      (filter === 'unread' && !notification.read) ||
      (filter === 'read' && notification.read) ||
      notification.category === filter;
    
    const matchesSearch = searchTerm === '' || 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Centro de Notificaciones
              </h1>
              <p className="text-gray-600">
                Gestiona todas las notificaciones y alertas del sistema
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => navigate('/dashboard')}>
                Volver al Dashboard
              </Button>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Configurar
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Bell className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Mail className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Sin leer</p>
                  <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Críticas</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {notifications.filter(n => n.priority === 'critical').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Hoy</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar notificaciones..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filtrar por..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="unread">Sin leer</SelectItem>
                  <SelectItem value="read">Leídas</SelectItem>
                  <SelectItem value="system">Sistema</SelectItem>
                  <SelectItem value="security">Seguridad</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No se encontraron notificaciones
                </h3>
                <p className="text-gray-600">
                  No hay notificaciones que coincidan con los filtros seleccionados.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`transition-all hover:shadow-md ${
                  !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`p-2 rounded-lg ${getTypeColor(notification.type)}`}>
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-gray-900">
                            {notification.title}
                          </h3>
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{formatTime(notification.timestamp)}</span>
                            <Badge variant="outline" className="text-xs">
                              {notification.category}
                            </Badge>
                          </div>
                          {notification.action && (
                            <Button variant="outline" size="sm">
                              {notification.action.label}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Action Buttons */}
        {filteredNotifications.length > 0 && (
          <div className="mt-8 flex justify-center space-x-4">
            <Button variant="outline">
              <CheckCircle className="w-4 h-4 mr-2" />
              Marcar todas como leídas
            </Button>
            <Button variant="outline">
              <Archive className="w-4 h-4 mr-2" />
              Archivar seleccionadas
            </Button>
            <Button variant="outline">
              <Trash2 className="w-4 h-4 mr-2" />
              Eliminar leídas
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardNotificationsPage;
