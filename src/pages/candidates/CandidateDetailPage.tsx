import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useCandidates } from '@/hooks/useCandidates';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Phone, 
  Mail,
  ExternalLink,
  Edit,
  Trash2,
  Award,
  FileText
} from 'lucide-react';

const CandidateDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { candidates, loading, error } = useCandidates();

  const candidate = React.useMemo(() => {
    return candidates.find(c => c.id === id);
  }, [candidates, id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !candidate) {
    return (
      <div className="container mx-auto py-8">
        <Card className="border-destructive">
          <CardContent className="p-6 text-center">
            <p className="text-destructive mb-4">
              {error || 'Candidato no encontrado'}
            </p>
            <Button onClick={() => navigate('/candidates')} variant="outline">
              Volver a la lista
            </Button>
          </CardContent>
        </Card>
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
          onClick={() => navigate('/candidates')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Detalles del Candidato</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/candidates/${id}/edit`)}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Editar
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Eliminar
          </Button>
        </div>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="w-32 h-32">
              <AvatarImage src={candidate.avatar} alt={candidate.name} />
              <AvatarFallback className="text-2xl">{candidate.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h2 className="text-3xl font-bold">{candidate.name}</h2>
                <p className="text-xl text-muted-foreground">{candidate.position}</p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <Badge variant="secondary" className="text-sm">
                  {candidate.party}
                </Badge>
                <Badge variant="outline" className="text-sm">
                  ID: {candidate.id}
                </Badge>
              </div>
              <p className="text-muted-foreground max-w-2xl">
                {candidate.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Información</TabsTrigger>
          <TabsTrigger value="experience">Experiencia</TabsTrigger>
          <TabsTrigger value="proposals">Propuestas</TabsTrigger>
          <TabsTrigger value="contact">Contacto</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Información Personal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Fecha de Nacimiento</p>
                    <p className="text-sm text-muted-foreground">15 de marzo, 1975</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Lugar de Origen</p>
                    <p className="text-sm text-muted-foreground">San José, Costa Rica</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Educación</p>
                    <p className="text-sm text-muted-foreground">Licenciatura en Administración Pública</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Estadísticas de Campaña
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-primary">1,247</p>
                    <p className="text-sm text-muted-foreground">Votos Recibidos</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-primary">23.4%</p>
                    <p className="text-sm text-muted-foreground">Porcentaje</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-primary">45</p>
                    <p className="text-sm text-muted-foreground">Eventos</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-primary">8.7k</p>
                    <p className="text-sm text-muted-foreground">Seguidores</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="experience" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Experiencia Profesional
              </CardTitle>
              <CardDescription>
                Historial profesional y político del candidato
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold">Alcalde Municipal</h4>
                    <Badge variant="secondary">2018-2022</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Dirigió la administración municipal con enfoque en desarrollo sostenible
                    y participación ciudadana.
                  </p>
                </div>
                <Separator />
                <div className="border-l-4 border-muted pl-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold">Diputado Provincial</h4>
                    <Badge variant="outline">2014-2018</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Representó los intereses de la provincia en la Asamblea Legislativa,
                    enfocándose en educación y salud pública.
                  </p>
                </div>
                <Separator />
                <div className="border-l-4 border-muted pl-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold">Director Regional de Educación</h4>
                    <Badge variant="outline">2010-2014</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Supervisó la implementación de programas educativos innovadores
                    en 45 instituciones de la región.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="proposals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Plan de Gobierno
              </CardTitle>
              <CardDescription>
                Principales propuestas y compromisos de campaña
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="p-4 border rounded-lg space-y-2">
                  <h4 className="font-semibold text-primary">1. Educación de Calidad</h4>
                  <p className="text-sm text-muted-foreground">
                    Modernización del sistema educativo con tecnología avanzada
                    y capacitación docente continua.
                  </p>
                </div>
                <div className="p-4 border rounded-lg space-y-2">
                  <h4 className="font-semibold text-primary">2. Salud Accesible</h4>
                  <p className="text-sm text-muted-foreground">
                    Fortalecimiento del sistema de salud pública con nuevos centros
                    médicos y equipamiento moderno.
                  </p>
                </div>
                <div className="p-4 border rounded-lg space-y-2">
                  <h4 className="font-semibold text-primary">3. Desarrollo Económico</h4>
                  <p className="text-sm text-muted-foreground">
                    Promoción de emprendimientos locales y atracción de inversión
                    extranjera responsable.
                  </p>
                </div>
                <div className="p-4 border rounded-lg space-y-2">
                  <h4 className="font-semibold text-primary">4. Medio Ambiente</h4>
                  <p className="text-sm text-muted-foreground">
                    Implementación de políticas de sostenibilidad y protección
                    de recursos naturales.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Información de Contacto
              </CardTitle>
              <CardDescription>
                Datos de contacto oficiales del candidato
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">contacto@candidato.com</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Teléfono</p>
                    <p className="text-sm text-muted-foreground">+506 2234-5678</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Oficina de Campaña</p>
                    <p className="text-sm text-muted-foreground">
                      Av. Central 123, San José, Costa Rica
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CandidateDetailPage;
