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
    USERS: 'users',
};

// Create a new MongoClient
const client = new MongoClient(MONGO_URL, { useUnifiedTopology: true });


const seedUser = async () => {
    const connection = await client.connect();
    const Users = connection.db(DB_NAME).collection('users');
    try {
        await Users.drop();
    } catch(err) {
        await connection.db(DB_NAME).createCollection('users');
    }

    await Users.insertOne({
        name: 'User 123',
        email: 'user123@users.com',
        password: bcrypt.hashSync('user123', bcrypt.genSaltSync(SALT_ROUND)),
        createdAt: new Date(),
        updatedAt: new Date()
    });
    client.close();
};

seedUser();

