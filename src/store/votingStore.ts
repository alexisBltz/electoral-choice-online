import { create } from 'zustand';
import { ElectionResults, Vote } from '@/types';
import { voteService } from '@/services';

interface VotingState {
  hasVoted: boolean;
  isVoting: boolean;
  results: ElectionResults | null;
  isLoadingResults: boolean;
  error: string | null;
  lastVote: Vote | null;
}

interface VotingActions {
  castVote: (candidateId: number, userId: number) => Promise<{ success: boolean; error?: string }>;
  fetchResults: () => Promise<void>;
  checkVotingStatus: (userId: number) => Promise<void>;
  resetVotingState: () => void;
}

export const useVotingStore = create<VotingState & VotingActions>((set, get) => ({
  // State
  hasVoted: false,
  isVoting: false,
  results: null,
  isLoadingResults: false,
  error: null,
  lastVote: null,

  // Actions
  castVote: async (candidateId, userId) => {
    set({ isVoting: true, error: null });
    
    try {
      const response = await voteService.castVote(candidateId, userId);
      
      if (response.success) {
        set({
          hasVoted: true,
          isVoting: false,
          lastVote: response.data
        });
        
        // Actualizar resultados después de votar
        get().fetchResults();
        
        return { success: true };
      } else {
        set({
          error: response.error || 'Error al registrar el voto',
          isVoting: false
        });
        return { success: false, error: response.error };
      }
    } catch (error) {
      const errorMessage = 'Error de conexión';
      set({ error: errorMessage, isVoting: false });
      return { success: false, error: errorMessage };
    }
  },

  fetchResults: async () => {
    set({ isLoadingResults: true, error: null });
    
    try {
      const response = await voteService.getResults();
      
      if (response.success && response.data) {
        set({
          results: response.data,
          isLoadingResults: false
        });
      } else {
        set({
          error: response.error || 'Error al cargar resultados',
          isLoadingResults: false
        });
      }
    } catch (error) {
      set({
        error: 'Error de conexión',
        isLoadingResults: false
      });
    }
  },

  checkVotingStatus: async (userId) => {
    try {
      const hasVoted = await voteService.hasUserVoted(userId);
      set({ hasVoted });
    } catch (error) {
      console.error('Error checking voting status:', error);
    }
  },

  resetVotingState: () => set({
    hasVoted: false,
    isVoting: false,
    results: null,
    error: null,
    lastVote: null
  })
}));
