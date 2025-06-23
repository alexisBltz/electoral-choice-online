import React, { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '@/store';
import { ApiServiceFactory } from '@/services';
import { config } from '@/config';

interface AppProviderContextType {
  isInitialized: boolean;
}

const AppProviderContext = createContext<AppProviderContextType | undefined>(undefined);

export function useAppProvider() {
  const context = useContext(AppProviderContext);
  if (context === undefined) {
    throw new Error('useAppProvider must be used within an AppProvider');
  }
  return context;
}

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const { user, token, isAuthenticated } = useAuthStore();
  const [isInitialized, setIsInitialized] = React.useState(false);

  useEffect(() => {
    // Initialize API client with token if available
    if (token && isAuthenticated) {
      ApiServiceFactory.getInstance().setAuthToken(token);
    } else {
      ApiServiceFactory.getInstance().removeAuthToken();
    }

    // Set as initialized after token setup
    setIsInitialized(true);
  }, [token, isAuthenticated]);

  useEffect(() => {
    // Setup error handling
    const handleError = (event: ErrorEvent) => {
      if (config.features.enableDevTools) {
        console.error('Global error:', event.error);
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (config.features.enableDevTools) {
        console.error('Unhandled rejection:', event.reason);
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  const value = {
    isInitialized
  };

  return (
    <AppProviderContext.Provider value={value}>
      {children}
    </AppProviderContext.Provider>
  );
}
