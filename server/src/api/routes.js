const router = require('express').Router(); 
const controller = require('./controllers'); 

router.get('/', (req, res) => {
    res.json({
        "message": "this is a response"
    })
}); 

router.post('/', controller.createHabit); 

module.exports = router; 