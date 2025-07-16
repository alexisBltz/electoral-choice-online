import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; // <--- IMPORTANTE
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { authService } from '@/services/authService';

const AuthForm = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login"); // <--- ESTADO PARA EL TAB
  const { toast } = useToast();
  const navigate = useNavigate(); // <--- HOOK DE NAVIGATE

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    username: '',
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(loginForm.username)) {
      toast({
        title: "Error de validación",
        description: "Por favor ingresa un email válido",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await authService.login({
        username: loginForm.username,
        password: loginForm.password
      });

      if (response.success) {
        toast({
          title: "Inicio de sesión exitoso",
          description: response.message,
        });
        // Puedes redirigir aquí, por ejemplo al dashboard:
        navigate("/dashboard"); // Cambia la ruta según tu app
        // O puedes seguir usando onSuccess si lo necesitas
        if (onSuccess) onSuccess(response.data.user);
      } else {
        toast({
          title: "Error de autenticación",
          description: response.message || "Credenciales inválidas",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error de conexión",
        description: "No se pudo conectar con el servidor",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(registerForm.username)) {
      toast({
        title: "Error de validación",
        description: "Por favor ingresa un email válido",
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
    if (registerForm.fullName.length < 2 || registerForm.fullName.length > 100) {
      toast({
        title: "Error de validación",
        description: "El nombre debe tener entre 2 y 100 caracteres",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await authService.register({
        fullName: registerForm.fullName,
        username: registerForm.username,
        password: registerForm.password
      });

      if (response.success) {
        toast({
          title: "Registro exitoso",
          description: response.message,
        });

        setRegisterForm({
          fullName: '',
          username: '',
          password: '',
          confirmPassword: ''
        });

        // Cambia a la pestaña de login
        setActiveTab("login");
      } else {
        toast({
          title: "Error en el registro",
          description: response.message || "No se pudo crear la cuenta",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error de conexión",
        description: "No se pudo conectar con el servidor",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="login" className="text-sm">Iniciar Sesión</TabsTrigger>
        <TabsTrigger value="register" className="text-sm">Registrarse</TabsTrigger>
      </TabsList>

      <TabsContent value="login">
        <form onSubmit={handleLogin} className="space-y-4">
          {/* ...campos login igual que antes... */}
          <div className="space-y-2">
            <Label htmlFor="username" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Label>
            <Input
              id="username"
              type="email"
              placeholder="joel.chino@example.com"
              value={loginForm.username}
              onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
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
          {/* ...campos registro igual que antes... */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Nombre Completo
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Joel Chino"
              value={registerForm.fullName}
              onChange={(e) => setRegisterForm({...registerForm, fullName: e.target.value})}
              required
              className="pl-4"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-username" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Label>
            <Input
              id="register-username"
              type="email"
              placeholder="joel.chino@example.com"
              value={registerForm.username}
              onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
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