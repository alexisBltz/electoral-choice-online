import { create } from 'zustand';
import { ElectionConfig } from '@/types';

interface ElectionState {
  config: ElectionConfig;
  isVotingActive: boolean;
  stats: {
    totalVoters: number;
    totalVotes: number;
    totalCandidates: number;
    participationRate: number;
  };
  isLoading: boolean;
  error: string | null;
}

interface ElectionActions {
  fetchElectionConfig: () => Promise<void>;
  updateElectionConfig: (config: Partial<ElectionConfig>) => Promise<{ success: boolean; error?: string }>;
  fetchStats: () => Promise<void>;
  toggleVoting: () => Promise<{ success: boolean; error?: string }>;
}

export const useElectionStore = create<ElectionState & ElectionActions>((set, get) => ({
  // State
  config: {
    isVotingActive: false,
    startDate: new Date(),
    endDate: new Date(),
    title: 'Elecciones Generales 2024',
    description: 'Proceso electoral para elegir autoridades'
  },
  isVotingActive: false,
  stats: {
    totalVoters: 0,
    totalVotes: 0,
    totalCandidates: 0,
    participationRate: 0
  },
  isLoading: false,
  error: null,

  // Actions
  fetchElectionConfig: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Mock implementation - replace with actual API call
      const mockConfig: ElectionConfig = {
        isVotingActive: true,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        title: 'Elecciones Generales 2024',
        description: 'Proceso electoral para elegir autoridades locales y regionales'
      };
      
      set({
        config: mockConfig,
        isVotingActive: mockConfig.isVotingActive,
        isLoading: false
      });
    } catch (error) {
      set({
        error: 'Error al cargar configuración electoral',
        isLoading: false
      });
    }
  },

  updateElectionConfig: async (updates) => {
    set({ isLoading: true, error: null });
    
    try {
      // Mock implementation - replace with actual API call
      const updatedConfig = { ...get().config, ...updates };
      
      set({
        config: updatedConfig,
        isVotingActive: updatedConfig.isVotingActive,
        isLoading: false
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = 'Error al actualizar configuración';
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  fetchStats: async () => {
    try {
      // Mock implementation - replace with actual API call
      const mockStats = {
        totalVoters: 5000,
        totalVotes: 3925,
        totalCandidates: 4,
        participationRate: 78.5
      };
      
      set({ stats: mockStats });
    } catch (error) {
      console.error('Error fetching election stats:', error);
    }
  },

  toggleVoting: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const newStatus = !get().isVotingActive;
      
      set({
        isVotingActive: newStatus,
        config: { ...get().config, isVotingActive: newStatus },
        isLoading: false
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = 'Error al cambiar estado de votación';
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  }
}));
