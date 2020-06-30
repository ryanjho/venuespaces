const ajv = require('ajv');
const Ajv = new ajv({
    useDefaults: true,
    coerceTypes: true,
    allErrors: true,
});
const User = require('./schema/users');
const validator = Ajv.compile(User);
const ValidationError = require('../exceptions/UserValidationError');

module.exports = {
    validate(user) {
        const isValid = validator(user);
        if (!isValid) {
            console.log(`Validation Errors: ${validator.errors}`);
            throw new ValidationError(validator.errors);
        }

        // Add default date object values for createdAt and updatedAt
        user.createdAt = user.createdAt ? new Date(user.createdAt) : new Date();
        user.updatedAt = user.updatedAt ? new Date(user.updatedAt) : new Date();
        return isValid;
    }
}