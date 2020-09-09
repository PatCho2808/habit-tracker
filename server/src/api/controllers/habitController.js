const mongoService = require('../../services/mongoService');

const createHabit = (req, res, next) => {
    const body = req.body;
    if(!body.weekdays) {
        throw new Error('Weekdays cannot be empty');
    }
    const weekdays = req.body.weekdays.map( el => {
        const weekday = el.toLowerCase(); 
        if( weekday === 'monday') return 0; 
        if( weekday === 'tuesday') return 1; 
        if( weekday === 'wednesday') return 2; 
        if( weekday === 'thursday') return 3; 
        if( weekday === 'friday') return 4; 
        if( weekday === 'saturday') return 5; 
        if( weekday === 'sunday') return 6; 
    }); 
    const promise = mongoService.createHabit(body.name, body.description, body.startDate, weekdays);
    promise.then(newHabit => {
        res.json({
            "id": newHabit.id
        });
    })
        .catch(err => next(err));
};

const getAllHabits = (req, res, next) => {
    mongoService.getAllHabits()
        .then(data => res.json(data))
        .catch(err => next(err));
}


module.exports = {
    createHabit,
    getAllHabits
}