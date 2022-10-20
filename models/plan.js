const {default: mongoose}=require("mongoose");

const Schema=mongoose.Schema;

const planSchema=new Schema({
    title: {type:String, required:true},
    destination_name: {type:String, required:true},
    num_of_days:{type:String, required:true},
    desc: {type:String}
})

module.exports=mongoose.model('plan', planSchema)