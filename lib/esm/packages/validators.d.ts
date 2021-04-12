export declare type ValidationType = {
    rule: ValidationRule;
    errorMessage: string;
    meta?: any;
    path?: string;
    stopCheckingOthersIfInvalid?: boolean;
};
export declare type ValidationResultType = {
    isValid: boolean;
    messages?: string[];
};
export declare type ValidatorAction = (value: string | number, meta?: any) => boolean | Promise<boolean>;
export declare const validateForm: <T>(formToValidate: T, validationRules: Record<keyof T, ValidationType[]>) => Promise<Record<keyof T, ValidationResultType>>;
export declare enum ValidationRule {
    Required = 0,
    Email = 1,
    Number = 2,
    Phone = 3,
    NoSpaces = 4,
    Regex = 5,
    MinimumLength = 6,
    MaximumLength = 7,
    Remote = 8
}
export declare const validateCustomInput: (value: string | number, validations: ValidationType[]) => Promise<ValidationResultType>;
