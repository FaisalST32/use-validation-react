import { useCallback, useState } from 'react';
import {
  validateCustomInput,
  validateForm,
  ValidationResultType,
  ValidationType,
} from './validators';

export type UseValidationReturnType<T> = {
  validationResult: Partial<Record<keyof T, ValidationResultType>>;
  isValidated: boolean;
  isFormValid: (form: T) => Promise<boolean>;
  validateAll: (form: T) => Promise<Partial<Record<keyof T, ValidationResultType>>>;
  validateFormElement: (form: T, elementKey: keyof T) => Promise<void>;
  clearValidations: () => void;
  isElementValid: (elementKey: keyof T) => boolean
};

export const useValidation = <T>(
  validationRules: Partial<Record<keyof T, ValidationType[]>>
): UseValidationReturnType<T> => {
  const [validationResult, setValidationResult] = useState<
    Partial<Record<keyof T, ValidationResultType>>
  >({});

  const [isValidated, setIsValidated] = useState(false);

  const validateAll = useCallback(
    async (form: T) => {
      const result = await validateForm(form, validationRules);
      setValidationResult(result);
      setIsValidated(true);
      return result;
    },
    [validationRules]
  );

  const validateFormElement = useCallback(
    async (form: T, elementKey: keyof T) => {
      const result = await validateCustomInput(
        (form[elementKey] as unknown) as string | number,
        validationRules[elementKey as keyof T]
      );
      setValidationResult((prev: Partial<Record<keyof T, ValidationResultType>>) => ({ ...prev, [elementKey]: result }));
      setIsValidated(true);
    },
    [validationRules]
  );

  const isFormValid = useCallback(
    async (form: T) => {
      const validationResult = await validateAll(form);
      return !Object.keys(validationResult).some(
        (key) => !validationResult[key as keyof T]?.isValid
      );
    },
    [validateAll]
  );

  const clearValidations = useCallback(() => {
    setValidationResult({});
  }, []);

  const isElementValid = useCallback((elementKey: keyof T) => {
    if (!validationResult[elementKey]) {
      return true;
    }
    return !!validationResult[elementKey]?.isValid;
  }, [validationResult]);

  return {
    validationResult,
    isValidated,
    isFormValid,
    validateAll,
    validateFormElement,
    clearValidations,
    isElementValid,
  };
};
