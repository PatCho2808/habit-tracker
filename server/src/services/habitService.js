const Habit = require('../models/habit');

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
        console.log(user);
        const habits = await Habit.find({ "userId": user.id });
        return habits;
    } catch (error) {
        throw error;
    }
};

const addDateToHabit = async (habitId, newDates) => {
    let habit = await Habit.findById(habitId);
    newDates.forEach(date => {
        let newDate = new Date(date);
        newDate.setHours(0);
        newDate.setMinutes(0);
        newDate.setSeconds(0);
        newDate.setMilliseconds(0);
        habit.doneAt.push(newDate.getTime())
    });
    const savedHabit = await habit.save();
    return savedHabit;
};

module.exports = {
    createHabit,
    getAllHabitsByUser,
    addDateToHabit
}