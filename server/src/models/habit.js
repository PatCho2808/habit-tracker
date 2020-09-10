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

habitSchema.pre('save', function(next){
    let habit = this; 
    if(!habit.isModified('doneAt')) return next(); 
    const lastDate = habit.doneAt[0]; 
    if (getAreDatesEqual(lastDate, new Date())) {
        let streak = 0;
        for (let i = 1; i < habit.doneAt.length; i++) {
            const prevDate = new Date(habit.doneAt[i - 1]); 
            prevDate.setDate(prevDate.getDate() - 1);
            if (getAreDatesEqual(habit.doneAt[i], prevDate)) {
                streak++;
            } else {
                break;
            }
        }
        console.log(streak); 
        habit.currentStreak = streak;
        if (!habit.longestStreak || habit.currentStreak > habit.longestStreak) {
            habit.longestStreak = habit.currentStreak;
        }
    }
    next(); 
}); 

const getAreDatesEqual = (a, b) => {
    console.log(a, b); 
    return (a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate())
};

const Habit = mongoose.model('Habit', habitSchema); 

module.exports = Habit; 