const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

userSchema.pre('save', next => {
    let user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.hash(user.password, 10)
        .then(hashedPassword => {
            user.password = hashedPassword;
            next();
        })
}, err => {
    next(err);
});

userSchema.methods.comparePassword = (candidatePassword, next) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (error) {
            return next(err);
        }
        next(null, isMatch);
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User; 