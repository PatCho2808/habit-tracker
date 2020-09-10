const Habit = require('../models/habit');

const createHabit = async habit => {
    habit.weekdays = convertWeekdaysToNumbers(habit.weekdays);
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

const getAllHabits = async () => {
    try {
        const habits = await Habit.find({});
        return habits; 
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createHabit,
    getAllHabits
}