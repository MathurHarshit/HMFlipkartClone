import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true,
        min:5,
        max:20
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        min:5,
        max:20
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true,
        lowercase:true
    },
    mobilenumber:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true

    }
});

const User=mongoose.model('user',userSchema);
export default User;