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

    it('should return true when insert a new owner object into owners collection', async () => {
        const result = await ownerRepository.createNewOwner({
            'name': 'ryan ho',
            'email': 'hello1@helloworld.com',
            'password': '12345',
            'createdAt': new Date(),
            'updatedAt': new Date()
        });
        expect(result).to.be.true;
    });

    it('should throw an error when a new owner object is inserted without name into venues collection', async () => {
        try {
            await ownerRepository.createNewOwner({
                'name': 'ryan ho',
                'email': 'hello2@helloworld.com',
                'password': '12345',
                'createdAt': new Date(),
                'updatedAt': new Date()
            });
        } catch(err) {
            expect(err).to.be.ok;
        }
    });

    it('should throw an error when a new owner object is inserted into venues collection with invalid createdAt date format', async () => {
        try {
            await ownerRepository.createNewOwner({
                'name': 'ryan ho',
                'email': 'hello3@helloworld.com',
                'password': '12345',
                'createdAt': '20200625-21:00:00Z',
                'updatedAt': new Date()
            });
        } catch(err) {
            expect(err).to.be.ok;
        }
    });


})