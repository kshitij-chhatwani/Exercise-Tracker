import userAuthSchema from '../models/userSchema';
import bcrpyt from 'bcrypt';
const jwt = require('jsonwebtoken');
const settings = require('../config/settings');

exports.register_user = async function(request,response){
    try{
        request.body.Password = bcrpyt.hashSync(request.body.Password,10);
        var userExists = await userAuthSchema.findOne({Username:request.body.Username}).exec();
        if(!userExists){
            var user = new userAuthSchema(request.body);
            var result = await user.save();
            response.status(200).send({message:"User created"});    
        }
        else {
            response.status(403).send({message:"User already exists!"});
        }
    } catch(error){
        response.status(500).send(error);
    }
};

exports.login_user = async function(request,response){
    try{
        var user = await userAuthSchema.findOne( { Username : request.body.Username}).exec();
        console.log("Request :"+request.body.Password +", user password :"+user.Password);
        if(!user){
            response.status(400).send({"message":"The username does not exist"});
            console.log("user");
        }
        if(!bcrpyt.compare(request.body.Password , user.Password)){
            console.log("Wrong password ");
            response.status(400).send({"message":"The password entered is incorrect"});
        }
        //If username and password are correct, generate a token.
        var token = jwt.sign( user.toJSON(), settings.secret);
        // response.status(200).send({success: true, token: 'JWT ' + token});
        response.status(200).json({ 
            success : true,
            token : 'JWT'+token,
        })
        console.log("token :"+token);
    }
    catch(error){ 
        console.log("Errpr :"+error);
        response.status(500).send(error);
    }
};

