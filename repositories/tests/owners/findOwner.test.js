const { expect } = require('chai');
const ownerRepository = require('../../ownerRepository');
const db = require('../../../db/index');

describe('ownerRespository.createNewOwner', () => {
    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async () => {
        await db.disconnect();
    });

    it('should return owner object if the owner is in the owners collection', async () => {
        const result = await ownerRepository.findOneOwner('admin@admin.com');
        expect(result.email).to.equal('admin@admin.com');
    });

    it('should throw an error if the owner is not in the owners collection', async () => {
        try {
            await ownerRepository.findOneOwner('doesnotexist@doesnotexist.com');
        } catch(err) {
            expect(err).to.be.ok
        }
    });

})