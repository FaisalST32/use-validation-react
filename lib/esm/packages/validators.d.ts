export declare type ValidationType = {
    /**
     * rule to validate against
     * */
    rule: ValidationRule;
    /**
     * error message to store if validation fails
     */
    errorMessage: string;
    /**
     * pass additional data to the validation rule
     * e.g., length for MinimumLength rule
     */
    meta?: any;
    /**
     * name of the value to use if the property is not a string or number.
     * Used when the object to validate isn't flat.
     * e.g., if the object to validate has a property
     * ```
     * category: {value: 2, text: 'some label'}
     * ```
     * and you want to validate against `value`, you can pass `path: 'value'`
     */
    path?: string;
    /**
     * By default all the validations declared for a property are run.
     * If you want to stop checking for all the rules if one of the rules fails,
     * set stopCheckingOthersIfInvalid to true
     */
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
