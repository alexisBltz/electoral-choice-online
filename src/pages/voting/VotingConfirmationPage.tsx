import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useCandidates } from '@/hooks/useCandidates';
import { useVotingStore } from '@/store/votingStore';
import { 
  CheckCircle2, 
  Shield, 
  Clock, 
  Download,
  Share2,
  Home,
  BarChart3,
  Copy,
  Check
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const VotingConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const { candidates } = useCandidates();
  const { hasVoted, selectedCandidateId, voteTimestamp } = useVotingStore();
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  // Mock transaction ID for vote verification
  const transactionId = 'TX-' + Date.now().toString(36).toUpperCase();

  const selectedCandidate = React.useMemo(() => {
    return candidates.find(c => c.id === selectedCandidateId);
  }, [candidates, selectedCandidateId]);

  // Redirect if user hasn't voted
  React.useEffect(() => {
    if (!hasVoted || !selectedCandidateId) {
      navigate('/voting');
    }
  }, [hasVoted, selectedCandidateId, navigate]);

  const copyTransactionId = async () => {
    try {
      await navigator.clipboard.writeText(transactionId);
      setCopied(true);
      toast({
        title: 'ID copiado',
        description: 'El ID de transacción ha sido copiado al portapapeles.',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo copiar el ID de transacción.',
        variant: 'destructive',
      });
    }
  };

  const shareVoteReceipt = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'He votado en las Elecciones 2024',
          text: `He participado en las Elecciones Presidenciales 2024. ¡Tu voto también cuenta!`,
          url: window.location.origin + '/voting',
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      toast({
        title: 'Compartir',
        description: 'Función de compartir no disponible en este navegador.',
      });
    }
  };

  if (!selectedCandidate) {
    return (
      <div className="container mx-auto py-8">
        <Card className="border-destructive">
          <CardContent className="p-6 text-center">
            <p className="text-destructive mb-4">
              No se encontró información del voto registrado.
            </p>
            <Button onClick={() => navigate('/voting')} variant="outline">
              Volver al portal de votación
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6 max-w-3xl">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-green-900">
            ¡Voto Registrado Exitosamente!
          </h1>
          <p className="text-lg text-muted-foreground">
            Tu participación ha sido confirmada y registrada de forma segura
          </p>
        </div>
      </div>

      {/* Vote Confirmation */}
      <Card className="border-green-500">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center gap-2 text-green-900">
            <Shield className="h-5 w-5" />
            Comprobante de Votación
          </CardTitle>
          <CardDescription className="text-green-700">
            Detalles de tu voto registrado el {new Date(voteTimestamp || Date.now()).toLocaleString('es-ES')}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Voted Candidate */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Tu Voto:</h3>
            <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/50">
              <Avatar className="w-16 h-16">
                <AvatarImage src={selectedCandidate.avatar} alt={selectedCandidate.name} />
                <AvatarFallback className="text-lg font-semibold">
                  {selectedCandidate.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="text-xl font-semibold">{selectedCandidate.name}</h4>
                <p className="text-muted-foreground">{selectedCandidate.position}</p>
                <Badge variant="secondary" className="mt-2">
                  {selectedCandidate.party}
                </Badge>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <Separator />

          {/* Transaction Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Detalles de la Transacción:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">ID de Transacción</p>
                <div className="flex items-center gap-2">
                  <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                    {transactionId}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={copyTransactionId}
                    className="h-8 w-8 p-0"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Fecha y Hora</p>
                <p className="text-sm">
                  {new Date(voteTimestamp || Date.now()).toLocaleString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Estado</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-700 font-medium">Confirmado</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Elección</p>
                <p className="text-sm">Presidenciales 2024</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Information */}
      <Alert className="border-blue-500 bg-blue-50">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Información de Seguridad:</strong>
          <br />
          • Tu voto ha sido encriptado y registrado de forma anónima
          <br />
          • El ID de transacción permite verificar que tu voto fue contabilizado
          <br />
          • No se almacena ninguna información que vincule tu identidad con tu elección
        </AlertDescription>
      </Alert>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            ¿Qué sigue?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <div>
                <p className="font-medium">Cierre de Votación</p>
                <p className="text-sm text-muted-foreground">
                  La votación se cierra hoy a las 6:00 PM
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <div>
                <p className="font-medium">Conteo de Votos</p>
                <p className="text-sm text-muted-foreground">
                  Los resultados preliminares estarán disponibles después del cierre
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <div>
                <p className="font-medium">Resultados Oficiales</p>
                <p className="text-sm text-muted-foreground">
                  Los resultados finales se publicarán en las próximas 24 horas
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          Inicio
        </Button>
        
        <Button
          variant="outline"
          onClick={() => navigate('/results')}
          className="flex items-center gap-2"
        >
          <BarChart3 className="h-4 w-4" />
          Ver Resultados
        </Button>
        
        <Button
          variant="outline"
          onClick={shareVoteReceipt}
          className="flex items-center gap-2"
        >
          <Share2 className="h-4 w-4" />
          Compartir
        </Button>
        
        <Button
          variant="outline"
          onClick={() => window.print()}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Imprimir
        </Button>
      </div>

      {/* Footer Message */}
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold mb-2">¡Gracias por participar!</h3>
        <p className="text-muted-foreground">
          Tu voto es fundamental para la democracia. Mantente informado sobre los resultados
          y el desarrollo del proceso electoral.
        </p>
      </div>
    </div>
  );
};

export default VotingConfirmationPage;
