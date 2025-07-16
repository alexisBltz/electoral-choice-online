// src/types/reports.ts

/**
 * DTO para representar los votos de un candidato específico
 */
export interface CandidateVotesDTO {
  candidateName: string;
  voteCount: number;
  percentage: number;
}

/**
 * DTO para representar los resultados generales de la votación
 */
export interface OverallResultsDTO {
  winner: string | null;
  totalVotes: number;
  totalUsers: number;
  participationPercentage: number;
  votingStatus: string;
  candidateResults: CandidateVotesDTO[];
}

/**
 * Respuesta genérica de la API para endpoints de reportes
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errorCode?: string;
}

/**
 * Estados posibles para las operaciones de reportes
 */
export enum ReportStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  REFRESHING = 'refreshing'
}

/**
 * Tipo para el estado de los reportes en el hook personalizado
 */
export interface ReportsState {
  candidateVotes: CandidateVotesDTO[];
  overallResults: OverallResultsDTO | null;
  status: ReportStatus;
  error: string | null;
  lastUpdated: Date | null;
}

/**
 * Configuración para las llamadas a la API de reportes
 */
export interface ReportsApiConfig {
  baseUrl: string;
  timeout?: number;
  retries?: number;
}

