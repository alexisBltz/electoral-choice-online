import { ApiResponse, Vote, ElectionResults, Candidate } from '@/types';
import { candidateService } from './candidateService';

class VoteService {
  private votes: Vote[] = [];
  private voteCounts: Record<number, number> = {};

  async castVote(candidateId: number, userId: number): Promise<ApiResponse<Vote>> {
    try {
      await this.simulateDelay();
      
      // Verificar si ya votó
      const existingVote = this.votes.find(v => v.userId === userId);
      if (existingVote) {
        return {
          success: false,
          error: 'El usuario ya ha votado'
        };
      }

      const vote: Vote = {
        id: `vote_${Date.now()}_${userId}`,
        candidateId,
        userId,
        timestamp: new Date(),
        verified: true
      };

      this.votes.push(vote);
      this.voteCounts[candidateId] = (this.voteCounts[candidateId] || 0) + 1;

      return {
        success: true,
        data: vote,
        message: 'Voto registrado exitosamente'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error al registrar el voto'
      };
    }
  }

  async getResults(): Promise<ApiResponse<ElectionResults>> {
    try {
      await this.simulateDelay();
      
      const candidatesResponse = await candidateService.getAllCandidates();
      if (!candidatesResponse.success || !candidatesResponse.data) {
        return {
          success: false,
          error: 'Error al obtener candidatos'
        };
      }

      const totalVotes = Object.values(this.voteCounts).reduce((sum, count) => sum + count, 0);
      
      // Simular algunos votos si no hay ninguno
      if (totalVotes === 0) {
        this.simulateInitialVotes();
      }

      const candidatesWithResults: Candidate[] = candidatesResponse.data.map(candidate => {
        const votes = this.voteCounts[candidate.id] || 0;
        const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
        
        return {
          ...candidate,
          votes,
          percentage: Math.round(percentage * 10) / 10
        };
      });

      // Ordenar por número de votos
      candidatesWithResults.sort((a, b) => (b.votes || 0) - (a.votes || 0));

      const results: ElectionResults = {
        totalVotes: Object.values(this.voteCounts).reduce((sum, count) => sum + count, 0),
        candidates: candidatesWithResults,
        lastUpdated: new Date(),
        isFinalized: false
      };

      return {
        success: true,
        data: results
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error al obtener resultados'
      };
    }
  }

  async hasUserVoted(userId: number): Promise<boolean> {
    return this.votes.some(vote => vote.userId === userId);
  }

  private simulateInitialVotes(): void {
    // Simular algunos votos iniciales para demostración
    const initialVotes = {
      1: 1247,
      2: 986,
      3: 456,
      4: 261
    };

    this.voteCounts = { ...initialVotes };
  }

  private async simulateDelay(ms: number = 1000): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const voteService = new VoteService();
