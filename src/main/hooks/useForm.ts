import { useState, useCallback } from 'react';

// 🎯 Hook para manejo de formularios reutilizable
export interface UseFormOptions<T> {
  initialValues: T;
  validationSchema?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit?: (values: T) => Promise<void> | void;
}

export interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
  setValue: (field: keyof T, value: any) => void;
  setValues: (values: Partial<T>) => void;
  setFieldTouched: (field: keyof T, touched?: boolean) => void;
  handleSubmit: () => Promise<void>;
  resetForm: () => void;
  validateField: (field: keyof T) => void;
  validateForm: () => boolean;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationSchema,
  onSubmit
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validar un campo específico
  const validateField = useCallback((field: keyof T) => {
    if (!validationSchema) return;

    const fieldErrors = validationSchema(values);
    setErrors(prev => ({
      ...prev,
      [field]: fieldErrors[field]
    }));
  }, [values, validationSchema]);

  // Validar todo el formulario
  const validateForm = useCallback((): boolean => {
    if (!validationSchema) return true;

    const fieldErrors = validationSchema(values);
    setErrors(fieldErrors);
    
    return Object.keys(fieldErrors).length === 0;
  }, [values, validationSchema]);

  // Establecer valor de un campo
  const setValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error del campo cuando se modifica
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  }, [errors]);

  // Establecer múltiples valores
  const setMultipleValues = useCallback((newValues: Partial<T>) => {
    setValues(prev => ({
      ...prev,
      ...newValues
    }));
  }, []);

  // Marcar campo como tocado
  const setFieldTouched = useCallback((field: keyof T, touchedValue: boolean = true) => {
    setTouched(prev => ({
      ...prev,
      [field]: touchedValue
    }));
  }, []);

  // Manejar envío del formulario
  const handleSubmit = useCallback(async () => {
    if (!onSubmit) return;

    const isValid = validateForm();
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Error en formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, onSubmit, validateForm]);

  // Resetear formulario
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Verificar si el formulario es válido
  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    setValue,
    setValues: setMultipleValues,
    setFieldTouched,
    handleSubmit,
    resetForm,
    validateField,
    validateForm
  };
}
