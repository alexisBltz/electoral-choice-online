import { useState, useEffect, useCallback } from 'react';
import { ElectionResults } from '@/types';
import { voteService } from '@/services';
import { useToast } from '@/hooks/use-toast';
import { APP_CONFIG } from '@/constants';

export const useElectionResults = () => {
  const [results, setResults] = useState<ElectionResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchResults = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await voteService.getResults();
      
      if (response.success && response.data) {
        setResults(response.data);
      } else {
        setError(response.error || 'Error al cargar resultados');
        toast({
          title: "Error",
          description: response.error || 'Error al cargar resultados',
          variant: "destructive"
        });
      }
    } catch (err) {
      const errorMessage = 'Error de conexión';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const castVote = async (candidateId: number, userId: number) => {
    setIsLoading(true);
    
    try {
      const response = await voteService.castVote(candidateId, userId);
      
      if (response.success) {
        toast({
          title: "¡Voto registrado!",
          description: response.message || 'Tu voto ha sido registrado exitosamente'
        });
        
        // Actualizar resultados después de votar
        await fetchResults();
        
        return { success: true, data: response.data };
      } else {
        toast({
          title: "Error",
          description: response.error || 'Error al registrar el voto',
          variant: "destructive"
        });
        return { success: false, error: response.error };
      }
    } catch (err) {
      const errorMessage = 'Error de conexión';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const checkUserVoted = async (userId: number): Promise<boolean> => {
    try {
      return await voteService.hasUserVoted(userId);
    } catch (err) {
      console.error('Error checking vote status:', err);
      return false;
    }
  };

  useEffect(() => {
    fetchResults();
    
    // Auto-refresh resultados cada 30 segundos
    const interval = setInterval(fetchResults, APP_CONFIG.REFRESH_INTERVAL);
    
    return () => clearInterval(interval);
  }, [fetchResults]);

  return {
    results,
    isLoading,
    error,
    fetchResults,
    castVote,
    checkUserVoted
  };
};
