const db = require('../db/index');

module.exports = {
    async getAll() {
        try {
            return await db.venues.find().toArray();
        } catch (err) {
            throw new Error(`Database Error - ${err.message}`);
        }
    },
    async getOwnerVenues(owner) {
        try {
            console.log(owner);
            const venues = await db.venues.find({owner: owner._id}).toArray();
            return venues;
        } catch(err) {
            throw new Error(`Database Error - ${err.message}`);
        }
    },
    async getOneVenue(subdirectory) {
        const venue = await db.venues.findOne({ subdirectory});
        if (!venue) throw new Error(`Venue ${subdirectory} does not exist`);
        return venue;
    },
    async getOneVenueById(venueId) {
        const venue = await db.venues.findOne( {_id: venueId });
        if (!venue) throw new Error(`Venue with ID ${venueId} does not exist`);
        return venue;
    },
    async getOneVenueByOwner(ownerId) {
        const venue = await db.venues.findOne( { owner: ownerId});
        if (!venue) throw new Error(`Owner ${ownerId} does not have any venues`);
        return venue;
    },
    async showVenue(subdirectory) {
        const venue = await db.venues.findOne({ subdirectory: subdirectory });
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
