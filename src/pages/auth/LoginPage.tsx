import React from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Vote, Users, BarChart3, Shield } from 'lucide-react';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/hooks';
import { config } from '@/config';

const LoginPage = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Vote className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{config.app.name}</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="h-4 w-4" />
              <span>Votación Segura</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Information */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                Inicia Sesión en la
                <span className="text-blue-600 block">Democracia Digital</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Accede al sistema electoral digital más seguro y confiable del Perú
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Seguridad Total</h3>
                  <p className="text-sm text-gray-600">Cifrado avanzado y anonimato garantizado</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Acceso Universal</h3>
                  <p className="text-sm text-gray-600">Disponible 24/7 desde cualquier dispositivo</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Resultados en Tiempo Real</h3>
                  <p className="text-sm text-gray-600">Monitoreo transparente del proceso</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Vote className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Voto Único</h3>
                  <p className="text-sm text-gray-600">Sistema que previene votación múltiple</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">99.9%</div>
                  <div className="text-sm text-gray-600">Disponibilidad</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-gray-600">Seguridad</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">24/7</div>
                  <div className="text-sm text-gray-600">Soporte</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Auth Form */}
          <div className="lg:pl-8">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl text-gray-900">Iniciar Sesión</CardTitle>
                <CardDescription className="text-gray-600">
                  Accede con tus credenciales para ejercer tu derecho al voto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AuthForm mode="login" />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
