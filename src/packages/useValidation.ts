import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import {
  validateCustomInput,
  validateForm,
  ValidationResultType,
  ValidationType,
} from './validators';

export type UseValidationReturnType<T> = {
  validationResult: [
    Record<keyof T, ValidationResultType>,
    Dispatch<SetStateAction<Record<keyof T, ValidationResultType>>>
  ][0];
  isValidated: boolean;
  isFormValid: (form: T) => Promise<boolean>;
  validateAll: (form: T) => Promise<Record<keyof T, ValidationResultType>>;
  validateFormElement: (form: T, elementKey: keyof T) => Promise<void>;
  clearValidations: () => void;
};

export const useValidation = <T>(
  validationRules: Record<keyof T, ValidationType[]>
): UseValidationReturnType<T> => {
  const [validationResult, setValidationResult] = useState<
    Record<keyof T, ValidationResultType>
  >({} as Record<keyof T, ValidationResultType>);

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
      setValidationResult((prev: Record<keyof T, ValidationResultType>) => ({ ...prev, [elementKey]: result }));
      setIsValidated(true);
    },
    [validationRules]
  );

  const isFormValid = useCallback(
    async (form: T) => {
      const validationResult = await validateAll(form);
      return !Object.keys(validationResult).some(
        (key) => !validationResult[key as keyof T].isValid
      );
    },
    [validateAll]
  );

  const clearValidations = useCallback(() => {
    setValidationResult({} as Record<keyof T, ValidationResultType>);
  }, []);

  return {
    validationResult,
    isValidated,
    isFormValid,
    validateAll,
    validateFormElement,
    clearValidations,
  };
};