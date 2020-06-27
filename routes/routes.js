const venueController = require('../controllers/venueController');
const db = require('../db/index');

module.exports = (app) => {
    app.get('/', venueController.getAllVenues);
    app.get('/venues/new', venueController.renderCreateVenue);
    app.get('/venues/:subdirectory', venueController.showVenue);
    app.get('/venues/:subdirectory/edit', venueController.renderEditVenue);
    app.post('/venues', venueController.createNewVenue);
    app.put('/venues/:subdirectory', venueController.updateVenue);
    app.delete('/venues/:subdirectory', venueController.deleteVenue);
};