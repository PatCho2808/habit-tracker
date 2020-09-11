const mongoose = require('mongoose');
const timeService = require('../services/timeService'); 

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
        type: [Number],
        default: [],
        validate: dates => {
            if (new Set(dates).size !== dates.length) {
                throw new Error("Dates have to be unique");
            }
        }
    },
    currentStreak: {
        type: Number,
        default: 0 
    },
    longestStreak:{
        type: Number, 
        default: 0
    }
}, { timestamps: true });

habitSchema.pre('save', function (next) {
    let habit = this;
    if (!habit.isModified('doneAt')) return next();
    habit.doneAt.sort((a, b) => {
        return b - a;
    });
    next();
});

habitSchema.pre('save', function (next) {
    let habit = this;
    if (!habit.isModified('doneAt')) return next();
    const lastDate = habit.doneAt[0];
    let streak = 0;
    if (lastDate === timeService.getCurrentTime()) {
        streak = 1 + computeCurrentStreak(habit.doneAt); 
    }
    habit.currentStreak = streak;
    if (habit.currentStreak > habit.longestStreak) {
        habit.longestStreak = habit.currentStreak;
    }
    next();
});


const computeCurrentStreak = dates => {
    let streak = 0; 
    for (let i = 1; i < dates.length; i++) {
        const prevDate = new Date(dates[i - 1]);
        prevDate.setDate(prevDate.getDate() - 1);
        if (dates[i] === prevDate.getTime()) {
            streak++;
        } else {
            break;
        }
    }
    return streak; 
};

habitSchema.virtual('doneAtDates').get(function(){
    return this.doneAt.map( el => {
        return new Date(el); 
    });
}); 

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit; 