import mongoose from 'mongoose';
import {request,response} from 'express';
import User from '../models/user.model';

exports.add_user = async function(request,response){

    var userCheck = await User.findOne({UserName:request.body.UserName});

    console.log("UserCheck :"+userCheck);

    if(!userCheck){
        const new_user = new User(request.body);
        new_user.save( (err,data)=>{
            if(err){ response.send(err);}
            
            response.json(data);
        });    
    }
    else{
        console.log("User Already Exists")
        response.send(404);
    }  
};


