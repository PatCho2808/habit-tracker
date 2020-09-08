const mongoose = require('mongoose');
const { db_url } = require('../config');
const Habit = require('../models/habit');

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const createHabit = async (name, description, startDate, weekdays) => {
    const newHabit = new Habit({ name, description, startDate, weekdays });
    return newHabit.save();
};

const getAllHabits = async () => {
    return Habit.find({}); 
}

module.exports = {
    createHabit, 
    getAllHabits
}

