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
    // habit.doneAt = ["2020-09-09T12:35:33.783+00:00"]; 
    // habit.doneAt.forEach( done => {
    //     console.log(done.getTime() === new Date("2020-09-09T12:35:33.783+00:00").getTime()); 
    //     if(done == new Date("2020-09-09T12:35:33.783+00:00")){
    //         console.log("true"); 
    //     }
    // })
    newDates.forEach(date => {
        habit.doneAt.forEach(oldDate => {
            const newDate = new Date(date);
            if (oldDate.getFullYear() === newDate.getFullYear() &&
                oldDate.getMonth() === newDate.getMonth() &&
                oldDate.getDate() === newDate.getDate()) {
                throw new Error("Date already exists");
            }
        })
        habit.doneAt.push(date)
    });
    const savedHabit = await habit.save();
    return savedHabit.doneAt;
};

module.exports = {
    createHabit,
    getAllHabitsByUser,
    addDateToHabit
}