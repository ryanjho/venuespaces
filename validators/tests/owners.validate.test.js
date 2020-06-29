const chai = require('chai');
const validator = require('../ownersValidator');
const { expect } = chai;
const asserttype = require('chai-asserttype');
chai.use(asserttype);
const ValidationError = require('../../exceptions/OwnerValidationError');
const { validate } = require('../ownersValidator');

describe('Owners Validator', () => {
    it('should pass validation if owner inputs name, email and password information', () => {
        const result = validate({ name: 'Ryan', email: 'hello@helloworld.com', password: '111' });
        expect(result).to.be.true;
    });

    it('should fail validation if owner does not input name information', () => {
        try {
            validate({ email: 'hello@helloworld.com', password: '111' });
        } catch (err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal('Error validating owners');
        }
    });

    it('should fail validation if owner does not input email information', () => {
        try {
            validate({ name: 'Ryan', password: '111' });
        } catch (err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal('Error validating owners');
        }
    });

    it('should fail validation if owner does not input password information', () => {
        try {
            validate({ name: 'Ryan', email: 'hello@helloworld.com' });
        } catch (err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal('Error validating owners');
        }
    });

    it('should coerce name, email and password if inputs are numbers', () => {
        const testData = { name: 111, email: 111, password: 111 }
        const result = validate(testData);
        expect(result).to.be.true;
        expect(testData.name).to.equal('111');
        expect(testData.email).to.equal('111');
        expect(testData.password).to.equal('111');
    });

    it('should should pass the validation if the createdAt field follows the ISO 8601 format', () => {
        const testData = { name: '111', email: '111', password: '111', createdAt: '2020-06-25T21:00:00Z' };
        const result = validate(testData);
        expect(result).to.be.true;
    });

    it('should fail the validation if the createdAt field does not follow the ISO 8601 format', () => {
        try {
            validate({ name: '111', email: '111', password: '111', createdAt: '20200625-21:00:00Z' });
        } catch(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal('Error validating owners');
        }
    });

    it('should have createdAt as default value equal to curremt time if createdAt is not provided', () => {
        const testData = { name: '111', email: 'hello@helloworld.com', password: '111'};
        const result = validate(testData);
        expect(result).to.be.true;
        expect(testData.createdAt).to.be.date();
    });

    it('should coerce createdAt to a date object if createdAt is provided as a ISO 8601 dateString format', () => {
        const testData = { name: '111', email: 'hello@helloworld.com', password: '111', createdAt: '2020-06-25T21:00:00Z' };
        const result = validate(testData);
        expect(result).to.be.true;
        expect(testData.createdAt).to.be.date();
    });


});