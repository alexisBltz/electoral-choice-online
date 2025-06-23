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

const VotingBallotPage: React.FC = () => {
  const navigate = useNavigate();
  const { candidates, loading } = useCandidates();
  const { hasVoted, selectedCandidateId, castVote } = useVotingStore();
  const { toast } = useToast();

  const [selectedCandidate, setSelectedCandidate] = React.useState<string>('');
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // If user already voted, redirect to confirmation page
  React.useEffect(() => {
    if (hasVoted && selectedCandidateId) {
      navigate('/voting/confirmation');
    }
  }, [hasVoted, selectedCandidateId, navigate]);

  const selectedCandidateInfo = React.useMemo(() => {
    return candidates.find(c => c.id === selectedCandidate);
  }, [candidates, selectedCandidate]);

  const handleVoteSubmit = async () => {
    if (!selectedCandidate) return;

    setIsSubmitting(true);
    try {
      // Simulate vote submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update voting store
      castVote(selectedCandidate);
      
      toast({
        title: '¡Voto registrado exitosamente!',
        description: 'Tu voto ha sido contabilizado de forma segura.',
      });

      // Navigate to confirmation page
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

      {/* Voting Instructions */}
      <Alert className="border-blue-500 bg-blue-50">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Instrucciones:</strong> Selecciona un candidato haciendo clic en el círculo correspondiente. 
          Puedes cambiar tu selección antes de confirmar el voto. Una vez confirmado, no podrás modificarlo.
        </AlertDescription>
      </Alert>

      {/* Security Notice */}
      <Alert className="border-green-500 bg-green-50">
        <Shield className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>Votación Segura:</strong> Tu voto es completamente anónimo y encriptado. 
          El sistema garantiza la confidencialidad y integridad del proceso electoral.
        </AlertDescription>
      </Alert>

      {/* Ballot */}
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
              {candidates.map((candidate) => (
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
                    <Avatar className="w-16 h-16">
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
                          <Badge variant="secondary">{candidate.party}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground font-normal">
                          {candidate.position}
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

      {/* Selected Candidate Summary */}
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
              <Avatar className="w-12 h-12">
                <AvatarImage src={selectedCandidateInfo.avatar} alt={selectedCandidateInfo.name} />
                <AvatarFallback>
                  {selectedCandidateInfo.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-semibold text-lg">{selectedCandidateInfo.name}</h4>
                <p className="text-muted-foreground">{selectedCandidateInfo.party}</p>
              </div>
              <Badge variant="default">Seleccionado</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
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

      {/* Vote Confirmation Dialog */}
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
                  <Avatar>
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
