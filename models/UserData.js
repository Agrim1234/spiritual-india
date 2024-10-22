import mongoose from "mongoose";

const {Schema, model} = mongoose;

const userDataSchema = new Schema({
    dataId: {type:String},
    title: {type:String, required: true},
    desc: {type:String},
    postTime: {type:String},
    charCount: {type:String}
})

export default mongoose.models?.userData || mongoose.model("userData", userDataSchema, "userData");