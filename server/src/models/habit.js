const mongoose = require('mongoose');
const timeService = require('../services/timeService');
const rewardSchema = require('./reward')
const { getLastStreak } = require('./../services/streakService');

const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    startDate: {
        type: Date,
        required: true,
        default: timeService.getCurrentDate()
    },
    weekdays: {
        type: [Number],
        required: true
    },
    userId: {
        type: mongoose.ObjectId,
        required: true
    },
    doneAt: {
        type: [Number],
        default: [],
        validate: function (dates) {
            if (new Set(dates).size !== dates.length) {
                throw new Error("Dates have to be unique");
            }
            const firstDate = timeService.getDateFromDateString(dates[dates.length - 1]);
            if (firstDate < this.startDate.getTime()) {
                throw new Error("Date cannot be lesser than startDate");
            }
            const lastDate = timeService.getDateFromDateString(dates[0]);
            if (lastDate > timeService.getCurrentTime()) {
                throw new Error("Date cannot be greater than today");
            }
        }
    },
    currentStreak: {
        type: Number,
        default: 0
    },
    longestStreak: {
        type: Number,
        default: 0
    },
    rewards: [rewardSchema]
}, { timestamps: true });

habitSchema.virtual('doneAtDates').get(function () {
    return this.doneAt.map(el => {
        return new Date(el);
    });
});

habitSchema.methods.addReward = async function (reward) {
    this.rewards.push(reward);
};

habitSchema.methods.addDoneAt = async function (date) {
    const weekday = timeService.getDayOfWeek(date); 
    if (!this.weekdays.includes(weekday)) {
        throw new Error('Invalid weekday');
    }
    this.doneAt.push(timeService.getDateFromDateString(date));
};

habitSchema.methods.updateStreaks = function () {
    this.sortDoneAt();

    const lastStreak = getLastStreak(this.doneAt.map( date => new Date(date)), this.weekdays); 
    console.log('dates: ', this.doneAt, 'last streak: ', lastStreak); 
    this.currentStreak = lastStreak;
    if (this.currentStreak > this.longestStreak) {
        this.longestStreak = this.currentStreak;
    }

    this.updateRewards();
};

habitSchema.methods.sortDoneAt = function () {
    this.doneAt.sort((a, b) => {
        return b - a;
    });
};

habitSchema.methods.updateRewards = function () {
    this.rewards.forEach(reward => {
        if (!reward.done && reward.requiredStreak <= this.currentStreak) {
            reward.done = true;
        }
    });
};

habitSchema.pre('save', function (next) {
    let habit = this;
    if (!habit.isModified('doneAt')) return next();
    habit.updateStreaks();
    next();
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit; 