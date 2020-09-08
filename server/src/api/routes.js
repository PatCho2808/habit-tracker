const router = require('express').Router(); 
const controller = require('./controllers'); 

router.get('/', controller.getAllHabits);
router.post('/', controller.createHabit); 

module.exports = router; 