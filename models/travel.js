const {default: mongoose}=require("mongoose");

const Schema=mongoose.Schema;

const travelSchema=new Schema({
    name: String, 
    email: {type:String,required:true},
    username: String, 
    password: {type:String, required:true}
});

module.exports=mongoose.model('travel', travelSchema)