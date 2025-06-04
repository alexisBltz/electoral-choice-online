
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Users, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminPanel = () => {
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: "María González",
      party: "Partido Democrático",
      color: "blue",
      proposals: "Modernización del sistema de salud, Inversión en educación digital, Creación de empleos verdes",
      experience: "Senadora por 8 años, ex-Ministra de Educación"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      party: "Alianza Nacional",
      color: "red", 
      proposals: "Reducción de impuestos empresariales, Fortalecimiento de la seguridad ciudadana, Apoyo a pequeñas empresas",
      experience: "Gobernador por 6 años, empresario exitoso"
    }
  ]);

  const [editingCandidate, setEditingCandidate] = useState(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const { toast } = useToast();

  const [newCandidate, setNewCandidate] = useState({
    name: '',
    party: '',
    color: 'blue',
    proposals: '',
    experience: ''
  });

  const handleCreateCandidate = () => {
    if (!newCandidate.name || !newCandidate.party) {
      toast({
        title: "Error de validación",
        description: "El nombre y partido son obligatorios",
        variant: "destructive"
      });
      return;
    }

    const candidate = {
      id: Date.now(),
      ...newCandidate
    };

    setCandidates([...candidates, candidate]);
    setNewCandidate({ name: '', party: '', color: 'blue', proposals: '', experience: '' });
    setShowCreateDialog(false);
    
    toast({
      title: "Candidato creado",
      description: `${candidate.name} ha sido agregado exitosamente`,
    });
  };

  const handleEditCandidate = () => {
    if (!editingCandidate.name || !editingCandidate.party) {
      toast({
        title: "Error de validación", 
        description: "El nombre y partido son obligatorios",
        variant: "destructive"
      });
      return;
    }

    setCandidates(candidates.map(c => 
      c.id === editingCandidate.id ? editingCandidate : c
    ));
    setShowEditDialog(false);
    setEditingCandidate(null);
    
    toast({
      title: "Candidato actualizado",
      description: `${editingCandidate.name} ha sido actualizado exitosamente`,
    });
  };

  const handleDeleteCandidate = (candidateId) => {
    setCandidates(candidates.filter(c => c.id !== candidateId));
    toast({
      title: "Candidato eliminado",
      description: "El candidato ha sido eliminado del sistema",
    });
  };

  const openEditDialog = (candidate) => {
    setEditingCandidate({ ...candidate });
    setShowEditDialog(true);
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

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">Panel de Administración</h3>
              <p className="text-sm text-blue-800">
                Gestiona candidatos y configuración del sistema electoral
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{candidates.length}</p>
                <p className="text-sm text-gray-600">Candidatos Registrados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">2,950</p>
                <p className="text-sm text-gray-600">Votos Emitidos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">Activo</p>
                <p className="text-sm text-gray-600">Estado del Sistema</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Candidates Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gestión de Candidatos</CardTitle>
            <CardDescription>
              Crear, editar y eliminar candidatos del sistema
            </CardDescription>
          </div>
          
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Candidato
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear Nuevo Candidato</DialogTitle>
                <DialogDescription>
                  Completa la información del candidato
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    value={newCandidate.name}
                    onChange={(e) => setNewCandidate({...newCandidate, name: e.target.value})}
                    placeholder="Juan Pérez"
                  />
                </div>
                
                <div>
                  <Label htmlFor="party">Partido Político</Label>
                  <Input
                    id="party"
                    value={newCandidate.party}
                    onChange={(e) => setNewCandidate({...newCandidate, party: e.target.value})}
                    placeholder="Partido Democrático"
                  />
                </div>
                
                <div>
                  <Label htmlFor="color">Color del Partido</Label>
                  <select
                    id="color"
                    value={newCandidate.color}
                    onChange={(e) => setNewCandidate({...newCandidate, color: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="blue">Azul</option>
                    <option value="red">Rojo</option>
                    <option value="green">Verde</option>
                    <option value="purple">Morado</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="experience">Experiencia</Label>
                  <Textarea
                    id="experience"
                    value={newCandidate.experience}
                    onChange={(e) => setNewCandidate({...newCandidate, experience: e.target.value})}
                    placeholder="Describe la experiencia del candidato..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="proposals">Propuestas</Label>
                  <Textarea
                    id="proposals"
                    value={newCandidate.proposals}
                    onChange={(e) => setNewCandidate({...newCandidate, proposals: e.target.value})}
                    placeholder="Lista las propuestas principales del candidato..."
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateCandidate} className="bg-green-600 hover:bg-green-700">
                  Crear Candidato
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{candidate.name}</h3>
                      <Badge className={getPartyColor(candidate.color)}>
                        {candidate.party}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{candidate.experience}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(candidate)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCandidate(candidate.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      {editingCandidate && (
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Candidato</DialogTitle>
              <DialogDescription>
                Modifica la información del candidato
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Nombre Completo</Label>
                <Input
                  id="edit-name"
                  value={editingCandidate.name}
                  onChange={(e) => setEditingCandidate({...editingCandidate, name: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="edit-party">Partido Político</Label>
                <Input
                  id="edit-party"
                  value={editingCandidate.party}
                  onChange={(e) => setEditingCandidate({...editingCandidate, party: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="edit-color">Color del Partido</Label>
                <select
                  id="edit-color"
                  value={editingCandidate.color}
                  onChange={(e) => setEditingCandidate({...editingCandidate, color: e.target.value})}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="blue">Azul</option>
                  <option value="red">Rojo</option>
                  <option value="green">Verde</option>
                  <option value="purple">Morado</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="edit-experience">Experiencia</Label>
                <Textarea
                  id="edit-experience"
                  value={editingCandidate.experience}
                  onChange={(e) => setEditingCandidate({...editingCandidate, experience: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="edit-proposals">Propuestas</Label>
                <Textarea
                  id="edit-proposals"
                  value={editingCandidate.proposals}
                  onChange={(e) => setEditingCandidate({...editingCandidate, proposals: e.target.value})}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleEditCandidate} className="bg-blue-600 hover:bg-blue-700">
                Actualizar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminPanel;
