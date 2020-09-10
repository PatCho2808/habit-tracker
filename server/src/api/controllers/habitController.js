const habitService = require('../../services/habitService');

const createHabit = async (req, res, next) => {
    const body = req.body;
    try {
        const newHabitId = await habitService.createHabit(body, req.user);
        res.json({
            "id": newHabitId
        })
    } catch (error) {
        return next(error);
    }
};

const getAllHabits = async (req, res, next) => {
    try {
        const habits = await habitService.getAllHabitsByUser(req.user); 
        res.json(habits); 
    } catch (error) {
        next(error); 
    }
}

const updateHabit = async (req, res, next) => {
    try {
        const habit = await habitService.addDateToHabit(req.params.id, req.body.date); 
        res.json({habit}); 
    } catch (error) {
        next(error); 
    }
}; 

module.exports = {
    createHabit,
    getAllHabits, 
    updateHabit
}