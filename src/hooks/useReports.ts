// src/hooks/useReports.ts

import { useState, useEffect, useCallback } from 'react';
import { reportService } from '../services/reportService';
import { ReportsState, ReportStatus, CandidateVotesDTO, OverallResultsDTO } from '../types/reports';

/**
 * Opciones para configurar el comportamiento del hook useReports
 */
interface UseReportsOptions {
  /** Si debe cargar los datos automáticamente al montar el componente */
  autoLoad?: boolean;
  /** Intervalo en milisegundos para refrescar automáticamente los datos */
  refreshInterval?: number;
  /** Si debe mostrar logs de debug en la consola */
  debug?: boolean;
}

/**
 * Hook personalizado para manejar el estado y las operaciones de reportes
 * @param options - Opciones de configuración del hook
 * @returns Estado y funciones para manejar reportes
 */
export const useReports = (options: UseReportsOptions = {}) => {
  const {
    autoLoad = true,
    refreshInterval,
    debug = false
  } = options;

  // Estado principal de los reportes
  const [state, setState] = useState<ReportsState>({
    candidateVotes: [],
    overallResults: null,
    status: ReportStatus.IDLE,
    error: null,
    lastUpdated: null,
  });

  /**
   * Función para actualizar el estado de manera segura
   */
  const updateState = useCallback((updates: Partial<ReportsState>) => {
    setState(prevState => ({
      ...prevState,
      ...updates,
      lastUpdated: new Date(),
    }));
  }, []);

  /**
   * Función para manejar errores de manera consistente
   */
  const handleError = useCallback((error: unknown, context: string) => {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    
    if (debug) {
      console.error(`[useReports] Error en ${context}:`, error);
    }

    updateState({
      status: ReportStatus.ERROR,
      error: errorMessage,
    });
  }, [debug, updateState]);

  /**
   * Carga los votos por candidato
   */
  const loadCandidateVotes = useCallback(async (): Promise<CandidateVotesDTO[]> => {
    try {
      if (debug) {
        console.log('[useReports] Cargando votos por candidato...');
      }

      const candidateVotes = await reportService.getVotesByCandidate();
      
      updateState({
        candidateVotes,
        status: ReportStatus.SUCCESS,
        error: null,
      });

      if (debug) {
        console.log('[useReports] Votos por candidato cargados:', candidateVotes);
      }

      return candidateVotes;
    } catch (error) {
      handleError(error, 'loadCandidateVotes');
      throw error;
    }
  }, [debug, updateState, handleError]);

  /**
   * Carga los resultados generales
   */
  const loadOverallResults = useCallback(async (): Promise<OverallResultsDTO> => {
    try {
      if (debug) {
        console.log('[useReports] Cargando resultados generales...');
      }

      const overallResults = await reportService.getOverallResults();
      
      updateState({
        overallResults,
        status: ReportStatus.SUCCESS,
        error: null,
      });

      if (debug) {
        console.log('[useReports] Resultados generales cargados:', overallResults);
      }

      return overallResults;
    } catch (error) {
      handleError(error, 'loadOverallResults');
      throw error;
    }
  }, [debug, updateState, handleError]);

  /**
   * Carga todos los reportes (votos por candidato y resultados generales)
   */
  const loadAllReports = useCallback(async (): Promise<void> => {
    updateState({ status: ReportStatus.LOADING, error: null });

    try {
      if (debug) {
        console.log('[useReports] Cargando todos los reportes...');
      }

      // Cargar ambos reportes en paralelo
      const [candidateVotes, overallResults] = await Promise.all([
        reportService.getVotesByCandidate(),
        reportService.getOverallResults(),
      ]);

      updateState({
        candidateVotes,
        overallResults,
        status: ReportStatus.SUCCESS,
        error: null,
      });

      if (debug) {
        console.log('[useReports] Todos los reportes cargados exitosamente');
      }
    } catch (error) {
      handleError(error, 'loadAllReports');
    }
  }, [debug, updateState, handleError]);

  /**
   * Refresca los datos del backend y luego recarga los reportes
   */
  const refreshReports = useCallback(async (): Promise<void> => {
    updateState({ status: ReportStatus.REFRESHING, error: null });

    try {
      if (debug) {
        console.log('[useReports] Refrescando reportes...');
      }

      // Primero refrescar los datos en el backend
      await reportService.refreshReports();
      
      // Luego recargar los reportes
      await loadAllReports();

      if (debug) {
        console.log('[useReports] Reportes refrescados exitosamente');
      }
    } catch (error) {
      handleError(error, 'refreshReports');
    }
  }, [debug, updateState, handleError, loadAllReports]);

  /**
   * Verifica si el servicio de reportes está disponible
   */
  const checkServiceHealth = useCallback(async (): Promise<boolean> => {
    try {
      const isHealthy = await reportService.healthCheck();
      
      if (debug) {
        console.log('[useReports] Estado del servicio:', isHealthy ? 'Saludable' : 'No disponible');
      }

      return isHealthy;
    } catch (error) {
      if (debug) {
        console.error('[useReports] Error al verificar el estado del servicio:', error);
      }
      return false;
    }
  }, [debug]);

  /**
   * Limpia el estado de error
   */
  const clearError = useCallback(() => {
    updateState({ error: null });
  }, [updateState]);

  /**
   * Efecto para cargar datos automáticamente al montar el componente
   */
  useEffect(() => {
    if (autoLoad) {
      loadAllReports();
    }
  }, [autoLoad, loadAllReports]);

  /**
   * Efecto para configurar el refresco automático
   */
  useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      const intervalId = setInterval(() => {
        if (state.status !== ReportStatus.LOADING && state.status !== ReportStatus.REFRESHING) {
          loadAllReports();
        }
      }, refreshInterval);

      return () => clearInterval(intervalId);
    }
  }, [refreshInterval, loadAllReports, state.status]);

  // Estados derivados para facilitar el uso en componentes
  const isLoading = state.status === ReportStatus.LOADING;
  const isRefreshing = state.status === ReportStatus.REFRESHING;
  const isError = state.status === ReportStatus.ERROR;
  const isSuccess = state.status === ReportStatus.SUCCESS;
  const hasData = state.candidateVotes.length > 0 || state.overallResults !== null;

  return {
    // Estado
    ...state,
    
    // Estados derivados
    isLoading,
    isRefreshing,
    isError,
    isSuccess,
    hasData,
    
    // Acciones
    loadCandidateVotes,
    loadOverallResults,
    loadAllReports,
    refreshReports,
    checkServiceHealth,
    clearError,
  };
};

