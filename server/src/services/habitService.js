const Habit = require('../models/habit');
const timeSerice = require('./timeService');
const ObjectId = require('mongoose').Types.ObjectId; 

const createHabit = async (habit, user) => {
    habit.weekdays = convertWeekdaysToNumbers(habit.weekdays);
    habit.userId = user.id;
    let newHabit = new Habit(habit);
    try {
        newHabit = await newHabit.save();
        return newHabit.id;
    } catch (error) {
        throw error;
    }
};

const convertWeekdaysToNumbers = weekdays => {
    return weekdays.map(el => {
        const weekday = el.toLowerCase();
        if (weekday === 'monday') return 0;
        if (weekday === 'tuesday') return 1;
        if (weekday === 'wednesday') return 2;
        if (weekday === 'thursday') return 3;
        if (weekday === 'friday') return 4;
        if (weekday === 'saturday') return 5;
        if (weekday === 'sunday') return 6;
    });
}

const getAllHabitsByUser = async (user) => {
    try {
        const userID =  new ObjectId(user.id);
        const query = { "userId": userID }; 
        const habits = await Habit.find(query);
        return habits;
    } catch (error) {
        throw error;
    }
};

const getHabitById = async (habitId, userId) => {
    const habit = await Habit.findById(habitId);
    if (habit.userId != userId) {
        const error = new Error('User id do not match');
        error.code = 401; 
        throw error; 
    }
    return habit;
};

const updateHabit = async (habit, newParams) => {
    if (newParams.name) {
        habit.name = newParams.name; 
    }
    if (newParams.startDate) {
        habit.startDate = newParams.startDate; 
    }
    if (newParams.weekdays) {
        habit.weekdays = newParams.weekdays; 
    }
    if (newParams.rewards) {
        newParams.rewards.forEach(reward => habit.addReward(reward));
    }
    if (newParams.doneAt) {
        newParams.doneAt.forEach(date => habit.addDoneAt(date)); 
    }
    const savedHabit = await habit.save(); 
    return savedHabit;
}

const deleteHabitById = async (habitId) => {
    await Habit.findByIdAndDelete(habitId); 
}

module.exports = {
    createHabit,
    getAllHabitsByUser,
    getHabitById,
    updateHabit, 
    deleteHabitById
}