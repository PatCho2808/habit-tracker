const router = require('express').Router(); 
const controller = require('../controllers/habitController'); 

router.get('/all', controller.getAllHabits);
router.post('/create', controller.createHabit); 

module.exports = router; 