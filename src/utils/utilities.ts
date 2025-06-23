import { config } from '@/config';
import { CandidateColor } from '@/types';

// Utility para manejo de colores de candidatos
export class CandidateColorUtil {
  static getColorClasses(color: CandidateColor) {
    return config.candidateColors[color] || config.candidateColors.blue;
  }

  static getBadgeClasses(color: CandidateColor) {
    const colors = this.getColorClasses(color);
    return `${colors.bg} ${colors.text} ${colors.border}`;
  }

  static getBorderClasses(color: CandidateColor) {
    const colors = this.getColorClasses(color);
    return colors.border.replace('border-', 'border-');
  }
}

// Utility para formateo de datos
export class FormatUtil {
  static formatNumber(num: number, locale = 'es-PE'): string {
    return new Intl.NumberFormat(locale).format(num);
  }

  static formatPercentage(num: number, decimals = 1): string {
    return `${num.toFixed(decimals)}%`;
  }

  static formatDate(date: Date, locale = 'es-PE'): string {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }

  static formatDateTime(date: Date, locale = 'es-PE'): string {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }

  static formatTime(date: Date, locale = 'es-PE'): string {
    return new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  }

  static truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  static capitalizeFirst(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  static formatDNI(dni: string): string {
    return dni.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
  }
}

// Utility para validaciones
export class ValidationUtil {
  static validateEmail(email: string): boolean {
    return config.validation.email.pattern.test(email);
  }

  static validatePassword(password: string): boolean {
    return config.validation.password.pattern.test(password);
  }

  static validateDNI(dni: string): boolean {
    return config.validation.dni.pattern.test(dni);
  }

  static validateName(name: string): boolean {
    return config.validation.name.pattern.test(name) &&
           name.length >= config.validation.name.minLength &&
           name.length <= config.validation.name.maxLength;
  }

  static getPasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
    if (password.length < 6) return 'weak';
    if (password.length < 8) return 'medium';
    if (this.validatePassword(password)) return 'strong';
    return 'medium';
  }
}

// Utility para manejo de errores
export class ErrorUtil {
  static getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'Ha ocurrido un error inesperado';
  }

  static isNetworkError(error: unknown): boolean {
    return error instanceof Error && 
           (error.message.includes('Network') || 
            error.message.includes('fetch') ||
            error.message.includes('conexión'));
  }

  static createErrorId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
}

// Utility para manejo de archivos
export class FileUtil {
  static formatFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }

  static validateFileSize(file: File): boolean {
    return file.size <= config.ui.maxUploadSize;
  }

  static validateFileType(file: File, allowedTypes: string[]): boolean {
    return allowedTypes.includes(file.type);
  }

  static async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
}

// Utility para manejo de URLs
export class UrlUtil {
  static buildUrl(base: string, path: string, params?: Record<string, string>): string {
    const url = new URL(path, base);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    return url.toString();
  }

  static parseQueryParams(search: string): Record<string, string> {
    const params = new URLSearchParams(search);
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }
}

// Utility para manejo de arrays
export class ArrayUtil {
  static removeDuplicates<T>(array: T[], key?: keyof T): T[] {
    if (!key) {
      return [...new Set(array)];
    }
    const seen = new Set();
    return array.filter(item => {
      const value = item[key];
      if (seen.has(value)) {
        return false;
      }
      seen.add(value);
      return true;
    });
  }

  static sortBy<T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
    return [...array].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  static groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
    return array.reduce((groups, item) => {
      const groupKey = String(item[key]);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    }, {} as Record<string, T[]>);
  }
}

// Utility para manejo de debounce
export class DebounceUtil {
  private static timers: Map<string, NodeJS.Timeout> = new Map();
  static debounce<T extends (...args: unknown[]) => unknown>(
    func: T,
    delay: number = config.ui.debounceDelay,
    key: string = 'default'
  ): T {
    return ((...args: Parameters<T>) => {
      const existingTimer = this.timers.get(key);
      if (existingTimer) {
        clearTimeout(existingTimer);
      }

      const newTimer = setTimeout(() => {
        func(...args);
        this.timers.delete(key);
      }, delay);

      this.timers.set(key, newTimer);
    }) as T;
  }

  static clearDebounce(key: string): void {
    const timer = this.timers.get(key);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(key);
    }
  }
}

// Utility para manejo de localStorage
export class StorageUtil {
  static setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  static getItem<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue || null;
    }
  }

  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
}
