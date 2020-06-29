const db = require('../db/index');
const bcrypt = require('bcrypt');
const SALT_ROUND = process.env.SALT_ROUND || 10;

module.exports = {
    async createNewOwner(newOwner) {
        try {
            newOwner.pw = newOwner.password;
            newOwner.password = bcrypt.hashSync(newOwner.password, bcrypt.genSaltSync(SALT_ROUND));
            const { insertedCount } = await db.owners.insertOne(newOwner);
            if (!insertedCount) throw new Error('Owner insertion failure');
            return true;
        } catch(err) {
            throw new Error(`Due to ${err.message}, you are not allowed to add this user ${JSON.stringify(newOwner)}`);
        }
    },
    async findOneOwner(ownerEmail) {
        const owner = await db.owners.findOne({ email: ownerEmail });
        if (!owner) throw new Error(`User with email address ${ownerEmail} does not exist`);
        return owner;
    }
};