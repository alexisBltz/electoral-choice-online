import { ApiResponse, Candidate } from '@/types';
import { API_ENDPOINTS } from '@/constants';

class CandidateService {
  private mockCandidates: Candidate[] = [
    {
      id: 1,
      name: "María González",
      party: "Partido Democrático",
      color: "blue",
      proposals: [
        "Modernización del sistema de salud",
        "Inversión en educación digital",
        "Creación de empleos verdes"
      ],
      experience: "Senadora por 8 años, ex-Ministra de Educación",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      party: "Alianza Nacional",
      color: "red",
      proposals: [
        "Reducción de impuestos empresariales",
        "Fortalecimiento de la seguridad ciudadana",
        "Apoyo a pequeñas empresas"
      ],
      experience: "Gobernador por 6 años, empresario exitoso",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Ana Martínez",
      party: "Movimiento Verde",
      color: "green",
      proposals: [
        "Transición hacia energías renovables",
        "Protección de áreas naturales",
        "Agricultura sostenible"
      ],
      experience: "Activista ambiental, doctora en Ciencias Ambientales",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Roberto Silva",
      party: "Frente Independiente",
      color: "purple",
      proposals: [
        "Gobierno transparente y digital",
        "Participación ciudadana directa",
        "Lucha contra la corrupción"
      ],
      experience: "Alcalde por 4 años, ingeniero de sistemas",
      image: "/placeholder.svg"
    }
  ];

  async getAllCandidates(): Promise<ApiResponse<Candidate[]>> {
    try {
      await this.simulateDelay();
      return {
        success: true,
        data: [...this.mockCandidates]
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error al obtener candidatos'
      };
    }
  }

  async getCandidateById(id: number): Promise<ApiResponse<Candidate>> {
    try {
      await this.simulateDelay();
      const candidate = this.mockCandidates.find(c => c.id === id);
      
      if (!candidate) {
        return {
          success: false,
          error: 'Candidato no encontrado'
        };
      }

      return {
        success: true,
        data: candidate
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error al obtener candidato'
      };
    }
  }

  async createCandidate(candidate: Omit<Candidate, 'id'>): Promise<ApiResponse<Candidate>> {
    try {
      await this.simulateDelay();
      
      const newCandidate: Candidate = {
        ...candidate,
        id: Date.now()
      };
      
      this.mockCandidates.push(newCandidate);
      
      return {
        success: true,
        data: newCandidate,
        message: 'Candidato creado exitosamente'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error al crear candidato'
      };
    }
  }

  async updateCandidate(id: number, updates: Partial<Candidate>): Promise<ApiResponse<Candidate>> {
    try {
      await this.simulateDelay();
      
      const index = this.mockCandidates.findIndex(c => c.id === id);
      if (index === -1) {
        return {
          success: false,
          error: 'Candidato no encontrado'
        };
      }

      this.mockCandidates[index] = { ...this.mockCandidates[index], ...updates };
      
      return {
        success: true,
        data: this.mockCandidates[index],
        message: 'Candidato actualizado exitosamente'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error al actualizar candidato'
      };
    }
  }

  async deleteCandidate(id: number): Promise<ApiResponse<void>> {
    try {
      await this.simulateDelay();
      
      const index = this.mockCandidates.findIndex(c => c.id === id);
      if (index === -1) {
        return {
          success: false,
          error: 'Candidato no encontrado'
        };
      }

      this.mockCandidates.splice(index, 1);
      
      return {
        success: true,
        message: 'Candidato eliminado exitosamente'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error al eliminar candidato'
      };
    }
  }

  private async simulateDelay(ms: number = 1000): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const candidateService = new CandidateService();
