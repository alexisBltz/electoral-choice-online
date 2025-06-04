
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const CandidateList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for candidates
  const candidates = [
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

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.party.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPartyColor = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-800 border-blue-200",
      red: "bg-red-100 text-red-800 border-red-200", 
      green: "bg-green-100 text-green-800 border-green-200",
      purple: "bg-purple-100 text-purple-800 border-purple-200"
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar candidatos o partidos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Candidates Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredCandidates.map((candidate) => (
          <Card 
            key={candidate.id} 
            className="hover:shadow-lg transition-shadow duration-200 border-l-4"
            style={{ borderLeftColor: candidate.color === 'blue' ? '#3b82f6' : 
                                     candidate.color === 'red' ? '#ef4444' :
                                     candidate.color === 'green' ? '#10b981' : '#8b5cf6' }}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl">{candidate.name}</CardTitle>
                  <Badge className={getPartyColor(candidate.color)}>
                    {candidate.party}
                  </Badge>
                </div>
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-600">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
              <CardDescription className="text-sm">
                {candidate.experience}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-gray-900">Propuestas Principales:</h4>
                <ul className="space-y-2">
                  {candidate.proposals.map((proposal, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      {proposal}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No se encontraron candidatos que coincidan con tu búsqueda.</p>
        </div>
      )}
    </div>
  );
};

export default CandidateList;
