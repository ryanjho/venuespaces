// Dependencies
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const db = require('./db/index');
require('dotenv').config();

// Port Information
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded( {extended: false }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// Connect to Database
db.connect()

// Routes
require('./routes/routes.js')(app);


// Listening
app.listen(port, () => {
    console.log(`Server started at PORT ${port}`);
})