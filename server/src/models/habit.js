const mongoose = require('mongoose'); 

const habitSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    description: String, 
    startDate: {
        type: Date, 
        required: true, 
        default: new Date()
    }, 
    weekdays: {
        type: [Number], 
        required: true
    }, 
    userId: {
        type: String, 
        required: true
    }, 
    doneAt: {
        type: [Date], 
        default: []
    }, 
    currentStreak: Number, 
    longestStreak: Number
}, { timestamps : true}); 

const Habit = mongoose.model('Habit', habitSchema); 

module.exports = Habit; 