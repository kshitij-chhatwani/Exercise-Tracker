import exerciseController from '../controllers/exerciseController';

var express = require('express');
var router = express.Router();

router.use(function(request,response,next){
    next()
});

router.post('/add-exercise',exerciseController.add_exercise);
router.get('/logs/:userId/:fromDate?/:toDate?',exerciseController.get_user_logs);

module.exports = router;