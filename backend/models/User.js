const mongoose=require('mongoose');module.exports=mongoose.model('User',new mongoose.Schema({name:String,email:{type:String,unique:true},passwordHash:String},{timestamps:true}));
