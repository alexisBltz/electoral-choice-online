
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, Users, TrendingUp, RefreshCw } from 'lucide-react';

const ResultsPanel = () => {
  const [results, setResults] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Mock results data
  const mockResults = [
    {
      id: 1,
      name: "María González",
      party: "Partido Democrático",
      color: "blue",
      votes: 1247,
      percentage: 42.3
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      party: "Alianza Nacional", 
      color: "red",
      votes: 986,
      percentage: 33.4
    },
    {
      id: 3,
      name: "Ana Martínez",
      party: "Movimiento Verde",
      color: "green", 
      votes: 456,
      percentage: 15.5
    },
    {
      id: 4,
      name: "Roberto Silva",
      party: "Frente Independiente",
      color: "purple",
      votes: 261,
      percentage: 8.8
    }
  ];

  const loadResults = () => {
    setIsLoading(true);
    
    // Simulate API call with random variation
    setTimeout(() => {
      const variationFactor = 0.95 + Math.random() * 0.1; // ±5% variation
      const updatedResults = mockResults.map(result => ({
        ...result,
        votes: Math.floor(result.votes * variationFactor)
      }));
      
      const total = updatedResults.reduce((sum, result) => sum + result.votes, 0);
      
      const resultsWithPercentages = updatedResults.map(result => ({
        ...result,
        percentage: total > 0 ? (result.votes / total * 100) : 0
      }));
      
      setResults(resultsWithPercentages);
      setTotalVotes(total);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    loadResults();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadResults, 30000);
    return () => clearInterval(interval);
  }, []);

  const getPartyColor = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-800 border-blue-200",
      red: "bg-red-100 text-red-800 border-red-200",
      green: "bg-green-100 text-green-800 border-green-200",
      purple: "bg-purple-100 text-purple-800 border-purple-200"
    };
    return colors[color] || colors.blue;
  };

  const getProgressColor = (color) => {
    const colors = {
      blue: "bg-blue-500",
      red: "bg-red-500", 
      green: "bg-green-500",
      purple: "bg-purple-500"
    };
    return colors[color] || colors.blue;
  };

  const winner = results.length > 0 ? results.reduce((prev, current) => 
    prev.votes > current.votes ? prev : current
  ) : null;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{totalVotes.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Votos Totales</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">78.5%</p>
                <p className="text-sm text-gray-600">Participación</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-sm text-gray-600">Candidatos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Leader */}
      {winner && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <TrendingUp className="h-5 w-5" />
              Líder Actual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-yellow-900">{winner.name}</h3>
                <Badge className={getPartyColor(winner.color)}>
                  {winner.party}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-yellow-900">
                  {winner.percentage.toFixed(1)}%
                </p>
                <p className="text-sm text-yellow-700">
                  {winner.votes.toLocaleString()} votos
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Resultados Detallados</CardTitle>
            <CardDescription>
              Actualizado en tiempo real • Última actualización: {new Date().toLocaleTimeString()}
            </CardDescription>
          </div>
          <button
            onClick={loadResults}
            disabled={isLoading}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </CardHeader>
        <CardContent className="space-y-4">
          {results.map((candidate, index) => (
            <div key={candidate.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
                  <div>
                    <h3 className="font-semibold">{candidate.name}</h3>
                    <Badge className={getPartyColor(candidate.color)}>
                      {candidate.party}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{candidate.percentage.toFixed(1)}%</p>
                  <p className="text-sm text-gray-600">{candidate.votes.toLocaleString()} votos</p>
                </div>
              </div>
              <Progress 
                value={candidate.percentage} 
                className="h-3"
                style={{
                  background: `linear-gradient(to right, ${
                    candidate.color === 'blue' ? '#3b82f6' :
                    candidate.color === 'red' ? '#ef4444' :
                    candidate.color === 'green' ? '#10b981' : '#8b5cf6'
                  } ${candidate.percentage}%, #e5e7eb ${candidate.percentage}%)`
                }}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="pt-6">
          <p className="text-sm text-gray-600 text-center">
            <strong>Nota:</strong> Los resultados se actualizan automáticamente cada 30 segundos. 
            Los resultados finales serán certificados al cierre de la votación.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsPanel;
