const router = require('express').Router(); 
const controller = require('../controllers/habitController'); 
const middlewares = require('../../middlewares'); 

router.use(middlewares.authenticateToken); 

router.get('/all', controller.getAllHabits);
router.post('/create', controller.createHabit); 

module.exports = router; 