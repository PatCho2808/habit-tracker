const router = require('express').Router(); 
const controller = require('../controllers/authController.js'); 

router.post('/signup', controller.signup); 
router.post('/gettoken', controller.getToken); 

module.exports = router; 