const db = require('../db/index');
const bcrypt = require('bcrypt');
const SALT_ROUND = process.env.SALT_ROUND || 10;

module.exports = {
    async createNewOwner(newOwner) {
        try {
            const checkOwner = await db.owners.findOne({ email: newOwner.email });
            if (checkOwner) throw new Error('Owner account with this email address already exists');
            newOwner.password = bcrypt.hashSync(newOwner.password, bcrypt.genSaltSync(SALT_ROUND));
            const result = await db.owners.insertOne(newOwner);
            const insertedOwner = result.ops[0];
            if (!result.insertedCount) throw new Error('Owner insertion failure');
            return insertedOwner;
        } catch(err) {
            throw new Error(`Due to ${err.message}, you are not allowed to add this owner ${JSON.stringify(newOwner)}`);
        }
    },
    async findOneOwnerByEmail(ownerEmail) {
        const owner = await db.owners.findOne({ email: ownerEmail });
        if (!owner) throw new Error(`Venue Owner with email address ${ownerEmail} does not exist`);
        return owner;
    },
    async findOneOwnerById(ownerId) {
        if (ownerId === 'admin') return this.findOneOwnerByEmail('admin@admin.com');
        const owner = await db.owners.findOne({ _id: ownerId });
        if (!owner) throw new Error(`Venue Owner with ID ${ownerId} does not exist`);
        return owner;
    }

};