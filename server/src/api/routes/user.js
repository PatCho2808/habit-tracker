const router = require('express').Router(); 
const controller = require('../controllers/userController.js'); 

router.post('/create', controller.createUser); 
router.post('/gettoken', controller.getToken); 

module.exports = router; 