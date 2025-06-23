import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  theme: 'light' | 'dark' | 'system';
  language: 'es' | 'en';
  isLoading: boolean;
  notifications: Notification[];
  errors: AppError[];
}

interface AppActions {
  setTheme: (theme: AppState['theme']) => void;
  setLanguage: (language: AppState['language']) => void;
  setLoading: (isLoading: boolean) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  addError: (error: AppError) => void;
  clearErrors: () => void;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

export interface AppError {
  id: string;
  message: string;
  code?: string;
  timestamp: Date;
}

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set, get) => ({
      // State
      theme: 'system',
      language: 'es',
      isLoading: false,
      notifications: [],
      errors: [],

      // Actions
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setLoading: (isLoading) => set({ isLoading }),
      
      addNotification: (notification) => {
        const id = Math.random().toString(36).substring(7);
        const newNotification = { ...notification, id };
        set(state => ({
          notifications: [...state.notifications, newNotification]
        }));
        
        // Auto-remove after duration
        if (notification.duration !== 0) {
          setTimeout(() => {
            get().removeNotification(id);
          }, notification.duration || 5000);
        }
      },
      
      removeNotification: (id) => set(state => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),
      
      addError: (error) => {
        const newError = {
          ...error,
          id: Math.random().toString(36).substring(7),
          timestamp: new Date()
        };
        set(state => ({
          errors: [...state.errors, newError]
        }));
      },
      
      clearErrors: () => set({ errors: [] })
    }),
    {
      name: 'app-store',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language
      })
    }
  )
);
