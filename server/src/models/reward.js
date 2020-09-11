const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    requiredStreak: {
        type: Number,
        required: true,
        min: 1,
        max: 365
    }, 
    done: {
        type: Boolean, 
        default: false
    }
});

module.exports = rewardSchema; 