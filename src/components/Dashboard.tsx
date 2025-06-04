import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Vote, BarChart3, Users, LogOut, Settings, CheckCircle } from 'lucide-react';
import CandidateList from './CandidateList';
import VotingInterface from './VotingInterface';
import ResultsPanel from './ResultsPanel';
import AdminPanel from './AdminPanel';

const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('candidates');
  const [hasVoted, setHasVoted] = useState(user.hasVoted);

  const handleVoteComplete = () => {
    setHasVoted(true);
    setActiveTab('results');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Vote className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Sistema Electoral Digital</h1>
                <p className="text-sm text-gray-500">ONPE - Elecciones Generales 2024</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  {hasVoted ? (
                    <>
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      Voto registrado
                    </>
                  ) : (
                    "Pendiente de votar"
                  )}
                  {user.isAdmin && <span className="text-blue-600 ml-2">• Admin</span>}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="candidates" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Candidatos
            </TabsTrigger>
            <TabsTrigger 
              value="voting" 
              disabled={hasVoted}
              className="flex items-center gap-2"
            >
              <Vote className="h-4 w-4" />
              {hasVoted ? "Votado" : "Votar"}
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Resultados
            </TabsTrigger>
            {user.isAdmin && (
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Administración
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="candidates" className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Candidatos Registrados</h2>
              <p className="text-gray-600">Conoce a los candidatos y sus propuestas antes de votar</p>
            </div>
            <CandidateList />
          </TabsContent>

          <TabsContent value="voting" className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Emite tu Voto</h2>
              <p className="text-gray-600">Selecciona tu candidato preferido de manera segura</p>
            </div>
            <VotingInterface 
              user={user} 
              onVoteComplete={handleVoteComplete}
              hasVoted={hasVoted}
            />
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Resultados Electorales</h2>
              <p className="text-gray-600">Monitoreo en tiempo real del proceso electoral</p>
            </div>
            <ResultsPanel />
          </TabsContent>

          {user.isAdmin && (
            <TabsContent value="admin" className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">Panel de Administración</h2>
                <p className="text-gray-600">Gestión de candidatos y configuración del sistema</p>
              </div>
              <AdminPanel />
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
