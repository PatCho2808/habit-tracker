const mongoose = require('mongoose');
const { db_url } = require('../config');
const Habit = require('../models/habit');

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const createHabit = async (name, description, startDate, everyday, everydayOnlyWeekdays) => {
    const newHabit = new Habit({ name, description, startDate, everyday, everydayOnlyWeekdays });
    return newHabit.save();
};

module.exports = {
    createHabit
}

