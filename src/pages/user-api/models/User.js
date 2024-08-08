const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Car' }],
    history: [{ type: Schema.Types.ObjectId, ref: 'Car' }],
});

// Middleware to hash password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
    console.log('Comparing passwords');
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        console.log('Password match result:', isMatch);
        return isMatch;
    } catch (err) {
        console.log('Error comparing passwords:', err);
        throw new Error('Error comparing passwords');
    }
};

const User = mongoose.model('User', UserSchema);
module.exports = User;

