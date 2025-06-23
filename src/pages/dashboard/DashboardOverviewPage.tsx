import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Vote, BarChart3, Users, Settings, CheckCircle, TrendingUp, Clock } from 'lucide-react';
import { useAuth, useCandidates } from '@/hooks';
import { useVotingStore, useElectionStore } from '@/store';
import { FormatUtil } from '@/utils';

const DashboardOverviewPage = () => {
  const { user } = useAuth();
  const { candidates } = useCandidates();
  const { hasVoted } = useVotingStore();
  const { stats } = useElectionStore();

  const quickActions = [
    {
      title: 'Ver Candidatos',
      description: 'Conoce a los candidatos y sus propuestas',
      icon: Users,
      href: '/candidates',
      color: 'blue',
      available: true
    },
    {
      title: 'Emitir Voto',
      description: hasVoted ? 'Ya has votado' : 'Ejercer tu derecho al voto',
      icon: Vote,
      href: '/voting',
      color: hasVoted ? 'gray' : 'green',
      available: !hasVoted
    },
    {
      title: 'Ver Resultados',
      description: 'Monitorea los resultados en tiempo real',
      icon: BarChart3,
      href: '/results',
      color: 'purple',
      available: true
    },
    {
      title: 'Configuración',
      description: 'Administrar el sistema electoral',
      icon: Settings,
      href: '/admin',
      color: 'orange',
      available: user?.isAdmin
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200',
      gray: 'bg-gray-100 text-gray-600 border-gray-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              ¡Bienvenido, {user?.name}!
            </h1>
            <p className="text-blue-100 text-lg">
              {hasVoted 
                ? '¡Gracias por participar en la democracia digital!'
                : 'Tu voto es importante para el futuro del país'
              }
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-blue-100 mb-1">
              {hasVoted ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span>Voto registrado</span>
                </>
              ) : (
                <>
                  <Clock className="h-5 w-5" />
                  <span>Pendiente de votar</span>
                </>
              )}
            </div>
            {user?.isAdmin && (
              <div className="text-sm text-blue-200">Administrador</div>
            )}
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Candidatos</p>
                <p className="text-2xl font-bold">{candidates.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Votos Emitidos</p>
                <p className="text-2xl font-bold">{FormatUtil.formatNumber(stats.totalVotes)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Vote className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Participación</p>
                <p className="text-2xl font-bold">{FormatUtil.formatPercentage(stats.participationRate)}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Estado</p>
                <p className="text-2xl font-bold text-green-600">Activo</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>
            Accede rápidamente a las principales funciones del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions
              .filter(action => action.available)
              .map((action, index) => (
                <Card 
                  key={index} 
                  className={`cursor-pointer hover:shadow-md transition-shadow border-l-4 ${getColorClasses(action.color)}`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className={`p-3 rounded-full ${getColorClasses(action.color)}`}>
                        <action.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{action.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full"
                        onClick={() => window.location.href = action.href}
                      >
                        Acceder
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
          <CardDescription>
            Últimas acciones realizadas en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {hasVoted ? (
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">Voto registrado exitosamente</p>
                  <p className="text-sm text-green-700">Tu participación ha sido registrada de forma segura</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">Pendiente de votación</p>
                  <p className="text-sm text-blue-700">Aún no has ejercido tu derecho al voto</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Users className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Sesión iniciada</p>
                <p className="text-sm text-gray-700">Acceso al sistema electoral digital</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverviewPage;
