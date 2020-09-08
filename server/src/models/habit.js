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
    everyday: Boolean, 
    everydayOnlyWeekdays: Boolean
})

const Habit = mongoose.model('Habit', habitSchema); 

module.exports = Habit; 