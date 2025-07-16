import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useCandidates } from '@/hooks/useCandidates';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  PieChart,
  ArrowLeft,
  Download,
  Calendar,
  MapPin,
  Clock,
  Activity,
  Target,
  Eye
} from 'lucide-react';

// MOCK_CANDIDATES fallback
const MOCK_CANDIDATES = [
  {
    id: "mock1",
    name: "Ladrón Pérez",
    party: "Partido Corrupto",
    color: "#000000",
    position: "Alcalde",
    slogan: "¡Donde hay dinero, hay progreso (para mí)!",
    description: "Si votas por mí, te devuelvo el 10%... en promesas.",
    avatar: "https://randomuser.me/api/portraits/men/30.jpg"
  },
  {
    id: "mock2",
    name: "Polencio Laborioso",
    party: "Partido Bzz",
    color: "#FFD700",
    position: "Alcalde",
    slogan: "Trabajando como abeja para ti.",
    description: "Trabajador incansable, como una abeja, pero con menos picaduras.",
    avatar: "https://randomuser.me/api/portraits/men/16.jpg"
  },
  {
    id: "mock3",
    name: "Paco el Pato",
    party: "Partido Cuack",
    color: "#00BFFF",
    position: "Alcalde",
    slogan: "¡Más pan y lagos para todos!",
    description: "Nadó contra la corriente para llegar al poder.",
    avatar: "https://randomuser.me/api/portraits/men/25.jpg"
  },
  {
    id: "mock4",
    name: "Sofía Transparente",
    party: "Movimiento Claro",
    color: "#4AD991",
    position: "Alcalde",
    slogan: "Nada que esconder, todo por mostrar.",
    description: "Promueve la transparencia: ¡hasta sus reuniones son en vivo!",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg"
  },
  {
    id: "mock5",
    name: "Carlos Felicidad",
    party: "Partido Sonrisa",
    color: "#FF69B4",
    position: "Alcalde",
    slogan: "Una sonrisa para cada problema.",
    description: "Ofrece más días libres y menos lunes.",
    avatar: "https://randomuser.me/api/portraits/men/60.jpg"
  },
  {
    id: "mock6",
    name: "Martina Verde",
    party: "EcoVerde",
    color: "#228B22",
    position: "Alcalde",
    slogan: "Verde que te quiero verde.",
    description: "Quiere más árboles que postes de luz.",
    avatar: "https://randomuser.me/api/portraits/women/47.jpg"
  },
  {
    id: "mock7",
    name: "Roberto Cibernético",
    party: "Partido Digital",
    color: "#1E90FF",
    position: "Alcalde",
    slogan: "Modernidad y WiFi para todos.",
    description: "Propone WiFi gratis ¡hasta en las plazas!",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg"
  },
  {
    id: "mock8",
    name: "Patricia Fiesta",
    party: "Movimiento Alegre",
    color: "#FFA500",
    position: "Alcalde",
    slogan: "¡Menos impuestos, más fiestas!",
    description: "Más festivales, menos impuestos.",
    avatar: "https://randomuser.me/api/portraits/women/60.jpg"
  },
  {
    id: "mock9",
    name: "Tomás Tiempo",
    party: "Partido Puntual",
    color: "#808080",
    position: "Alcalde",
    slogan: "¡Todo a su hora!",
    description: "Todo a tiempo. ¡Ni un minuto tarde!",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg"
  },
  {
    id: "mock10",
    name: "Luna Creativa",
    party: "Innovadores Unidos",
    color: "#800080",
    position: "Alcalde",
    slogan: "Pensando fuera de la Tierra.",
    description: "Ideas fuera de este mundo (literal).",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

const ResultsAnalyticsPage: React.FC = () => {
  const navigate = useNavigate();
  const { candidates } = useCandidates();
  const [selectedRegion, setSelectedRegion] = React.useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = React.useState('all');

  // Use mock candidates if no real candidates
  const allCandidates = candidates.length > 0 ? candidates : MOCK_CANDIDATES;

  // Mock detailed analytics data
  const analyticsData = {
    overview: {
      totalVotes: 1847520,
      validVotes: 1832456,
      nullVotes: 15064,
      blankVotes: 0,
      participationRate: 43.5,
    },
    demographics: {
      ageGroups: [
        { range: '18-29', percentage: 22.5, votes: 412000 },
        { range: '30-44', percentage: 31.2, votes: 572000 },
        { range: '45-59', percentage: 28.8, votes: 529000 },
        { range: '60+', percentage: 17.5, votes: 321000 },
      ],
      gender: [
        { type: 'Femenino', percentage: 52.3, votes: 958000 },
        { type: 'Masculino', percentage: 47.7, votes: 873000 },
      ],
    },
    geographic: [
      { province: 'San José', votes: 652000, participation: 45.2, winner: allCandidates[0]?.name },
      { province: 'Alajuela', votes: 485000, participation: 42.8, winner: allCandidates[1]?.name },
      { province: 'Cartago', votes: 248000, participation: 44.1, winner: allCandidates[0]?.name },
      { province: 'Heredia', votes: 287000, participation: 46.3, winner: allCandidates[0]?.name },
      { province: 'Guanacaste', votes: 175000, participation: 41.5, winner: allCandidates[2]?.name },
    ],
    temporal: [
      { hour: '08:00', votes: 52000, cumulative: 52000 },
      { hour: '09:00', votes: 89000, cumulative: 141000 },
      { hour: '10:00', votes: 125000, cumulative: 266000 },
      { hour: '11:00', votes: 156000, cumulative: 422000 },
      { hour: '12:00', votes: 98000, cumulative: 520000 },
      { hour: '13:00', votes: 87000, cumulative: 607000 },
      { hour: '14:00', votes: 142000, cumulative: 749000 },
      { hour: '15:00', votes: 168000, cumulative: 917000 },
      { hour: '16:00', votes: 195000, cumulative: 1112000 },
      { hour: '17:00', votes: 142000, cumulative: 1254000 },
      { hour: '18:00', votes: 78000, cumulative: 1332000 },
    ],
  };

  // Always generate candidateResults from allCandidates
  const candidateResults = allCandidates.map((candidate, index) => ({
    ...candidate,
    votes: Math.floor(Math.random() * 500000) + 100000,
    percentage: Math.floor(Math.random() * 25) + 10,
    regions: analyticsData.geographic.map(region => ({
      ...region,
      candidateVotes: Math.floor(Math.random() * 50000) + 10000,
      candidatePercentage: Math.floor(Math.random() * 40) + 10,
    })),
  })).sort((a, b) => b.votes - a.votes);

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/results')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Resultados
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Análisis Electoral Detallado</h1>
          <p className="text-muted-foreground">
            Análisis profundo y visualizaciones de los resultados electorales
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Exportar Análisis
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros de Análisis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Región</label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar región" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las regiones</SelectItem>
                  <SelectItem value="san-jose">San José</SelectItem>
                  <SelectItem value="alajuela">Alajuela</SelectItem>
                  <SelectItem value="cartago">Cartago</SelectItem>
                  <SelectItem value="heredia">Heredia</SelectItem>
                  <SelectItem value="guanacaste">Guanacaste</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Período de Tiempo</label>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todo el día</SelectItem>
                  <SelectItem value="morning">Mañana (8:00-12:00)</SelectItem>
                  <SelectItem value="afternoon">Tarde (12:00-18:00)</SelectItem>
                  <SelectItem value="peak">Horas pico</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="demographics">Demografía</TabsTrigger>
          <TabsTrigger value="geographic">Geografía</TabsTrigger>
          <TabsTrigger value="temporal">Temporal</TabsTrigger>
          <TabsTrigger value="candidates">Candidatos</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{analyticsData.overview.totalVotes.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total de Votos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold">{analyticsData.overview.validVotes.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Votos Válidos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Activity className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold">{analyticsData.overview.participationRate}%</p>
                <p className="text-sm text-muted-foreground">Participación</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <p className="text-2xl font-bold">{analyticsData.overview.nullVotes.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Votos Nulos</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Distribución de Votos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <div className="w-32 h-32 mx-auto border-8 border-primary rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-2xl font-bold">{analyticsData.overview.participationRate}%</p>
                        <p className="text-xs text-muted-foreground">Participación</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Votos Válidos</span>
                      <span className="text-sm font-medium">
                        {((analyticsData.overview.validVotes / analyticsData.overview.totalVotes) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress 
                      value={(analyticsData.overview.validVotes / analyticsData.overview.totalVotes) * 100} 
                      className="h-2" 
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Votos Nulos</span>
                      <span className="text-sm font-medium">
                        {((analyticsData.overview.nullVotes / analyticsData.overview.totalVotes) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress 
                      value={(analyticsData.overview.nullVotes / analyticsData.overview.totalVotes) * 100} 
                      className="h-2" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Top 3 Candidatos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidateResults.slice(0, 3).map((candidate, index) => (
                    <div key={candidate.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                            index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="font-medium">{candidate.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{candidate.percentage}%</p>
                          <p className="text-xs text-muted-foreground">
                            {candidate.votes.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Progress value={candidate.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Demographics Tab */}
        <TabsContent value="demographics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Votación por Grupo Etario
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.demographics.ageGroups.map((group) => (
                    <div key={group.range} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{group.range} años</span>
                        <span className="text-sm text-muted-foreground">
                          {group.percentage}% ({group.votes.toLocaleString()})
                        </span>
                      </div>
                      <Progress value={group.percentage} className="h-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Votación por Género
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.demographics.gender.map((group) => (
                    <div key={group.type} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{group.type}</span>
                        <span className="text-sm text-muted-foreground">
                          {group.percentage}% ({group.votes.toLocaleString()})
                        </span>
                      </div>
                      <Progress value={group.percentage} className="h-3" />
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    La participación femenina supera a la masculina por {
                      (analyticsData.demographics.gender[0].percentage - 
                       analyticsData.demographics.gender[1].percentage).toFixed(1)
                    } puntos porcentuales.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Geographic Tab */}
        <TabsContent value="geographic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Resultados por Provincia
              </CardTitle>
              <CardDescription>
                Participación y candidato ganador por región
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.geographic.map((province) => (
                  <div key={province.province} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-lg">{province.province}</h4>
                        <p className="text-sm text-muted-foreground">
                          {province.votes.toLocaleString()} votos emitidos
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{province.participation}% participación</Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          Ganador: <span className="font-medium">{province.winner}</span>
                        </p>
                      </div>
                    </div>
                    <Progress value={province.participation} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Temporal Tab */}
        <TabsContent value="temporal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Flujo de Votación por Hora
              </CardTitle>
              <CardDescription>
                Distribución temporal de la votación durante el día
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-11 gap-2">
                  {analyticsData.temporal.map((data, index) => (
                    <div key={data.hour} className="text-center">
                      <div className="h-32 bg-muted rounded flex items-end justify-center p-1">
                        <div 
                          className="bg-primary rounded w-full transition-all duration-300"
                          style={{ 
                            height: `${(data.votes / Math.max(...analyticsData.temporal.map(d => d.votes))) * 100}%`,
                            minHeight: '4px'
                          }}
                        />
                      </div>
                      <p className="text-xs mt-1 text-muted-foreground">{data.hour}</p>
                      <p className="text-xs font-medium">{(data.votes / 1000).toFixed(0)}k</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-lg font-bold text-blue-600">10:00-11:00</p>
                    <p className="text-sm text-blue-800">Hora pico matutina</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-lg font-bold text-green-600">15:00-16:00</p>
                    <p className="text-sm text-green-800">Hora pico máxima</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <p className="text-lg font-bold text-orange-600">12:00-13:00</p>
                    <p className="text-sm text-orange-800">Valle de almuerzo</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Candidates Tab */}
        <TabsContent value="candidates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Análisis Detallado por Candidato
              </CardTitle>
              <CardDescription>
                Rendimiento regional y demográfico de cada candidato
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {candidateResults.map((candidate, index) => (
                  <div key={candidate.id} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{candidate.name}</h4>
                          <p className="text-sm text-muted-foreground">{candidate.party}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{candidate.percentage}%</p>
                        <p className="text-sm text-muted-foreground">
                          {candidate.votes.toLocaleString()} votos
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                      {candidate.regions.slice(0, 5).map((region) => (
                        <div key={region.province} className="text-center p-2 bg-muted rounded">
                          <p className="text-xs font-medium">{region.province}</p>
                          <p className="text-lg font-bold">{region.candidatePercentage}%</p>
                          <p className="text-xs text-muted-foreground">
                            {region.candidateVotes.toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsAnalyticsPage;