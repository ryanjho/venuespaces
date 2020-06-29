const db = require('../db/index');
const bcrypt = require('bcrypt');
const SALT_ROUND = process.env.SALT_ROUND || 10;

db.owners.insertOne({
    
})