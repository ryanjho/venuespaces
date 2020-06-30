const venueRepository = require('../repositories/venueRepository');

module.exports = {
    async renderHomePage(req, res) {
        try {
            const venues = await venueRepository.getAll();
            return res.render('index.ejs', { venues });
        } catch(err) {
            return res.render('errors/404', { err });
        }
    },
    renderLogin(req, res) {
        return res.render('login.ejs');
    },
    renderSignup(req, res) {
        return res.render('signup.ejs');
    }
}