const db = require('../db/index');
const ObjectId = require('mongodb').ObjectID

module.exports = {
    async getEnquiriesByVenue(venue) {
        try {
            return await db.enquiries.find({venueId: venue._id}).toArray();
        } catch(err) {
            throw new Error(`Database Error - ${err.message}`);
        }
    },
    async getEnquiriesByUser(user) {
        try {
            return await db.enquiries.find({userId: new ObjectId(user._id)}).toArray();
        } catch(err) {
            throw new Error(`Database Error - ${err.message}`);
        }
    },
    async createNewEnquiry(newEnquiry) {
        try {
            const { insertedCount } = await db.enquiries.insertOne(newEnquiry);
            if (!insertedCount) throw new Error(`Enquiry Insertion Failure`);
            return true;
        } catch(err) {
            throw new Error(`Due to ${err.message}, you are not allowed to add this enquiry ${JSON.stringify(newEnquiry)}`)
        }
    },
    // async getOneVenue(subdirectory) {
    //     const venue = await db.venues.findOne({ subdirectory});
    //     if (!venue) throw new Error(`Venue ${subdirectory} does not exist`);
    //     return venue;
    // },
    // async getOneVenueById(venueId) {
    //     const venue = await db.venues.findOne( {_id: venueId });
    //     if (!venue) throw new Error(`Veue with ID ${venueId} does not exist`);
    //     return venue;
    // },
    // async showVenue(subdirectory) {
    //     const venue = await db.venues.findOne(
    //         { subdirectory }
    //     );
    //     if(!venue) throw new Error('Venue does not exist');
    //     return venue;
    // },
    // async deleteVenue(subdirectory) {
    //     const { result } = await db.venues.deleteOne({ subdirectory});
    //     if (!result.n) throw new Error(`Venue ${subdirectory} does not exist`);
    //     return result;
    // }

}
