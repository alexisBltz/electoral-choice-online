
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, User, CreditCard } from 'lucide-react';

const AuthForm = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState({
    name: '',
    dni: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasMinLength = password.length >= 8;
    
    return hasUpperCase && hasLowerCase && hasNumbers && hasMinLength;
  };

  const validateDNI = (dni) => {
    // Validar que el DNI tenga 8 dígitos
    const dniRegex = /^\d{8}$/;
    return dniRegex.test(dni);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(loginForm.email)) {
      toast({
        title: "Error de validación",
        description: "Por favor ingresa un email válido",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const mockUser = {
        id: 1,
        name: "Usuario Demo",
        email: loginForm.email,
        hasVoted: false,
        isAdmin: loginForm.email.includes('admin')
      };
      
      onSuccess(mockUser);
      setIsLoading(false);
    }, 1500);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(registerForm.email)) {
      toast({
        title: "Error de validación",
        description: "Por favor ingresa un email válido",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (!validateDNI(registerForm.dni)) {
      toast({
        title: "Error de validación",
        description: "El DNI debe tener exactamente 8 dígitos",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (!validatePassword(registerForm.password)) {
      toast({
        title: "Error de validación",
        description: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Error de validación",
        description: "Las contraseñas no coinciden",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (registerForm.name.length < 2 || registerForm.name.length > 100) {
      toast({
        title: "Error de validación",
        description: "El nombre debe tener entre 2 y 100 caracteres",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const mockUser = {
        id: Date.now(),
        name: registerForm.name,
        dni: registerForm.dni,
        email: registerForm.email,
        hasVoted: false,
        isAdmin: false
      };
      
      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada correctamente",
      });
      
      onSuccess(mockUser);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="login" className="text-sm">Iniciar Sesión</TabsTrigger>
        <TabsTrigger value="register" className="text-sm">Registrarse</TabsTrigger>
      </TabsList>

      <TabsContent value="login">
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={loginForm.email}
              onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
              required
              className="pl-4"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Contraseña
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                required
                className="pl-4 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="register">
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Nombre Completo
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Juan Pérez"
              value={registerForm.name}
              onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
              required
              className="pl-4"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dni" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              DNI
            </Label>
            <Input
              id="dni"
              type="text"
              placeholder="12345678"
              value={registerForm.dni}
              onChange={(e) => setRegisterForm({...registerForm, dni: e.target.value})}
              required
              maxLength={8}
              className="pl-4"
            />
            <p className="text-xs text-gray-500">
              Ingresa tu DNI de 8 dígitos
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Label>
            <Input
              id="register-email"
              type="email"
              placeholder="tu@email.com"
              value={registerForm.email}
              onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
              required
              className="pl-4"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Contraseña
            </Label>
            <div className="relative">
              <Input
                id="register-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                required
                className="pl-4 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Mínimo 8 caracteres, una mayúscula, una minúscula y un número
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              value={registerForm.confirmPassword}
              onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
              required
              className="pl-4"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
};

export default AuthForm;
