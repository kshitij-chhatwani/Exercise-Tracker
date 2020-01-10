import usercontroller from '../controllers/userController';
var express = require('express');
var router = express.Router();

router.use(function(request,response,next){
    next()
});

router.post('/add-user',usercontroller.add_user);

module.exports = router;
