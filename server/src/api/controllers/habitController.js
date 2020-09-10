const habitService = require('../../services/habitService');

const createHabit = async (req, res, next) => {
    const body = req.body;
    try {
        const newHabitId = await habitService.createHabit(body);
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


module.exports = {
    createHabit,
    getAllHabits
}