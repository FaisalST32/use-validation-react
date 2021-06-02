import { ValidationResultType, ValidationType } from './validators';
export declare type UseValidationReturnType<T> = {
    validationResult: Record<keyof T, ValidationResultType>;
    isValidated: boolean;
    isFormValid: (form: T) => Promise<boolean>;
    validateAll: (form: T) => Promise<Record<keyof T, ValidationResultType>>;
    validateFormElement: (form: T, elementKey: keyof T) => Promise<void>;
    clearValidations: () => void;
    isElementValid: (elementKey: keyof T) => boolean;
};
export declare const useValidation: <T>(validationRules: Record<keyof T, ValidationType[]>) => UseValidationReturnType<T>;
