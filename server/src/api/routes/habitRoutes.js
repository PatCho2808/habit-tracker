const router = require('express').Router(); 
const controller = require('../controllers/habitController'); 
const middlewares = require('../../middlewares'); 

router.use(middlewares.authenticateToken); 

router.get('/', controller.getAllHabits);
router.post('/', controller.createHabit);
router.patch('/:id', controller.updateHabit);  

module.exports = router; 