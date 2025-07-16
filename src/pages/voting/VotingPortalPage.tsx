import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';
import { useVotingStore } from '@/store/votingStore';
import { useElectionStore } from '@/store/electionStore';
import { 
  Vote, 
  Clock, 
  Users, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  MapPin,
  Info,
  ArrowLeft,
  LayoutDashboard
} from 'lucide-react';

const VotingPortalPage: React.FC = () => {
  const navigate = useNavigate();
  const { hasVoted, selectedCandidateId } = useVotingStore();
  // Puedes seguir usando tu store si la ocupas para otras cosas,
  // pero la lógica de si está activa la elección se calcula por fecha aquí.
  const { 
    // isElectionActive, // No lo usaremos
    electionInfo, 
    totalVotes, 
    participationRate 
  } = useElectionStore();

  // Nueva fecha y datos simulados para 2025
  const electionData = {
    title: 'Elecciones Generales 2025',
    description: 'Proceso electoral nacional para elegir presidente y vicepresidente',
    startDate: '2025-07-16T08:00:00',
    endDate: '2025-07-16T23:59:59',
    location: 'Nacional',
    totalRegistered: 4321000,
    currentParticipation: 2998765,
    status: 'active' as const,
  };

  // Calcula si la votación está activa en base a las fechas
  const now = new Date();
  const start = new Date(electionData.startDate);
  const end = new Date(electionData.endDate);
  const isActive = now >= start && now <= end;

  const getTimeRemaining = () => {
    const diff = end.getTime() - now.getTime();
    if (diff <= 0) return 'Votación cerrada';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m restantes`;
  };

  const participationPercentage = Math.round(
    (electionData.currentParticipation / electionData.totalRegistered) * 100
  );

  return (
    <div className="container mx-auto py-8 space-y-6 max-w-4xl">
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
        <div className="flex-1 text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Portal de Votación</h1>
          <p className="text-xl text-muted-foreground">
            {electionData.title}
          </p>
        </div>
      </div>

      {/* Election Status */}
      <Card className={`border-2 ${isActive ? 'border-green-500' : 'border-red-500'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {isActive ? (
                <>
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  Votación Activa
                </>
              ) : (
                <>
                  <AlertCircle className="h-6 w-6 text-red-500" />
                  Votación Cerrada
                </>
              )}
            </CardTitle>
            <Badge 
              variant={isActive ? "default" : "destructive"}
              className="text-sm"
            >
              {getTimeRemaining()}
            </Badge>
          </div>
          <CardDescription>
            {electionData.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Fecha</p>
                <p className="text-sm text-muted-foreground">16 de Julio, 2025</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Horario</p>
                <p className="text-sm text-muted-foreground">8:00 AM - 11:59 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Ámbito</p>
                <p className="text-sm text-muted-foreground">{electionData.location}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voting Status */}
      {hasVoted ? (
        <Alert className="border-green-500 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>¡Tu voto ha sido registrado exitosamente!</strong>
            <br />
            Gracias por participar en este proceso democrático. Tu voto es confidencial y ha sido contabilizado.
          </AlertDescription>
        </Alert>
      ) : isActive ? (
        <Alert className="border-blue-500 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>¡La votación está abierta! Aún puedes emitir tu voto.</strong>
            <br />
            El proceso de votación está activo. Participa antes de que termine el tiempo. Revisa todas tus opciones antes de confirmar tu voto.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="border-red-500 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>La votación ha finalizado.</strong>
            <br />
            El período de votación ha terminado. Los resultados estarán disponibles próximamente.
          </AlertDescription>
        </Alert>
      )}

      {/* Participation Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Participación Ciudadana
          </CardTitle>
          <CardDescription>
            Estadísticas de participación en tiempo real
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Participación actual</span>
              <span>{participationPercentage}%</span>
            </div>
            <Progress value={participationPercentage} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{electionData.currentParticipation.toLocaleString()} votantes</span>
              <span>de {electionData.totalRegistered.toLocaleString()} habilitados</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-primary">
                {electionData.currentParticipation.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Votos emitidos</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-primary">
                {(electionData.totalRegistered - electionData.currentParticipation).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Pendientes</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-primary">{participationPercentage}%</p>
              <p className="text-sm text-muted-foreground">Participación</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate('/voting/ballot')}>
          <CardContent className="p-6 text-center space-y-4">
            <Vote className="h-12 w-12 mx-auto text-primary" />
            <div>
              <h3 className="font-semibold text-lg">Emitir Voto</h3>
              <p className="text-sm text-muted-foreground">
                {hasVoted ? 'Ver mi voto registrado' : 'Votar por tu candidato preferido'}
              </p>
            </div>
            <Button 
              className="w-full" 
              disabled={!isActive && !hasVoted}
              variant={hasVoted ? "outline" : "default"}
            >
              {hasVoted ? 'Ver Mi Voto' : 'Votar Ahora'}
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate('/candidates')}>
          <CardContent className="p-6 text-center space-y-4">
            <Users className="h-12 w-12 mx-auto text-primary" />
            <div>
              <h3 className="font-semibold text-lg">Ver Candidatos</h3>
              <p className="text-sm text-muted-foreground">
                Conoce las propuestas de todos los candidatos
              </p>
            </div>
            <Button variant="outline" className="w-full">
              Ver Candidatos
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate('/voting/guide')}>
          <CardContent className="p-6 text-center space-y-4">
            <Info className="h-12 w-12 mx-auto text-primary" />
            <div>
              <h3 className="font-semibold text-lg">Guía de Votación</h3>
              <p className="text-sm text-muted-foreground">
                Aprende cómo funciona el proceso de votación
              </p>
            </div>
            <Button variant="outline" className="w-full">
              Ver Guía
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Important Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Información Importante
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-1.5"></div>
              <p>Tu voto es <strong>secreto y confidencial</strong>. Nadie puede ver por quién votas.</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-1.5"></div>
              <p>Solo puedes votar <strong>una vez</strong> por candidato en cada elección.</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-1.5"></div>
              <p>Una vez confirmado tu voto, <strong>no podrás cambiarlo</strong>.</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-1.5"></div>
              <p>Los resultados preliminares estarán disponibles después del cierre de votación.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VotingPortalPage;