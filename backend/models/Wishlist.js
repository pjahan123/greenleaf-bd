const mongoose=require('mongoose');
const schema=new mongoose.Schema({userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',unique:true,required:true},products:[{type:mongoose.Schema.Types.ObjectId,ref:'Product'}],updatedAt:{type:Date,default:Date.now}});
module.exports=mongoose.model('Wishlist',schema);
