
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CheckCircle, Vote } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const VotingInterface = ({ user, onVoteComplete, hasVoted }) => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const { toast } = useToast();

  // Mock candidates data
  const candidates = [
    {
      id: 1,
      name: "María González",
      party: "Partido Democrático",
      color: "blue"
    },
    {
      id: 2,
      name: "Carlos Rodríguez", 
      party: "Alianza Nacional",
      color: "red"
    },
    {
      id: 3,
      name: "Ana Martínez",
      party: "Movimiento Verde", 
      color: "green"
    },
    {
      id: 4,
      name: "Roberto Silva",
      party: "Frente Independiente",
      color: "purple"
    }
  ];

  const handleCandidateSelect = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleVoteClick = () => {
    if (!selectedCandidate) {
      toast({
        title: "Selección requerida",
        description: "Por favor selecciona un candidato antes de votar",
        variant: "destructive"
      });
      return;
    }
    setShowConfirmDialog(true);
  };

  const confirmVote = async () => {
    setIsVoting(true);
    
    // Simulate API call
    setTimeout(() => {
      setShowConfirmDialog(false);
      setIsVoting(false);
      
      toast({
        title: "¡Voto registrado exitosamente!",
        description: `Tu voto por ${selectedCandidate.name} ha sido registrado de forma segura y anónima`,
      });
      
      onVoteComplete();
    }, 2000);
  };

  const getPartyColor = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-800 border-blue-200",
      red: "bg-red-100 text-red-800 border-red-200",
      green: "bg-green-100 text-green-800 border-green-200", 
      purple: "bg-purple-100 text-purple-800 border-purple-200"
    };
    return colors[color] || colors.blue;
  };

  const getBorderColor = (color) => {
    const colors = {
      blue: "border-blue-500",
      red: "border-red-500",
      green: "border-green-500",
      purple: "border-purple-500"
    };
    return colors[color] || colors.blue;
  };

  if (hasVoted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center py-12 border-green-200 bg-green-50">
          <CardContent className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-900">¡Voto Registrado!</h3>
            <p className="text-green-700">
              Tu voto ha sido registrado exitosamente. Gracias por participar en el proceso democrático.
            </p>
            <p className="text-sm text-green-600">
              Tu voto es anónimo y seguro. No podrás modificarlo una vez registrado.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Vote className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">Instrucciones para votar</h3>
              <ul className="text-sm text-blue-800 mt-2 space-y-1">
                <li>• Selecciona exactamente un candidato haciendo clic en su tarjeta</li>
                <li>• Revisa tu selección cuidadosamente</li>
                <li>• Confirma tu voto en el diálogo de confirmación</li>
                <li>• Una vez confirmado, tu voto no podrá ser modificado</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidates Selection */}
      <div className="grid gap-4 md:grid-cols-2">
        {candidates.map((candidate) => (
          <Card 
            key={candidate.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedCandidate?.id === candidate.id 
                ? `ring-2 ring-offset-2 ${getBorderColor(candidate.color)} bg-gray-50` 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => handleCandidateSelect(candidate)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg">{candidate.name}</CardTitle>
                  <Badge className={getPartyColor(candidate.color)}>
                    {candidate.party}
                  </Badge>
                </div>
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 ${
                    selectedCandidate?.id === candidate.id 
                      ? `${getBorderColor(candidate.color)} bg-${candidate.color}-500`
                      : 'border-gray-300'
                  } flex items-center justify-center`}>
                    {selectedCandidate?.id === candidate.id && (
                      <CheckCircle className="h-4 w-4 text-white" />
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Vote Button */}
      <div className="text-center pt-6">
        <Button 
          onClick={handleVoteClick}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
          disabled={!selectedCandidate}
        >
          <Vote className="h-5 w-5 mr-2" />
          Emitir Voto
        </Button>
        {selectedCandidate && (
          <p className="text-sm text-gray-600 mt-2">
            Candidato seleccionado: <strong>{selectedCandidate.name}</strong>
          </p>
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Voto</DialogTitle>
            <DialogDescription>
              Estás a punto de votar por el siguiente candidato. Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          
          {selectedCandidate && (
            <div className="py-4">
              <Card className="bg-gray-50">
                <CardContent className="pt-4">
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold">{selectedCandidate.name}</h3>
                    <Badge className={getPartyColor(selectedCandidate.color)}>
                      {selectedCandidate.party}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowConfirmDialog(false)}
              disabled={isVoting}
            >
              Cancelar
            </Button>
            <Button 
              onClick={confirmVote}
              className="bg-green-600 hover:bg-green-700"
              disabled={isVoting}
            >
              {isVoting ? "Registrando voto..." : "Confirmar Voto"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VotingInterface;
