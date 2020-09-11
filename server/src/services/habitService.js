const Habit = require('../models/habit');
const timeSerice = require('./timeService'); 

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

const getHabitById = async(habitId, userId) => {
    const habit = await Habit.findById(habitId);
    if(habit.userId !== userId){
        throw new Error('User id do not match'); 
    } 
    return habit; 
};

const addDateToHabit = async (habit, newDates) => {
    newDates.forEach(date => {
        let newDate = timeService.setTimeToZero(new Date(date));
        habit.doneAt.push(newDate.getTime())
    });
    const savedHabit = await habit.save();
    return savedHabit;
};

const addReward = async (habit, reward) => {
    console.log(habit); 
    habit.rewards.push(reward); 
    const savedHabit = await habit.save(); 
}; 

const updateHabit = async (habitId, userId, body) => {
    const habit = await getHabitById(habitId, userId); 
    const savedHabit = await habit.addReward(body.reward[0]);
    return savedHabit;  
}

module.exports = {
    createHabit,
    getAllHabitsByUser,
    getHabitById,
    addDateToHabit, 
    updateHabit
}