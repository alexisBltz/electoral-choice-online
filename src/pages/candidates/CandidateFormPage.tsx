import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCandidates } from '@/hooks/useCandidates';
import { ArrowLeft, Upload, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const candidateFormSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  position: z.string().min(2, 'El cargo debe tener al menos 2 caracteres'),
  party: z.string().min(2, 'El partido debe tener al menos 2 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  avatar: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
  email: z.string().email('Debe ser un email válido'),
  phone: z.string().min(8, 'El teléfono debe tener al menos 8 caracteres'),
  birthDate: z.string().min(1, 'La fecha de nacimiento es requerida'),
  birthPlace: z.string().min(2, 'El lugar de nacimiento es requerido'),
  education: z.string().min(2, 'La educación es requerida'),
  experience: z.string().min(10, 'La experiencia debe tener al menos 10 caracteres'),
  proposals: z.string().min(20, 'Las propuestas deben tener al menos 20 caracteres'),
  website: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
  socialMedia: z.object({
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    instagram: z.string().optional(),
  }).optional(),
});

type CandidateFormData = z.infer<typeof candidateFormSchema>;

const CandidateFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { candidates, loading } = useCandidates();
  const { toast } = useToast();
  const [previewImage, setPreviewImage] = React.useState<string>('');

  const isEditing = Boolean(id);
  const candidate = React.useMemo(() => {
    return isEditing ? candidates.find(c => c.id === id) : null;
  }, [candidates, id, isEditing]);

  const form = useForm<CandidateFormData>({
    resolver: zodResolver(candidateFormSchema),
    defaultValues: {
      name: '',
      position: '',
      party: '',
      description: '',
      avatar: '',
      email: '',
      phone: '',
      birthDate: '',
      birthPlace: '',
      education: '',
      experience: '',
      proposals: '',
      website: '',
      socialMedia: {
        facebook: '',
        twitter: '',
        instagram: '',
      },
    },
  });

  // Load candidate data for editing
  React.useEffect(() => {
    if (isEditing && candidate) {
      form.reset({
        name: candidate.name,
        position: candidate.position,
        party: candidate.party,
        description: candidate.description,
        avatar: candidate.avatar || '',
        email: 'contacto@candidato.com', // Mock data
        phone: '+506 2234-5678', // Mock data
        birthDate: '1975-03-15', // Mock data
        birthPlace: 'San José, Costa Rica', // Mock data
        education: 'Licenciatura en Administración Pública', // Mock data
        experience: 'Alcalde Municipal (2018-2022), Diputado Provincial (2014-2018)', // Mock data
        proposals: 'Educación de calidad, Salud accesible, Desarrollo económico', // Mock data
        website: '', // Mock data
        socialMedia: {
          facebook: '',
          twitter: '',
          instagram: '',
        },
      });
      setPreviewImage(candidate.avatar || '');
    }
  }, [isEditing, candidate, form]);

  const onSubmit = async (data: CandidateFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: isEditing ? 'Candidato actualizado' : 'Candidato registrado',
        description: `${data.name} ha sido ${isEditing ? 'actualizado' : 'registrado'} exitosamente.`,
      });
      
      navigate('/candidates');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Ocurrió un error al procesar la solicitud.',
        variant: 'destructive',
      });
    }
  };

  const handleImageChange = (url: string) => {
    form.setValue('avatar', url);
    setPreviewImage(url);
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
          onClick={() => navigate('/candidates')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditing ? 'Editar Candidato' : 'Registrar Nuevo Candidato'}
          </h1>
          <p className="text-muted-foreground">
            {isEditing 
              ? 'Actualiza la información del candidato'
              : 'Complete todos los campos para registrar un nuevo candidato'
            }
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
              <CardDescription>
                Datos principales del candidato
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={previewImage} alt="Vista previa" />
                  <AvatarFallback className="text-2xl">
                    {form.watch('name')?.charAt(0) || '?'}
                  </AvatarFallback>
                </Avatar>
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem className="w-full max-w-md">
                      <FormLabel>URL de la imagen</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="https://ejemplo.com/imagen.jpg"
                          onChange={(e) => {
                            field.onChange(e);
                            handleImageChange(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Ingresa la URL de la imagen del candidato
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre Completo</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Juan Pérez González" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cargo Aspirante</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Presidente" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="party"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Partido Político</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un partido" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Partido Nacional">Partido Nacional</SelectItem>
                          <SelectItem value="Partido Liberal">Partido Liberal</SelectItem>
                          <SelectItem value="Partido Democrático">Partido Democrático</SelectItem>
                          <SelectItem value="Partido Verde">Partido Verde</SelectItem>
                          <SelectItem value="Otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="contacto@candidato.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="+506 2234-5678" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de Nacimiento</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthPlace"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lugar de Nacimiento</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="San José, Costa Rica" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="education"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Educación</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Licenciatura en..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Breve descripción del candidato..."
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormDescription>
                      Una descripción breve que aparecerá en la tarjeta del candidato
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Información Profesional</CardTitle>
              <CardDescription>
                Experiencia y propuestas del candidato
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experiencia Profesional</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Describe la experiencia profesional y política del candidato..."
                        className="min-h-[120px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="proposals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Propuestas de Campaña</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Principales propuestas y plan de gobierno..."
                        className="min-h-[120px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Social Media & Website */}
          <Card>
            <CardHeader>
              <CardTitle>Presencia Digital</CardTitle>
              <CardDescription>
                Sitio web y redes sociales del candidato
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sitio Web</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://www.candidato.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="socialMedia.facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="facebook.com/candidato" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="socialMedia.twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="@candidato" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="socialMedia.instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="@candidato" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/candidates')}
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              <Save className="h-4 w-4 mr-2" />
              {form.formState.isSubmitting 
                ? (isEditing ? 'Actualizando...' : 'Registrando...') 
                : (isEditing ? 'Actualizar Candidato' : 'Registrar Candidato')
              }
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CandidateFormPage;
