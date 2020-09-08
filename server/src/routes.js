const router = require('express').Router(); 

router.get('/', (req, res) => {
    res.json({
        "message": "this is a response"
    })
}); 

module.exports = router; 