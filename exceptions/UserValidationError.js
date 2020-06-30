module.exports = class UserValidationError extends Error {
    constructor (errors) {
        super('Error validating user');
        this.status = 400;
        this.data = errors;
    }
};