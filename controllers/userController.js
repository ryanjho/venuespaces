const userRepository = require('../repositories/userRepository');
const enquiryRepository = require('../repositories/enquiryRepository');
const venueRepository = require('../repositories/venueRepository');
const { validate } = require('../validators/usersValidator');
const ObjectId = require('mongodb').ObjectID

module.exports = {
    renderCreateUser(req, res) {
        res.render('users/new.ejs');
    },
    async createNewUser(req, res) {
        try {
            validate(req.body);
            const newUser = await userRepository.createNewUser(req.body);
            req.session.currentUser = newUser;
            res.redirect('/users/dashboard');
        } catch(err) {
            res.render('errors/404.ejs', { err });
        }
    },
    async renderUserDashboard(req, res) {
        if (req.session.currentUser) {
            const enquiriesWithVenue = [];
            const enquiries = await enquiryRepository.getEnquiriesByUser(req.session.currentUser);
            
            for await (const enquiry of enquiries ) {
                const venue = await venueRepository.getOneVenueById(enquiry.venueId);
                enquiriesWithVenue.push([enquiry, venue]);
            }
            return res.render('users/index.ejs', { user: req.session.currentUser, enquiriesWithVenue: enquiriesWithVenue });
        } else {
            res.redirect('/users/login');
        }
    }
}