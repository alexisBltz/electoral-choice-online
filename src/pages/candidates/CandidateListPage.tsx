import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCandidates } from '@/hooks/useCandidates';
import { useNavigate } from 'react-router-dom';
import { Users, Search, Filter, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CandidateListPage: React.FC = () => {
  const { candidates, loading, error } = useCandidates();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterParty, setFilterParty] = React.useState<string>('all');

  const filteredCandidates = React.useMemo(() => {
    return candidates.filter(candidate => {
      const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           candidate.party.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesParty = filterParty === 'all' || candidate.party === filterParty;
      return matchesSearch && matchesParty;
    });
  }, [candidates, searchTerm, filterParty]);

  const uniqueParties = React.useMemo(() => {
    return Array.from(new Set(candidates.map(c => c.party)));
  }, [candidates]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <Card className="border-destructive">
          <CardContent className="p-6">
            <p className="text-destructive">Error al cargar candidatos: {error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lista de Candidatos</h1>
          <p className="text-muted-foreground">
            Gestiona y visualiza todos los candidatos registrados
          </p>
        </div>
        <Button onClick={() => navigate('/candidates/register')} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Registrar Candidato
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros y Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre o partido..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterParty} onValueChange={setFilterParty}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por partido" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los partidos</SelectItem>
                {uniqueParties.map(party => (
                  <SelectItem key={party} value={party}>{party}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Users className="h-4 w-4" />
        <span>
          Mostrando {filteredCandidates.length} de {candidates.length} candidatos
        </span>
      </div>

      {/* Candidate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate) => (
          <Card key={candidate.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/candidates/${candidate.id}`)}>
            <CardHeader className="text-center">
              <Avatar className="w-20 h-20 mx-auto mb-4">
                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{candidate.name}</CardTitle>
              <CardDescription>{candidate.position}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <Badge variant="secondary">{candidate.party}</Badge>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {candidate.description}
                </p>
              </div>
              <div className="flex justify-between items-center pt-4">
                <Button variant="outline" size="sm" onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/candidates/${candidate.id}/edit`);
                }}>
                  Editar
                </Button>
                <Button size="sm" onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/candidates/${candidate.id}`);
                }}>
                  Ver Detalles
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No se encontraron candidatos</h3>
            <p className="text-muted-foreground">
              {searchTerm || filterParty !== 'all' 
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'Aún no hay candidatos registrados'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CandidateListPage;
