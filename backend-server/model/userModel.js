import mongoose from "mongoose";


const backendApiSchema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },

      createdAt:{
        type:Date,
        default:Date.now()
    }
})
export const User=mongoose.model('User',backendApiSchema)