var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
export var validateForm = function (formToValidate, validationRules) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                result = {};
                return [4 /*yield*/, Promise.all(Object.keys(validationRules).map(function (key) { return __awaiter(void 0, void 0, void 0, function () {
                        var rules, _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    rules = validationRules[key];
                                    if (!rules) {
                                        return [2 /*return*/];
                                    }
                                    _a = result;
                                    _b = key;
                                    return [4 /*yield*/, validateCustomInput(formToValidate[key], validationRules[key])];
                                case 1:
                                    _a[_b] = _c.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 1:
                _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
export var ValidationRule;
(function (ValidationRule) {
    ValidationRule[ValidationRule["Required"] = 0] = "Required";
    ValidationRule[ValidationRule["Email"] = 1] = "Email";
    ValidationRule[ValidationRule["Number"] = 2] = "Number";
    ValidationRule[ValidationRule["Phone"] = 3] = "Phone";
    ValidationRule[ValidationRule["NoSpaces"] = 4] = "NoSpaces";
    ValidationRule[ValidationRule["Regex"] = 5] = "Regex";
    ValidationRule[ValidationRule["MinimumLength"] = 6] = "MinimumLength";
    ValidationRule[ValidationRule["MaximumLength"] = 7] = "MaximumLength";
    ValidationRule[ValidationRule["Remote"] = 8] = "Remote";
})(ValidationRule || (ValidationRule = {}));
export var validateCustomInput = function (value, validations) { return __awaiter(void 0, void 0, void 0, function () {
    var isValid, validationMessages, _i, validations_1, validation, valueToValidate, passesValidation;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!validations || !validations.length) {
                    return [2 /*return*/, { isValid: true }];
                }
                isValid = true;
                validationMessages = [];
                _i = 0, validations_1 = validations;
                _a.label = 1;
            case 1:
                if (!(_i < validations_1.length)) return [3 /*break*/, 4];
                validation = validations_1[_i];
                valueToValidate = value;
                if (valueToValidate && validation.path) {
                    valueToValidate = valueToValidate[validation.path];
                }
                return [4 /*yield*/, validatorMap[validation.rule](valueToValidate, validation.meta)];
            case 2:
                passesValidation = _a.sent();
                isValid = isValid && passesValidation;
                if (!passesValidation) {
                    validationMessages.push(validation.errorMessage);
                    if (validation.stopCheckingOthersIfInvalid) {
                        return [3 /*break*/, 4];
                    }
                }
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, {
                    isValid: isValid,
                    messages: validationMessages,
                }];
        }
    });
}); };
var requiredValidator = function (value) {
    return !!value && value.toString().trim().length > 0;
};
var emailValidator = function (value) {
    var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(value);
};
var numberValidator = function (value) {
    return !isNaN(Number(value));
};
var phoneValidator = function (value) {
    var mobilePhoneRegex = /^(\+[0-9]+)?\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\3([0-9]{4})$/;
    return mobilePhoneRegex.test(value);
};
var noSpaceValidator = function (value) {
    return value.indexOf(' ') > -1;
};
var maxLengthValidator = function (value, meta) {
    if (!meta) {
        console.error('Length was not provided to MaximumLength Validator. Please provide length as the meta property');
        return false;
    }
    return value.length <= meta;
};
var minLengthValidator = function (value, meta) {
    if (!meta) {
        console.error('Length was not provided to MinimumLength Validator. Please provide length as meta property');
        return false;
    }
    return value.length >= meta;
};
var regexValidator = function (value, meta) {
    if (!meta) {
        console.error('A regular expression was not provided to Regex Validator. Please provide it as the meta property');
        return false;
    }
    return meta.test(value);
};
var remoteValidator = function (value, meta) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, meta(value)];
    });
}); };
var validatorMap = (_a = {},
    _a[ValidationRule.Required] = requiredValidator,
    _a[ValidationRule.Email] = emailValidator,
    _a[ValidationRule.Number] = numberValidator,
    _a[ValidationRule.Phone] = phoneValidator,
    _a[ValidationRule.NoSpaces] = noSpaceValidator,
    _a[ValidationRule.Regex] = regexValidator,
    _a[ValidationRule.MaximumLength] = maxLengthValidator,
    _a[ValidationRule.MinimumLength] = minLengthValidator,
    _a[ValidationRule.Remote] = remoteValidator,
    _a);
