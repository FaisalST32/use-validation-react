import { ValidationResultType, ValidationType } from './validators';
export declare type UseValidationReturnType<T> = {
    validationResult: Partial<Record<keyof T, ValidationResultType>>;
    isValidated: boolean;
    isFormValid: (form: T) => Promise<boolean>;
    validateAll: (form: T) => Promise<Partial<Record<keyof T, ValidationResultType>>>;
    validateFormElement: (form: T, elementKey: keyof T) => Promise<void>;
    clearValidations: () => void;
    isElementValid: (elementKey: keyof T) => boolean;
};
export declare const useValidation: <T>(validationRules: Partial<Record<keyof T, ValidationType[]>>) => UseValidationReturnType<T>;
