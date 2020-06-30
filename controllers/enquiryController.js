const enquiryRepository = require('../repositories/enquiryRepository');
const ObjectId = require('mongodb').ObjectID

module.exports = {
    async createNewEnquiry(req, res) {
        try {
            const newEnquiry = req.body;
            newEnquiry.venueId = new ObjectId(req.body.venueId);
            newEnquiry.userId = new ObjectId(req.session.currentUser._id);
            await enquiryRepository.createNewEnquiry(newEnquiry);
            res.redirect('/users/dashboard');
        } catch(err) {
            res.render('errors/404.ejs', { err });
        }
    },
    async getEnquiriesByVenue(req, res) {
        try {
            return await enquiryRepository.getEnquiriesByVenue(req.session.currentOwner);
        } catch(err) {
            return res.render('errors/404', { err });
        }
    },
    async getEnquiriesByUser(req, res) {
        try {
            return await enquiryRepository.getEnquiriesByUser(req.session.currentUser);
        } catch(err) {
            return res.render('errors/404', { err });
        }
    }
}