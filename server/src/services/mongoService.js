const mongoose = require('mongoose');
const { db_url } = require('../config');
const habit = require('../models/habit');

mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true });

const createHabit = async (title, description, startDate, everyday, everydayOnlyWeekdays) => {
    const newHabit = new Habit({ title, description, startDate, everyday, everydayOnlyWeekdays });
    return newHabit.save();
};

module.exports = {
    createHabit
}

