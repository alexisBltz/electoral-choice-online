import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCandidates } from '@/hooks/useCandidates';
import { useVotingStore } from '@/store/votingStore';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Vote, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  Shield,
  Clock
} from 'lucide-react';

// Candidatos ficticios con estructura flexible y datos variados
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

const VotingBallotPage: React.FC = () => {
  const navigate = useNavigate();
  const { candidates, loading } = useCandidates();
  const { hasVoted, selectedCandidateId, castVote } = useVotingStore();
  const { toast } = useToast();

  const [selectedCandidate, setSelectedCandidate] = React.useState<string>('');
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Si no hay candidatos reales, usar mocks
  const ballotCandidates = React.useMemo(() => (
    candidates.length > 0 ? candidates : MOCK_CANDIDATES
  ), [candidates]);

  // Redirección si ya votó
  React.useEffect(() => {
    if (hasVoted && selectedCandidateId) {
      navigate('/voting/confirmation');
    }
  }, [hasVoted, selectedCandidateId, navigate]);

  const selectedCandidateInfo = React.useMemo(() => {
    return ballotCandidates.find(c => c.id === selectedCandidate);
  }, [ballotCandidates, selectedCandidate]);

  const handleVoteSubmit = async () => {
    if (!selectedCandidate) return;

    setIsSubmitting(true);
    try {
      // Simular envío
      await new Promise(resolve => setTimeout(resolve, 2000));
      castVote(selectedCandidate);
      toast({
        title: '¡Voto registrado exitosamente!',
        description: 'Tu voto ha sido contabilizado de forma segura.',
      });
      navigate('/voting/confirmation');
    } catch (error) {
      toast({
        title: 'Error al registrar voto',
        description: 'Ocurrió un error. Por favor, intenta nuevamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
      setShowConfirmDialog(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/voting')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al Portal
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Papeleta de Votación</h1>
          <p className="text-muted-foreground">
            Selecciona tu candidato preferido para presidente
          </p>
        </div>
      </div>

      {/* Instrucciones */}
      <Alert className="border-blue-500 bg-blue-50">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Instrucciones:</strong> Selecciona un candidato haciendo clic en el círculo correspondiente. 
          Puedes cambiar tu selección antes de confirmar el voto. Una vez confirmado, no podrás modificarlo.
        </AlertDescription>
      </Alert>

      {/* Seguridad */}
      <Alert className="border-green-500 bg-green-50">
        <Shield className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>Votación Segura:</strong> Tu voto es completamente anónimo y encriptado. 
          El sistema garantiza la confidencialidad y integridad del proceso electoral.
        </AlertDescription>
      </Alert>

      {/* Papeleta */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Vote className="h-6 w-6" />
            Elecciones Presidenciales 2024
          </CardTitle>
          <CardDescription>
            Selecciona UN candidato para el cargo de Presidente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedCandidate} onValueChange={setSelectedCandidate}>
            <div className="space-y-4">
              {ballotCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
                    selectedCandidate === candidate.id
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem
                      value={candidate.id}
                      id={candidate.id}
                      className="w-5 h-5"
                    />
                    <Avatar className="w-16 h-16 border-2" style={{ borderColor: candidate.color }}>
                      <AvatarImage src={candidate.avatar} alt={candidate.name} />
                      <AvatarFallback className="text-lg font-semibold">
                        {candidate.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Label
                        htmlFor={candidate.id}
                        className="cursor-pointer block space-y-2"
                      >
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">{candidate.name}</h3>
                          <Badge style={{ backgroundColor: candidate.color, color: "#fff" }}>{candidate.party}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground font-normal">
                          {candidate.position}
                          {candidate.slogan && <> — <span className="italic text-xs text-gray-500">{candidate.slogan}</span></>}
                        </p>
                        <p className="text-sm text-muted-foreground font-normal line-clamp-2">
                          {candidate.description}
                        </p>
                      </Label>
                    </div>
                    {selectedCandidate === candidate.id && (
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Resumen de Selección */}
      {selectedCandidateInfo && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Tu Selección
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12 border-2" style={{ borderColor: selectedCandidateInfo.color }}>
                <AvatarImage src={selectedCandidateInfo.avatar} alt={selectedCandidateInfo.name} />
                <AvatarFallback>
                  {selectedCandidateInfo.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-semibold text-lg">{selectedCandidateInfo.name}</h4>
                <p className="text-muted-foreground">{selectedCandidateInfo.party} — {selectedCandidateInfo.position}</p>
                {selectedCandidateInfo.slogan && (
                  <span className="italic text-xs text-gray-500">{selectedCandidateInfo.slogan}</span>
                )}
              </div>
              <Badge variant="default">Seleccionado</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Botones de acción */}
      <div className="flex justify-between items-center pt-6">
        <Button
          variant="outline"
          onClick={() => navigate('/candidates')}
          className="flex items-center gap-2"
        >
          <Info className="h-4 w-4" />
          Ver Propuestas
        </Button>

        <Button
          onClick={() => setShowConfirmDialog(true)}
          disabled={!selectedCandidate}
          className="flex items-center gap-2 px-8"
          size="lg"
        >
          <Vote className="h-4 w-4" />
          Confirmar Voto
        </Button>
      </div>

      {/* Confirmación */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Confirmar Voto
            </DialogTitle>
            <DialogDescription>
              Estás a punto de confirmar tu voto. Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>

          {selectedCandidateInfo && (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Avatar className="border-2" style={{ borderColor: selectedCandidateInfo.color }}>
                    <AvatarImage src={selectedCandidateInfo.avatar} alt={selectedCandidateInfo.name} />
                    <AvatarFallback>
                      {selectedCandidateInfo.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{selectedCandidateInfo.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedCandidateInfo.party} - {selectedCandidateInfo.position}
                    </p>
                    {selectedCandidateInfo.slogan && (
                      <span className="italic text-xs text-gray-500">{selectedCandidateInfo.slogan}</span>
                    )}
                  </div>
                </div>
              </div>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Una vez confirmado, tu voto será registrado de forma segura y anónima. 
                  No podrás modificar tu elección después de confirmar.
                </AlertDescription>
              </Alert>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleVoteSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Clock className="h-4 w-4 animate-spin" />
                  Registrando...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Confirmar Voto
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VotingBallotPage;