module.exports = class OwnerValidationError extends Error {
    constructor (errors) {
        super('Error validating owners');
        this.status = 400;
        this.data = errors;
    }
};