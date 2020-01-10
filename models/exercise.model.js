import mongoose,{Schema} from 'mongoose';

const exerciseSchema = new Schema({
    userId:{
        type:String,
        required: function(){return this.userId != null; }
    },
    description:{
        type:String,
        enum:['Cardio','Weights','BenchPress'],
        required:function(){return this.description!=null; }
    },
    duration:{
        type:Number,
        required: function(){ return this.duration != 0; }
    },
    date:{
        type:Date,
        required:true
    }
});

var Exercise = mongoose.model('Exercise',exerciseSchema);
export default Exercise;