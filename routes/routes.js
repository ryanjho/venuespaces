const venueController = require('../controllers/venueController');
const ownerController = require('../controllers/ownerController');
const userController = require('../controllers/userController');
const sessionsOwnerController = require('../controllers/sessionsOwnerController');
const sessionsUserController = require('../controllers/sessionsUserController');
const enquiryController = require('../controllers/enquiryController');
const appController = require('../controllers/appController');
const venueRespository = require('../repositories/venueRepository');
const venueRepository = require('../repositories/venueRepository');

module.exports = (app) => {

    // App Routes
    app.get('/', appController.renderHomePage);
    app.get('/login', appController.renderLogin);
    app.get('/signup', appController.renderSignup);
    app.post('/enquiries', enquiryController.createNewEnquiry);

    // Venue Routes
    app.get('/venues/new', venueController.renderCreateVenue);
    app.get('/venues/:subdirectory', venueController.showVenue);
    

    // Owner Routes
    app.get('/owners/new', ownerController.renderCreateOwner);
    app.get('/owners/login', sessionsOwnerController.renderOwnerLogin);
    
    app.post('/owners', ownerController.createNewOwner);
    app.post('/sessions/owners', sessionsOwnerController.createNewSession);
    


    // User Routes
    app.get('/users/new', userController.renderCreateUser);
    app.get('/users/login', sessionsUserController.renderUserLogin);
    
    app.post('/sessions/users', sessionsUserController.createNewSession)
    app.post('/users', userController.createNewUser);


    app.use((req, res, next) => {
        if (req.session.currentUser || req.session.currentOwner) {
            next();
        } else {
            return res.redirect('/');
        }
    });

    app.get('/owners/dashboard', ownerController.renderOwnerDashboard);
    app.get('/users/dashboard', userController.renderUserDashboard);

    
    app.get('/venues/:subdirectory/edit', venueController.renderEditVenue);
    app.get('/owners/my-venues', venueController.showOwnerVenues);
    app.post('/venues', venueController.createNewVenue);
    app.put('/venues/:subdirectory', venueController.updateVenue);
    app.delete('/venues/:subdirectory', venueController.deleteVenue);
    
    // Delete Current Session
    app.delete('/sessions/owners', sessionsOwnerController.destroyCurrentSession);
    app.delete('/sessions/users', sessionsUserController.destroyCurrentSession);

    
};