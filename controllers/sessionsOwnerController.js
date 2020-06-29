const ownerRespository = require('../repositories/ownerRepository');
const bcrypt = require('bcrypt');

module.exports = {
    renderOwnerLogin (req, res) {
        return res.render('sessions/owners/new.ejs');
    },
    async createNewSession(req, res) {
        try {
            const owner = await ownerRespository.findOneOwner(req.body.email);
            if (bcrypt.compareSync(req.body.password, owner.password)) {
                req.session.currentUser = owner;
                return res.redirect('/owners/dashboard');
            } else {
                throw new Error('Invalid email or password');
            }
        } catch(err) {
            return res.render('errors/404.ejs', { err });
        }
    }, 
    destroyCurrentSession(req, res) {
        req.session.destroy(() => {
            return res.redirect('/');
        });   
    }
}