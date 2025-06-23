import { CANDIDATE_COLORS } from '@/constants';
import { CandidateColor } from '@/types';

export const getCandidateColorClasses = (color: CandidateColor) => {
  return CANDIDATE_COLORS[color] || CANDIDATE_COLORS.blue;
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-PE').format(num);
};

export const formatPercentage = (num: number): string => {
  return `${num.toFixed(1)}%`;
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const generateId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
