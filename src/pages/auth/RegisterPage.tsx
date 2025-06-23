import React from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Vote, UserPlus, Shield, CheckCircle } from 'lucide-react';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/hooks';
import { config } from '@/config';

const RegisterPage = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Vote className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{config.app.name}</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <UserPlus className="h-4 w-4" />
              <span>Registro Ciudadano</span>
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
                Únete a la
                <span className="text-green-600 block">Democracia Digital</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Regístrate y forma parte del futuro electoral del Perú
              </p>
            </div>

            {/* Registration Benefits */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Proceso Rápido</h3>
                  <p className="text-sm text-gray-600">Registro en menos de 5 minutos con tu DNI</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Datos Seguros</h3>
                  <p className="text-sm text-gray-600">Tu información está protegida con cifrado militar</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Vote className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Voto Inmediato</h3>
                  <p className="text-sm text-gray-600">Podrás votar tan pronto como completes el registro</p>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-4">Requisitos para registrarse:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Ser ciudadano peruano mayor de 18 años
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Tener DNI vigente
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Correo electrónico válido
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  No haber votado en esta elección
                </li>
              </ul>
            </div>
          </div>

          {/* Right side - Registration Form */}
          <div className="lg:pl-8">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl text-gray-900">Crear Cuenta</CardTitle>
                <CardDescription className="text-gray-600">
                  Completa tus datos para registrarte en el sistema electoral
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AuthForm mode="register" />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
