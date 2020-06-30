// Dependencies
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const SALT_ROUND = process.env.SALT_ROUND || 10;


// Connection
const MONGO_URL = process.env.MONGO_URL;

// Database Name
const DB_NAME = 'venuespaces';

// Collections Name
const COLLECTIONS = {
    OWNERS: 'owners',
};

// Create a new MongoClient
const client = new MongoClient(MONGO_URL, { useUnifiedTopology: true });


const seedAdminOwner = async () => {
    const connection = await client.connect();
    const Owners = connection.db(DB_NAME).collection('owners');
    try {
        await Owners.drop();
    } catch(err) {
        await connection.db(DB_NAME).createCollection('owners');
    }

    await Owners.insertOne({
        name: 'Admin Ryan',
        email: 'admin@admin.com',
        password: bcrypt.hashSync('admin123', bcrypt.genSaltSync(SALT_ROUND)),
        createdAt: new Date(),
        updatedAt: new Date()
    });
    client.close();
};

seedAdminOwner();

