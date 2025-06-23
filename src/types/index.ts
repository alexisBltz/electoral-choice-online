export interface User {
  id: number;
  name: string;
  email: string;
  dni?: string;
  hasVoted: boolean;
  isAdmin: boolean;
  createdAt?: Date;
}

export interface Candidate {
  id: number;
  name: string;
  party: string;
  color: CandidateColor;
  proposals: string[];
  experience: string;
  image?: string;
  votes?: number;
  percentage?: number;
}

export interface Vote {
  id: string;
  candidateId: number;
  userId: number;
  timestamp: Date;
  verified: boolean;
}

export interface ElectionResults {
  totalVotes: number;
  candidates: Candidate[];
  lastUpdated: Date;
  isFinalized: boolean;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  dni: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type CandidateColor = 'blue' | 'red' | 'green' | 'purple';

export type AuthMode = 'login' | 'register';

export type UserRole = 'voter' | 'admin';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ElectionConfig {
  isVotingActive: boolean;
  startDate: Date;
  endDate: Date;
  title: string;
  description: string;
}
