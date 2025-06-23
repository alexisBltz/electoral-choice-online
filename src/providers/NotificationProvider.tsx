import React from 'react';
import { useAppStore } from '@/store';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';

interface NotificationProviderProps {
  children: React.ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const { notifications } = useAppStore();

  return (
    <>
      {children}
      <Toaster />
      <Sonner />
    </>
  );
}
