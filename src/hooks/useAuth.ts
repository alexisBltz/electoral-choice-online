import { useAuthStore } from '@/store';
import { AuthCredentials, RegisterData } from '@/types';

export function useAuth() {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
    setUser,
    updateUser,
  } = useAuthStore();

  const handleLogin = async (credentials: AuthCredentials) => {
    const result = await login(credentials);
    return result;
  };

  const handleRegister = async (data: RegisterData) => {
    const result = await register(data);
    return result;
  };

  const handleLogout = () => {
    logout();
  };

  return {
    // State
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    
    // Actions
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    clearError,
    setUser,
    updateUser,
  };
}
