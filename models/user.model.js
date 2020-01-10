import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema({
    UserName : {
        type: String,
        required:function(){ return this.UserName != null; }
    }
});

var User = mongoose.model('User',userSchema);
export default User;