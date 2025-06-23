import { useCandidatesStore } from '@/store';
import { Candidate } from '@/types';
import { useCallback } from 'react';

export function useCandidates() {
  const {
    candidates,
    selectedCandidate,
    isLoading,
    error,
    filters,
    fetchCandidates,
    createCandidate,
    updateCandidate,
    deleteCandidate,
    selectCandidate,
    setFilters,
    clearFilters,
    getCandidateById,
    getFilteredCandidates,
  } = useCandidatesStore();

  const filteredCandidates = getFilteredCandidates();

  const handleSearch = useCallback((searchTerm: string) => {
    setFilters({ searchTerm });
  }, [setFilters]);

  const handleFilterByParty = useCallback((party: string) => {
    setFilters({ party });
  }, [setFilters]);

  const handleFilterByColor = useCallback((color: string) => {
    setFilters({ color });
  }, [setFilters]);

  const handleCreateCandidate = async (candidateData: Omit<Candidate, 'id'>) => {
    const result = await createCandidate(candidateData);
    return result;
  };

  const handleUpdateCandidate = async (id: number, updates: Partial<Candidate>) => {
    const result = await updateCandidate(id, updates);
    return result;
  };

  const handleDeleteCandidate = async (id: number) => {
    const result = await deleteCandidate(id);
    return result;
  };

  return {
    // State
    candidates,
    filteredCandidates,
    selectedCandidate,
    isLoading,
    error,
    filters,

    // Actions
    fetchCandidates,
    createCandidate: handleCreateCandidate,
    updateCandidate: handleUpdateCandidate,
    deleteCandidate: handleDeleteCandidate,
    selectCandidate,
    
    // Filter actions
    search: handleSearch,
    filterByParty: handleFilterByParty,
    filterByColor: handleFilterByColor,
    clearFilters,
    
    // Utilities
    getCandidateById,
  };
}
