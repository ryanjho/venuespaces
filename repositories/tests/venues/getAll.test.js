const { expect } = require('chai');
const venueRepository = require('../../venueRepository');
const db = require('../../../db/index');

describe('venuesRepository.getAll', () => {
    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async () => {
        await db.disconnect();
    });

    it('should return all an array', async () => {
        const venues = await venueRepository.getAll();
        expect(venues).to.be.an('array');
    });

    it('should return an array of venues, and one of the venues should be "Hyperspace"', async () => {
        const venues = await venueRepository.getAll();
        const hyperspace = venues.find( venue => venue.name = "Hyperspace");
        expect(hyperspace.name).to.equal("Hyperspace");
    });

    it('should return all multiple items', async () => {
        const venues = await venueRepository.getAll();
        expect(venues.length).to.be.greaterThan(0);
    });

});