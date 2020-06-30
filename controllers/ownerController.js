const ownerRepository = require('../repositories/ownerRepository');
const enquiryRepository = require('../repositories/enquiryRepository');
const venueRepository = require('../repositories/venueRepository');
const { validate } = require('../validators/ownersValidator');

module.exports = {
    renderCreateOwner(req, res) {
        res.render('owners/new.ejs');
    },
    async createNewOwner(req, res) {
        try {
            validate(req.body);
            const newOwner = await ownerRepository.createNewOwner(req.body);
            req.session.currentOwner = newOwner;
            res.redirect('/owners/dashboard');
        } catch(err) {
            res.render('errors/404.ejs', { err });
        }
    },
    async renderOwnerDashboard(req, res) {
        if (req.session.currentOwner) {
            const venues = await venueRepository.getOwnerVenues(req.session.currentOwner);
            // const enquiries = await enquiryRepository.getEnquiriesByVenue(venue);
            res.render('owners/index.ejs', { owner: req.session.currentOwner, venues: venues });
        } else {
            res.redirect('/owners/login');
        }
    }
}