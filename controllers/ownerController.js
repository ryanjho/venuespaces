const ownerRepository = require('../repositories/ownerRepository');
const { validate } = require('../validators/ownersValidator');

module.exports = {
    renderCreateOwner(req, res) {
        res.render('owners/new.ejs');
    },
    async createNewOwner(req, res) {
        try {
            console.log(req.body);
            validate(req.body);
            ownerRepository.createNewOwner(req.body);
            res.redirect('/');
        } catch(err) {
            res.render('errors/404.ejs', { err });
        }
    },
    renderOwnerDashboard(req, res) {
        if (req.session.currentUser) {
            res.render('owners/index.ejs', { owner: req.session.currentUser });
        } else {
            res.redirect('/owners/login');
        }
    }
}