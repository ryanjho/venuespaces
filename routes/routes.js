const venueController = require('../controllers/venueController');
const ownerController = require('../controllers/ownerController');
const sessionsOwnerController = require('../controllers/sessionsOwnerController');

module.exports = (app) => {
    app.get('/', venueController.getAllVenues);
    
    app.post('/venues', venueController.createNewVenue);
    app.put('/venues/:subdirectory', venueController.updateVenue);
    app.delete('/venues/:subdirectory', venueController.deleteVenue);

    app.get('/owners/new', ownerController.renderCreateOwner);
    
    app.get('/owners/dashboard', ownerController.renderOwnerDashboard);
    app.post('/owners', ownerController.createNewOwner);

    app.get('/owners/login', sessionsOwnerController.renderOwnerLogin);
    app.post('/sessions/owners', sessionsOwnerController.createNewSession);
    app.delete('/sessions', sessionsOwnerController.destroyCurrentSession);

    app.use((req, res, next) => {
        if (req.session.currentUser) {
            next();
        } else {
            return res.redirect('/');
        }
    });

    app.get('/venues/new', venueController.renderCreateVenue);
    app.get('/venues/:subdirectory', venueController.showVenue);
    app.get('/venues/:subdirectory/edit', venueController.renderEditVenue);
    
};