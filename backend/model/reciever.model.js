import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name:{type:String,required:true},
    description:{type:String,required:true},
    state:{type:String,required:true,enum:["approved","pending","deleted"],default:"pending"},
    location:{type:String,required:true},
});

const Receiver = mongoose.model("Receiver", requestSchema);

export default Receiver;