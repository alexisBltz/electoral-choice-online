import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCandidates } from '@/hooks/useCandidates';
import { useElectionStore } from '@/store/electionStore';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock,
  Award,
  RefreshCw,
  Download,
  Share2,
  Eye,
  Calendar,
  Activity,
  ArrowLeft
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

const ElectionResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { candidates } = useCandidates();
  const { totalVotes, participationRate } = useElectionStore();
  const [lastUpdate, setLastUpdate] = React.useState(new Date());
  const [autoRefresh, setAutoRefresh] = React.useState(true);

  // Usa datos mock si no hay candidatos reales
  const allCandidates = candidates.length > 0 ? candidates : MOCK_CANDIDATES;

  // Mock results data
  const resultsData = React.useMemo(() => ({
    totalVotes: 1847520,
    totalRegistered: 4250000,
    participationRate: 43.5,
    lastUpdate: new Date(),
    status: 'preliminary' as const,
    results: allCandidates.map((candidate, index) => ({
      ...candidate,
      votes: Math.floor(Math.random() * 500000) + 100000,
      percentage: Math.floor(Math.random() * 25) + 10,
      trend: Math.random() > 0.5 ? 'up' : 'down',
      trendValue: Math.floor(Math.random() * 5) + 1,
    })).sort((a, b) => b.votes - a.votes),
  }), [allCandidates, lastUpdate]);

  // Auto-refresh every 30 seconds
  React.useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const winner = resultsData.results[0] || MOCK_CANDIDATES[0]; // fallback
  const totalValidVotes = resultsData.results.reduce((sum, r) => sum + r.votes, 0);

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Dashboard
        </Button>
        <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Resultados Electorales</h1>
            <p className="text-muted-foreground">
              Elecciones Presidenciales 2024 - Resultados en tiempo real
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              {autoRefresh ? 'Auto-actualización activa' : 'Actualizar manualmente'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/results/analytics')}
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Analytics Detallado
            </Button>
          </div>
        </div>
      </div>

      {/* Status and Last Update */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Alert className="border-blue-500 bg-blue-50">
          <Activity className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Estado:</strong> Resultados preliminares en tiempo real
            <br />
            <strong>Última actualización:</strong> {lastUpdate.toLocaleTimeString('es-ES')}
          </AlertDescription>
        </Alert>
        
        <Alert className="border-green-500 bg-green-50">
          <Users className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>Participación:</strong> {resultsData.participationRate}% 
            ({resultsData.totalVotes.toLocaleString()} de {resultsData.totalRegistered.toLocaleString()} votantes)
          </AlertDescription>
        </Alert>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Votos</p>
                <p className="text-3xl font-bold">{resultsData.totalVotes.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500">+12.3%</span>
              <span className="text-muted-foreground ml-1">vs. 2020</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Participación</p>
                <p className="text-3xl font-bold">{resultsData.participationRate}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="mt-2">
              <Progress value={resultsData.participationRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Candidatos</p>
                <p className="text-3xl font-bold">{allCandidates.length}</p>
              </div>
              <Award className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              En competencia
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Líder</p>
                <p className="text-lg font-bold truncate">{winner.name}</p>
              </div>
              <Avatar className="h-12 w-12">
                <AvatarImage src={winner.avatar} alt={winner.name} />
                <AvatarFallback>{winner.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="mt-2 text-sm">
              <Badge variant="default">{winner.percentage}%</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Tabs */}
      <Tabs defaultValue="results" className="space-y-6">
        <TabsList className="grid w-full lg:w-auto lg:inline-grid grid-cols-3">
          <TabsTrigger value="results">Resultados</TabsTrigger>
          <TabsTrigger value="participation">Participación</TabsTrigger>
          <TabsTrigger value="trends">Tendencias</TabsTrigger>
        </TabsList>

        {/* Results Tab */}
        <TabsContent value="results" className="space-y-6">
          {/* Winner Announcement */}
          <Card className="border-yellow-500 bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-6 w-6 text-yellow-600" />
                Candidato Líder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={winner.avatar} alt={winner.name} />
                  <AvatarFallback className="text-2xl">{winner.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold">{winner.name}</h3>
                  <p className="text-muted-foreground text-lg">{winner.party}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="default" className="text-lg px-3 py-1">
                      {winner.percentage}%
                    </Badge>
                    <span className="text-lg font-semibold">
                      {winner.votes.toLocaleString()} votos
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <Award className="h-16 w-16 text-yellow-500 mx-auto" />
                  <p className="text-sm font-medium text-yellow-700 mt-2">Primer Lugar</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Results */}
          <Card>
            <CardHeader>
              <CardTitle>Resultados Detallados</CardTitle>
              <CardDescription>
                Votación por candidato ordenada por número de votos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {resultsData.results.map((candidate, index) => (
                  <div key={candidate.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={candidate.avatar} alt={candidate.name} />
                          <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-lg">{candidate.name}</h4>
                          <p className="text-muted-foreground">{candidate.party}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="text-2xl font-bold">{candidate.percentage}%</p>
                            <p className="text-sm text-muted-foreground">
                              {candidate.votes.toLocaleString()} votos
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp 
                              className={`h-4 w-4 ${
                                candidate.trend === 'up' ? 'text-green-500' : 'text-red-500'
                              }`} 
                            />
                            <span className={`text-sm ${
                              candidate.trend === 'up' ? 'text-green-500' : 'text-red-500'
                            }`}>
                              {candidate.trendValue}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Porcentaje de votos</span>
                        <span>{candidate.percentage}%</span>
                      </div>
                      <Progress value={candidate.percentage} className="h-3" />
                    </div>
                    {index === 0 && resultsData.results[1] && (
                      <div className="flex items-center gap-2 text-sm text-green-700">
                        <Award className="h-4 w-4" />
                        <span>Ventaja: {candidate.percentage - resultsData.results[1].percentage}% sobre el segundo lugar</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Participation Tab */}
        <TabsContent value="participation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Participación por Regiones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { region: 'San José', participation: 45.2, votes: 652000 },
                    { region: 'Alajuela', participation: 42.8, votes: 485000 },
                    { region: 'Cartago', participation: 44.1, votes: 248000 },
                    { region: 'Heredia', participation: 46.3, votes: 287000 },
                    { region: 'Guanacaste', participation: 41.5, votes: 175000 },
                  ].map((data) => (
                    <div key={data.region} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{data.region}</span>
                        <span className="text-sm text-muted-foreground">
                          {data.participation}% ({data.votes.toLocaleString()} votos)
                        </span>
                      </div>
                      <Progress value={data.participation} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Participación por Hora
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  {[
                    { hour: '8:00 - 10:00', participation: 15.2 },
                    { hour: '10:00 - 12:00', participation: 28.7 },
                    { hour: '12:00 - 14:00', participation: 18.3 },
                    { hour: '14:00 - 16:00', participation: 22.1 },
                    { hour: '16:00 - 18:00', participation: 15.7 },
                  ].map((data) => (
                    <div key={data.hour} className="flex justify-between items-center">
                      <span>{data.hour}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${data.participation}%` }}
                          />
                        </div>
                        <span className="text-muted-foreground w-12 text-right">
                          {data.participation}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Datos de Participación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">
                    {resultsData.totalVotes.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Votos emitidos</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">
                    {(resultsData.totalRegistered - resultsData.totalVotes).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">No votaron</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">{resultsData.participationRate}%</p>
                  <p className="text-sm text-muted-foreground">Participación total</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">12.3%</p>
                  <p className="text-sm text-muted-foreground">Incremento vs 2020</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Tendencias de Votación
              </CardTitle>
              <CardDescription>
                Análisis de tendencias durante el día electoral
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {resultsData.results.slice(0, 3).map((candidate) => (
                  <div key={candidate.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={candidate.avatar} alt={candidate.name} />
                          <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{candidate.name}</h4>
                          <p className="text-sm text-muted-foreground">{candidate.party}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={candidate.trend === 'up' ? 'default' : 'secondary'}>
                          {candidate.trend === 'up' ? '↗' : '↘'} {candidate.trendValue}%
                        </Badge>
                        <span className="font-semibold">{candidate.percentage}%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2 text-xs">
                      {Array.from({ length: 5 }, (_, i) => (
                        <div key={i} className="text-center">
                          <div className="h-16 bg-muted rounded flex items-end justify-center p-1">
                            <div 
                              className="bg-primary rounded w-full"
                              style={{ 
                                height: `${Math.random() * 80 + 20}%`,
                                opacity: 0.7 + (i * 0.05)
                              }}
                            />
                          </div>
                          <p className="mt-1 text-muted-foreground">
                            {8 + (i * 2)}:00
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

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-4 pt-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/results/analytics')}
          className="flex items-center gap-2"
        >
          <Eye className="h-4 w-4" />
          Ver Análisis Completo
        </Button>
        <Button 
          variant="outline"
          onClick={() => window.print()}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Descargar Resultados
        </Button>
        <Button 
          variant="outline"
          className="flex items-center gap-2"
        >
          <Share2 className="h-4 w-4" />
          Compartir
        </Button>
      </div>
    </div>
  );
};

export default ElectionResultsPage;