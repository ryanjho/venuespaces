const venueRepository = require('../repositories/venueRepository');
const { updateVenue } = require('../repositories/venueRepository');

module.exports = {
    async getAllVenues(req, res) {
        try {
            const venues = await venueRepository.getAll();
            return res.render('venues/index.ejs', { venues });
        } catch (err) {
            return res.render('errors/404', { err });
        }
    },
    async showVenue(req, res) {
        try {
            const venue = await venueRepository.showVenue(req.params.subdirectory);
            return res.render('venues/show.ejs', { venue });
        } catch (err) {
            console.log(err);
            return res.render('errors/404', { err });
        }
    },
    renderCreateVenue(req, res) {
        res.render('venues/new');
    },
    async renderEditVenue(req, res) {
        try {
            const venue = await venueRepository.showVenue(req.params.subdirectory);
            return res.render('venues/edit.ejs', { venue });
        } catch (err) {
            return res.render('errors/404', { error });
        }
    },
    async createNewVenue(req, res) {
        try {
            const subdirectory = req.body.name.toLowerCase().split(' ').join('-');
            const newVenue = {
                "name": req.body.name,
                "address": req.body.address,
                "img": req.body.img,
                "price": parseInt(req.body.price),
                "description": req.body.description,
                "subdirectory": subdirectory,
                "owner": req.session.currentUser,
            };
            await venueRepository.createNewVenue(newVenue);
            return res.redirect('/')
        } catch (err) {
            return res.render('errors/404', { err });
        }
    },
    async renderEditVenue(req, res) {
        try {
            const venue = await venueRepository.getOneVenue(req.params.subdirectory);
            res.render('venues/edit.ejs', { venue });
        } catch (err) {
            res.render('errors/404.ejs', { err });
        }
    },
    async updateVenue(req,res) {
        try {
            const venue = req.body;
            venue.subdirectory = req.body.name.toLowerCase().split(' ').join('-');
            await venueRepository.updateVenue(venue, req.params.subdirectory);
            return res.redirect(`/venues/${venue.subdirectory}`);
        } catch(err) {
            res.render('errors/404.ejs', { err });
        }
    },
    async deleteVenue(req,res) {
        try {
            const result = await venueRepository.deleteVenue(req.params.subdirectory);
            res.redirect('/');
        } catch(err) {
            res.render('errors/404.ejs', { err });
        }
    }
}

