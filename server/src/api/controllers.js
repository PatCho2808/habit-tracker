const mongoService = require('../services/mongoService');

const createHabit = (req, res, next) => {
    console.log(req.body); 
    const body = req.body;
    const promise = mongoService.createHabit(body.name, body.description, body.startDate, body.evetyday, body.everydayOnlyWeekdays);
    promise.then( newHabit => {
        res.json({
            "id" : newHabit.id
        }); 
    })
    .catch( err => next(err)); 
};


module.exports = {
    createHabit
}