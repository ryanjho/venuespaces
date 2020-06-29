const ajv = require('ajv');
const Ajv = new ajv({
    useDefaults: true,
    coerceTypes: true,
    allErrors: true,
});
const Owner = require('./schema/owners');
const validator = Ajv.compile(Owner);
const ValidationError = require('../exceptions/OwnerValidationError');

module.exports = {
    validate(owner) {
        const isValid = validator(owner);
        if (!isValid) {
            console.log(`Validation Errors: ${validator.errors}`);
            throw new ValidationError(validator.errors);
        }

        // Add default date object values for createdAt and updatedAt
        owner.createdAt = owner.createdAt ? new Date(owner.createdAt) : new Date();
        owner.updatedAt = owner.updatedAt ? new Date(owner.updatedAt) : new Date();
        return isValid;
    }
}