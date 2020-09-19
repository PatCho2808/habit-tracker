const habitService = require('../../services/habitService');

const createHabit = async (req, res, next) => {
    const body = req.body;
    try {
        const newHabitId = await habitService.createHabit(body, req.user);
        res.json({
            "_id": newHabitId
        });
    } catch (error) {
        return next(error);
    }
};

const getAllHabits = async (req, res, next) => {
    try {
        const habits = await habitService.getAllHabitsByUser(req.user);
        const json = habits.map(habit => {
            return getHabitJson(habit);
        });
        res.json(json);
    } catch (error) {
        return next(error);
    }
}

const updateHabit = async (req, res, next) => {
    const body = req.body;
    try {
        const habit = await habitService.getHabitById(req.params.id, req.user.id); 
        const updatedHabit = await habitService.updateHabit(habit, body);  
        res.json(getHabitJson(updatedHabit));
    } catch (error) {
        if(error.code) {
            res.statusCode = error.code;
        }
       return next(error);
    }
};

const getHabitById = async (req, res, next) => {
    try {
        const habit = await habitService.getHabitById(req.params.id, req.user.id);
        res.json(getHabitJson(habit)); 
    } catch (error) {
        if(error.code) {
            res.statusCode = error.code;
        }
       return next(error);
    }
}; 

const deleteHabitById = async (req, res, next) => {
    try {
        await habitService.deleteHabitById(req.params.id); 
        getAllHabits(req, res, next); 
    } catch (error) {
        return next(error); 
    }
}; 

const getHabitJson = habit => {
    return {
        "_id": habit.id,
        "name": habit.name,
        "dates": habit.doneAtDates,
        "currentStreak": habit.currentStreak,
        "longestStreak": habit.longestStreak, 
        "rewards": habit.rewards
    }
}

module.exports = {
    createHabit,
    getAllHabits,
    updateHabit, 
    getHabitById, 
    deleteHabitById, 
}