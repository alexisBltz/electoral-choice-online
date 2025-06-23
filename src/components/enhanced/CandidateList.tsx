import React, { memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { CandidateColorUtil, FormatUtil } from '@/utils/utilities';
import { useCandidates } from '@/hooks';
import { Candidate } from '@/types';

interface CandidateCardProps {
  candidate: Candidate;
  onSelect?: (candidate: Candidate) => void;
  isSelected?: boolean;
  variant?: 'default' | 'interactive' | 'compact';
}

const CandidateCard = memo(({ 
  candidate, 
  onSelect, 
  isSelected = false, 
  variant = 'default' 
}: CandidateCardProps) => {
  const colorClasses = CandidateColorUtil.getColorClasses(candidate.color);
  const badgeClasses = CandidateColorUtil.getBadgeClasses(candidate.color);

  const handleClick = () => {
    onSelect?.(candidate);
  };

  const cardClassName = `
    transition-all duration-200 hover:shadow-lg 
    ${variant === 'interactive' ? 'cursor-pointer hover:scale-[1.02]' : ''}
    ${isSelected ? `ring-2 ring-offset-2 ${colorClasses.border.replace('border-', 'ring-')} bg-gray-50` : ''}
    border-l-4 border-l-${candidate.color}-500
  `;

  return (
    <Card className={cardClassName} onClick={handleClick}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl">{candidate.name}</CardTitle>
            <Badge className={badgeClasses}>
              {candidate.party}
            </Badge>
          </div>
          {variant !== 'compact' && (
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-gray-600">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          )}
        </div>
        {variant !== 'compact' && candidate.experience && (
          <CardDescription className="text-sm">
            {FormatUtil.truncateText(candidate.experience, 120)}
          </CardDescription>
        )}
      </CardHeader>
      
      {variant !== 'compact' && candidate.proposals && (
        <CardContent>
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-gray-900">Propuestas Principales:</h4>
            <ul className="space-y-2">
              {candidate.proposals.slice(0, 3).map((proposal, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  {FormatUtil.truncateText(proposal, 80)}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      )}

      {candidate.votes !== undefined && candidate.percentage !== undefined && (
        <CardContent className="pt-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Votos: {FormatUtil.formatNumber(candidate.votes)}</span>
            <span className="font-semibold">{FormatUtil.formatPercentage(candidate.percentage)}</span>
          </div>
        </CardContent>
      )}
    </Card>
  );
});

CandidateCard.displayName = 'CandidateCard';

interface CandidateListProps {
  variant?: 'grid' | 'list';
  interactive?: boolean;
  onCandidateSelect?: (candidate: Candidate) => void;
  selectedCandidateId?: number;
  showSearch?: boolean;
  limit?: number;
}

export const CandidateListComponent = memo(({
  variant = 'grid',
  interactive = false,
  onCandidateSelect,
  selectedCandidateId,
  showSearch = true,
  limit
}: CandidateListProps) => {
  const { 
    filteredCandidates, 
    isLoading, 
    error, 
    filters,
    search,
    fetchCandidates 
  } = useCandidates();

  const candidatesToShow = limit ? filteredCandidates.slice(0, limit) : filteredCandidates;

  const handleSearch = (value: string) => {
    search(value);
  };

  if (error) {
    return (
      <Card className="p-6 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={() => fetchCandidates()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Reintentar
        </button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      {showSearch && (
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar candidatos o partidos..."
            value={filters.searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Candidates Grid/List */}
      {!isLoading && candidatesToShow.length > 0 && (
        <div className={variant === 'grid' ? 'grid gap-6 md:grid-cols-2' : 'space-y-4'}>
          {candidatesToShow.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onSelect={interactive ? onCandidateSelect : undefined}
              isSelected={selectedCandidateId === candidate.id}
              variant={interactive ? 'interactive' : variant === 'list' ? 'compact' : 'default'}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && candidatesToShow.length === 0 && (
        <Card className="p-8 text-center">
          <div className="text-gray-500">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No se encontraron candidatos</h3>
            <p className="text-sm">
              {filters.searchTerm 
                ? 'Intenta con otros términos de búsqueda'
                : 'No hay candidatos registrados en el sistema'
              }
            </p>
          </div>
        </Card>
      )}
    </div>
  );
});

CandidateListComponent.displayName = 'CandidateListComponent';

export default CandidateListComponent;
