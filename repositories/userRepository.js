const db = require('../db/index');
const bcrypt = require('bcrypt');
const SALT_ROUND = process.env.SALT_ROUND || 10;

module.exports = {
    async createNewUser(newUser) {
        try {
            const checkUser = await db.users.findOne({ email: newUser.email });
            if (checkUser) throw new Error('User account with this email address already exists');
            newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(SALT_ROUND));
            const result = await db.users.insertOne(newUser);
            const insertedUser = result.ops[0];
            if (!result.insertedCount) throw new Error('User insertion failure');
            return insertedUser;
        } catch(err) {
            throw new Error(`Due to ${err.message}, you are not allowed to add this user ${JSON.stringify(newUser)}`);
        }
    },
    async findOneUserByEmail(userEmail) {
        const user = await db.users.findOne({ email: userEmail });
        if (!user) throw new Error(`User with email address ${userEmail} does not exist`);
        return user;
    },
    async findOneUserById(userId) {
        if (userId === 'testuser') return this.findOneUserByEmail('testuser@users.com');
        const user = await db.users.findOne({ _id: userId });
        if (!user) throw new Error(`User with ID ${userId} does not exist`);
        return user;
    }

};