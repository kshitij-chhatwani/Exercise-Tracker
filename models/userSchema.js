import mongoose, {Schema} from 'mongoose';

const UserSchema = new Schema({
    Username : {
        type:String,
        required: function(){return this.userName != null; }
    },
    Password: {
        type:String,
        required: function(){ return this.Password != null;}
    }
});

var userAuthSchema = mongoose.model('userAuthSchema',UserSchema);
export default userAuthSchema;