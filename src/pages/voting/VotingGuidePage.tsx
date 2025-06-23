import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { 
  HelpCircle, 
  ArrowLeft, 
  CheckCircle, 
  Shield, 
  Clock,
  Users,
  Vote,
  AlertTriangle,
  Info,
  FileText,
  Smartphone,
  Globe,
  Lock
} from 'lucide-react';

const VotingGuidePage: React.FC = () => {
  const navigate = useNavigate();

  const faqData = [
    {
      question: '¿Cómo puedo votar?',
      answer: 'Puedes votar accediendo al portal de votación, seleccionando tu candidato preferido y confirmando tu elección. El proceso es completamente digital y seguro.'
    },
    {
      question: '¿Puedo cambiar mi voto una vez confirmado?',
      answer: 'No, una vez que confirmes tu voto, este se registra de forma definitiva y no puede ser modificado. Asegúrate de revisar tu selección antes de confirmar.'
    },
    {
      question: '¿Mi voto es secreto?',
      answer: 'Sí, tu voto es completamente secreto y anónimo. El sistema utiliza encriptación avanzada para garantizar que nadie pueda conocer tu elección.'
    },
    {
      question: '¿Qué pasa si tengo problemas técnicos?',
      answer: 'Si experimentas problemas técnicos, contacta al soporte electoral inmediatamente. Hay asistencia disponible durante todo el período de votación.'
    },
    {
      question: '¿Cuándo se conocerán los resultados?',
      answer: 'Los resultados preliminares estarán disponibles después del cierre de la votación. Los resultados oficiales se publicarán dentro de las 24 horas siguientes.'
    }
  ];

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
          <h1 className="text-3xl font-bold tracking-tight">Guía de Votación</h1>
          <p className="text-muted-foreground">
            Todo lo que necesitas saber para participar en las elecciones
          </p>
        </div>
      </div>

      {/* Overview */}
      <Alert className="border-blue-500 bg-blue-50">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Elecciones Presidenciales 2024</strong>
          <br />
          Participa en este proceso democrático fundamental. Tu voto cuenta y es tu derecho y responsabilidad como ciudadano.
        </AlertDescription>
      </Alert>

      {/* Main Content */}
      <Tabs defaultValue="how-to-vote" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="how-to-vote">Cómo Votar</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
          <TabsTrigger value="requirements">Requisitos</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        {/* How to Vote Tab */}
        <TabsContent value="how-to-vote" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Vote className="h-5 w-5" />
                Proceso de Votación Paso a Paso
              </CardTitle>
              <CardDescription>
                Sigue estos pasos para emitir tu voto de forma segura
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-lg">Accede al Portal de Votación</h3>
                    <p className="text-muted-foreground">
                      Ingresa al portal oficial de votación usando tus credenciales de acceso.
                      Asegúrate de estar en el sitio web oficial.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>Sitio seguro verificado</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Step 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-lg">Revisa la Información Electoral</h3>
                    <p className="text-muted-foreground">
                      Antes de votar, puedes revisar la información de todos los candidatos,
                      sus propuestas y planes de gobierno.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/candidates')}
                      className="flex items-center gap-2"
                    >
                      <Users className="h-4 w-4" />
                      Ver Candidatos
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Step 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-lg">Selecciona tu Candidato</h3>
                    <p className="text-muted-foreground">
                      En la papeleta electrónica, selecciona el candidato de tu preferencia
                      haciendo clic en el círculo correspondiente.
                    </p>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        💡 <strong>Consejo:</strong> Puedes cambiar tu selección antes de confirmar el voto.
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Step 4 */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-lg">Confirma tu Voto</h3>
                    <p className="text-muted-foreground">
                      Revisa tu selección cuidadosamente y confirma tu voto. Una vez confirmado,
                      no podrás modificarlo.
                    </p>
                    <Alert className="border-orange-500 bg-orange-50">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <AlertDescription className="text-orange-800">
                        <strong>Importante:</strong> La confirmación del voto es irreversible.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>

                <Separator />

                {/* Step 5 */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    5
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-lg">Recibe tu Comprobante</h3>
                    <p className="text-muted-foreground">
                      Después de votar, recibirás un comprobante digital con el ID de tu transacción
                      para verificar que tu voto fue registrado correctamente.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-green-700">
                      <CheckCircle className="h-4 w-4" />
                      <span>Voto registrado exitosamente</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Encriptación y Anonimato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Voto Secreto</p>
                      <p className="text-sm text-muted-foreground">
                        Tu identidad nunca se vincula con tu elección
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Encriptación Avanzada</p>
                      <p className="text-sm text-muted-foreground">
                        Todos los datos se encriptan con estándares militares
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Blockchain Verificable</p>
                      <p className="text-sm text-muted-foreground">
                        Cada voto se registra en una cadena de bloques inmutable
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Transparencia y Auditabilidad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Código Abierto</p>
                      <p className="text-sm text-muted-foreground">
                        El sistema es auditado por expertos independientes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Verificación de Votos</p>
                      <p className="text-sm text-muted-foreground">
                        Puedes verificar que tu voto fue contabilizado
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Monitoreo en Tiempo Real</p>
                      <p className="text-sm text-muted-foreground">
                        Observadores pueden monitorear el proceso
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert className="border-green-500 bg-green-50">
            <Shield className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Certificación de Seguridad:</strong> Este sistema ha sido certificado 
              por autoridades internacionales en seguridad electoral y cumple con todos 
              los estándares de transparencia y confiabilidad.
            </AlertDescription>
          </Alert>
        </TabsContent>

        {/* Requirements Tab */}
        <TabsContent value="requirements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Requisitos para Votar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <p className="text-sm">Ser ciudadano costarricense</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <p className="text-sm">Tener 18 años o más</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <p className="text-sm">Estar inscrito en el padrón electoral</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <p className="text-sm">Tener cédula de identidad vigente</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <p className="text-sm">No tener inhabilitaciones electorales</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Requisitos Técnicos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <p className="text-sm">Navegador web actualizado</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <p className="text-sm">Conexión estable a internet</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <p className="text-sm">JavaScript habilitado</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <p className="text-sm">Resolución mínima 1024x768</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <p className="text-sm">Cookies habilitadas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Horarios y Fechas Importantes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold">Inicio de Votación</h4>
                  <p className="text-sm text-muted-foreground">15 de Marzo, 2024</p>
                  <p className="text-sm text-muted-foreground">8:00 AM</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold">Cierre de Votación</h4>
                  <p className="text-sm text-muted-foreground">15 de Marzo, 2024</p>
                  <p className="text-sm text-muted-foreground">6:00 PM</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold">Resultados</h4>
                  <p className="text-sm text-muted-foreground">16 de Marzo, 2024</p>
                  <p className="text-sm text-muted-foreground">A partir de 6:00 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Preguntas Frecuentes
              </CardTitle>
              <CardDescription>
                Respuestas a las consultas más comunes sobre el proceso electoral
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold text-lg">{faq.question}</h4>
                    <p className="text-muted-foreground">{faq.answer}</p>
                    {index < faqData.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>¿Necesitas más ayuda?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Si tienes otras preguntas o necesitas asistencia técnica durante el proceso de votación:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Soporte Técnico</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Disponible durante el horario de votación
                  </p>
                  <p className="text-sm">📞 800-VOTE-2024</p>
                  <p className="text-sm">✉️ soporte@elecciones2024.cr</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Chat en Vivo</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Asistencia inmediata en línea
                  </p>
                  <Button size="sm" className="w-full">
                    Iniciar Chat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* CTA */}
      <div className="text-center space-y-4 py-8">
        <h3 className="text-2xl font-bold">¿Listo para votar?</h3>
        <p className="text-muted-foreground">
          Ya tienes toda la información necesaria para participar en las elecciones
        </p>
        <Button 
          size="lg" 
          onClick={() => navigate('/voting/ballot')}
          className="flex items-center gap-2"
        >
          <Vote className="h-5 w-5" />
          Ir a Votar
        </Button>
      </div>
    </div>
  );
};

export default VotingGuidePage;
