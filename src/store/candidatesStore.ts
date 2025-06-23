import { create } from 'zustand';
import { Candidate } from '@/types';
import { candidateService } from '@/services';

interface CandidatesState {
  candidates: Candidate[];
  selectedCandidate: Candidate | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    searchTerm: string;
    party: string;
    color: string;
  };
}

interface CandidatesActions {
  fetchCandidates: () => Promise<void>;
  createCandidate: (candidate: Omit<Candidate, 'id'>) => Promise<{ success: boolean; error?: string }>;
  updateCandidate: (id: number, updates: Partial<Candidate>) => Promise<{ success: boolean; error?: string }>;
  deleteCandidate: (id: number) => Promise<{ success: boolean; error?: string }>;
  selectCandidate: (candidate: Candidate | null) => void;
  setFilters: (filters: Partial<CandidatesState['filters']>) => void;
  clearFilters: () => void;
  getCandidateById: (id: number) => Candidate | undefined;
  getFilteredCandidates: () => Candidate[];
}

export const useCandidatesStore = create<CandidatesState & CandidatesActions>((set, get) => ({
  // State
  candidates: [],
  selectedCandidate: null,
  isLoading: false,
  error: null,
  filters: {
    searchTerm: '',
    party: '',
    color: ''
  },

  // Actions
  fetchCandidates: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await candidateService.getAllCandidates();
      
      if (response.success && response.data) {
        set({
          candidates: response.data,
          isLoading: false
        });
      } else {
        set({
          error: response.error || 'Error al cargar candidatos',
          isLoading: false
        });
      }
    } catch (error) {
      set({
        error: 'Error de conexión',
        isLoading: false
      });
    }
  },

  createCandidate: async (candidateData) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await candidateService.createCandidate(candidateData);
      
      if (response.success && response.data) {
        set(state => ({
          candidates: [...state.candidates, response.data!],
          isLoading: false
        }));
        return { success: true };
      } else {
        set({
          error: response.error || 'Error al crear candidato',
          isLoading: false
        });
        return { success: false, error: response.error };
      }
    } catch (error) {
      const errorMessage = 'Error de conexión';
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  updateCandidate: async (id, updates) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await candidateService.updateCandidate(id, updates);
      
      if (response.success && response.data) {
        set(state => ({
          candidates: state.candidates.map(candidate =>
            candidate.id === id ? response.data! : candidate
          ),
          isLoading: false
        }));
        return { success: true };
      } else {
        set({
          error: response.error || 'Error al actualizar candidato',
          isLoading: false
        });
        return { success: false, error: response.error };
      }
    } catch (error) {
      const errorMessage = 'Error de conexión';
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  deleteCandidate: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await candidateService.deleteCandidate(id);
      
      if (response.success) {
        set(state => ({
          candidates: state.candidates.filter(candidate => candidate.id !== id),
          selectedCandidate: state.selectedCandidate?.id === id ? null : state.selectedCandidate,
          isLoading: false
        }));
        return { success: true };
      } else {
        set({
          error: response.error || 'Error al eliminar candidato',
          isLoading: false
        });
        return { success: false, error: response.error };
      }
    } catch (error) {
      const errorMessage = 'Error de conexión';
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  selectCandidate: (candidate) => set({ selectedCandidate: candidate }),

  setFilters: (newFilters) => set(state => ({
    filters: { ...state.filters, ...newFilters }
  })),

  clearFilters: () => set({
    filters: {
      searchTerm: '',
      party: '',
      color: ''
    }
  }),

  getCandidateById: (id) => {
    return get().candidates.find(candidate => candidate.id === id);
  },

  getFilteredCandidates: () => {
    const { candidates, filters } = get();
    
    return candidates.filter(candidate => {
      const matchesSearch = !filters.searchTerm || 
        candidate.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        candidate.party.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesParty = !filters.party || candidate.party === filters.party;
      const matchesColor = !filters.color || candidate.color === filters.color;
      
      return matchesSearch && matchesParty && matchesColor;
    });
  }
}));
