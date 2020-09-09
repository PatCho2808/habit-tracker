const mongoose = require('mongoose');
const { db_url } = require('../config');

const Habit = require('../models/habit');
const User = require('../models/user'); 

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

const createUser = async (user) => {
    const newUser = new User(user);
    return newUser.save();  
}; 

module.exports = {
    createHabit, 
    getAllHabits, 
    createUser
}

