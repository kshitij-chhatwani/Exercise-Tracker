import mongoose from 'mongoose';
import Exercise from '../models/exercise.model';
import User from '../models/user.model';

exports.add_exercise = async function(request,response){
    
    const new_exercise = new Exercise(request.body);
    const userExists = await User.exists({UserName : request.body.userId});

    //Check if user exists and add exercise log if true else return error.
    if(userExists){
        new_exercise.save( (err,data) =>{
            if(err) response.send(err);
            response.json(data);
        });
    }
    //No check implemented for invalid user since code in react would handle that.
};


exports.get_user_logs = function(request,response){

    var query = Exercise.find({userId : request.params.userId});
    if(request.params.fromDate == undefined || request.params.toDate == undefined){
        query.find((err,result)=>{
            if(err) {response.send(err);}
            response.json(result);
        });
    }
    else{
        query.find({date : { $gte: Date.parse(request.params.fromDate) , $lt: Date.parse(request.params.toDate)}},(err,data)=>{
                    if(err) response.send(err);
                    response.json(data);
        });
    }

};
