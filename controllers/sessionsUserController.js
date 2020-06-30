const userRespository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');

module.exports = {
    renderUserLogin (req, res) {
        return res.render('sessions/users/new.ejs');
    },
    async createNewSession(req, res) {
        try {
            const user = await userRespository.findOneUserByEmail(req.body.email);
            if (bcrypt.compareSync(req.body.password, user.password)) {
                req.session.currentUser = user;
                return res.redirect('/users/dashboard');
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