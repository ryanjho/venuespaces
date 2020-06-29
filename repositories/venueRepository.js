const db = require('../db/index');
const { showCompletionScript } = require('yargs');
const { showVenue, createNewVenue, deleteVenue } = require('../controllers/venueController');

module.exports = {
    async getAll() {
        try {
            return await db.venues.find().toArray();
        } catch (err) {
            throw new Error(`Database Error - ${err.message}`);
        }
    },
    async getOneVenue(subdirectory) {
        const venue = await db.venues.findOne({ subdirectory});
        if (!venue) throw new Error(`Venue ${subdirectory} does not exist`);
        return venue;
    },
    async showVenue(subdirectory) {
        const venue = await db.venues.findOne(
            { subdirectory }
        );
        if(!venue) throw new Error('Venue does not exist');
        return venue;
    },
    async createNewVenue(newVenue) {
        try {
            const { insertedCount } = await db.venues.insertOne(newVenue);
            if (!insertedCount) throw new Error('Venue insertion failure');
            return true;
        } catch(err) {
            throw new Error(`Due to ${err.message}, you are not allowed to add this venue ${JSON.stringify(newVenue)}`)
        }
    },
    async updateVenue(venue, subdirectory) {
        try {
            const { matchedCount } = await db.venues.updateOne(
                { subdirectory: subdirectory}, 
                { $set: venue }
            );
            if (!matchedCount) throw new Error(`${venue.name} does not exist!`);
            return true;
        } catch(err) {
            throw new Error(`Unable to update ${venue.name} due to ${err.message}`);
        }
    },
    async deleteVenue(subdirectory) {
        const { result } = await db.venues.deleteOne({ subdirectory});
        if (!result.n) throw new Error(`Venue ${subdirectory} does not exist`);
        return result;
    }

}
