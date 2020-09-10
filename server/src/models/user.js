const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, 
        minlength: 3, 
        maxlength: 30
    },
    password: {
        type: String,
        required: true, 
        minlength: 6
    }
}, { timestamps: true });

userSchema.pre('save', function(next){
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

userSchema.methods.comparePassword = function(candidatePassword, next){
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (error) {
            return next(err);
        }
        next(null, isMatch);
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User; 