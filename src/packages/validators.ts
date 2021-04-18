export type ValidationType = {
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

export type ValidationResultType = {
  isValid: boolean;
  messages?: string[];
};

export type ValidatorAction = (
  value: string | number,
  meta?: any
) => boolean | Promise<boolean>;

export const validateForm = async <T>(
  formToValidate: T,
  validationRules: Record<keyof T, ValidationType[]>
): Promise<Record<keyof T, ValidationResultType>> => {
  const result: Record<keyof T, ValidationResultType> = {} as Record<
    keyof T,
    ValidationResultType
  >;
  await Promise.all(
    Object.keys(validationRules).map(async (key) => {
      const rules = validationRules[key as keyof T];
      if (!rules) {
        return;
      }
      result[key as keyof T] = await validateCustomInput(
        (formToValidate[key as keyof T] as unknown) as string | number,
        validationRules[key as keyof T]
      );
      return;
    })
  );
  return result;
};

export enum ValidationRule {
  Required,
  Email,
  Number,
  Phone,
  NoSpaces,
  Regex,
  MinimumLength,
  MaximumLength,
  Remote,
}

export const validateCustomInput = async (
  value: string | number,
  validations: ValidationType[]
): Promise<ValidationResultType> => {
  if (!validations || !validations.length) {
    return { isValid: true };
  }

  let isValid = true;
  const validationMessages = [];

  for (const validation of validations) {
    let valueToValidate = value;
    if (valueToValidate && validation.path) {
      valueToValidate = (valueToValidate as any)[validation.path];
    }
    const passesValidation = await validatorMap[validation.rule](
      valueToValidate,
      validation.meta
    );
    isValid = isValid && passesValidation;

    if (!passesValidation) {
      validationMessages.push(validation.errorMessage);
      if (validation.stopCheckingOthersIfInvalid) {
        break;
      }
    }
  }

  return {
    isValid,
    messages: validationMessages,
  };
};

const requiredValidator: ValidatorAction = (value: string | number) =>
  value !== undefined && value !== null && value.toString().trim().length > 0;

const emailValidator: ValidatorAction = (value: string | number) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(value as string);
};

const numberValidator: ValidatorAction = (value: string | number) =>
  !isNaN(Number(value));

const phoneValidator: ValidatorAction = (value: string | number) => {
  const mobilePhoneRegex = /^(\+[0-9]+)?\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\3([0-9]{4})$/;
  return mobilePhoneRegex.test(value as string);
};

const noSpaceValidator: ValidatorAction = (value: string | number) => {
  return (value as string).indexOf(' ') > -1;
};

const maxLengthValidator: ValidatorAction = (
  value: string | number,
  meta?: number
) => {
  if (!meta) {
    console.error(
      'Length was not provided to MaximumLength Validator. Please provide length as the meta property'
    );
    return false;
  }
  return (value as string).length <= meta;
};

const minLengthValidator: ValidatorAction = (
  value: string | number,
  meta?: number
) => {
  if (!meta) {
    console.error(
      'Length was not provided to MinimumLength Validator. Please provide length as meta property'
    );
    return false;
  }
  return (value as string).length >= meta;
};

const regexValidator: ValidatorAction = (
  value: string | number,
  meta: RegExp
) => {
  if (!meta) {
    console.error(
      'A regular expression was not provided to Regex Validator. Please provide it as the meta property'
    );
    return false;
  }

  return meta.test(value as string);
};

const remoteValidator: ValidatorAction = async (
  value: string | number,
  meta: (value: string | number) => Promise<boolean>
) => {
  return meta(value);
};

const validatorMap: Record<ValidationRule, ValidatorAction> = {
  [ValidationRule.Required]: requiredValidator,
  [ValidationRule.Email]: emailValidator,
  [ValidationRule.Number]: numberValidator,
  [ValidationRule.Phone]: phoneValidator,
  [ValidationRule.NoSpaces]: noSpaceValidator,
  [ValidationRule.Regex]: regexValidator,
  [ValidationRule.MaximumLength]: maxLengthValidator,
  [ValidationRule.MinimumLength]: minLengthValidator,
  [ValidationRule.Remote]: remoteValidator,
};
