import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    role:{type:String,required:true,default:"donner"},
    name:{type:String,required:true},
    userName:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    google_id:{type:String,default:null}
})

const User=mongoose.model("User",userSchema)

export default User;