import { VALIDATION_RULES } from '@/constants';
import { RegisterData, AuthCredentials } from '@/types';

export const validateEmail = (email: string): boolean => {
  return VALIDATION_RULES.EMAIL_PATTERN.test(email);
};

export const validatePassword = (password: string): boolean => {
  return VALIDATION_RULES.PASSWORD_PATTERN.test(password);
};

export const validateDNI = (dni: string): boolean => {
  return VALIDATION_RULES.DNI_PATTERN.test(dni);
};

export const validateName = (name: string): boolean => {
  return name.length >= VALIDATION_RULES.NAME_MIN_LENGTH && 
         name.length <= VALIDATION_RULES.NAME_MAX_LENGTH;
};

export interface ValidationError {
  field: string;
  message: string;
}

export const validateLoginForm = (data: AuthCredentials): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!validateEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'Por favor ingresa un email válido'
    });
  }

  if (!data.password) {
    errors.push({
      field: 'password',
      message: 'La contraseña es obligatoria'
    });
  }

  return errors;
};

export const validateRegisterForm = (data: RegisterData): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!validateName(data.name)) {
    errors.push({
      field: 'name',
      message: `El nombre debe tener entre ${VALIDATION_RULES.NAME_MIN_LENGTH} y ${VALIDATION_RULES.NAME_MAX_LENGTH} caracteres`
    });
  }

  if (!validateDNI(data.dni)) {
    errors.push({
      field: 'dni',
      message: 'El DNI debe tener exactamente 8 dígitos'
    });
  }

  if (!validateEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'Por favor ingresa un email válido'
    });
  }

  if (!validatePassword(data.password)) {
    errors.push({
      field: 'password',
      message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número'
    });
  }

  if (data.password !== data.confirmPassword) {
    errors.push({
      field: 'confirmPassword',
      message: 'Las contraseñas no coinciden'
    });
  }

  return errors;
};
