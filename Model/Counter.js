const mongoose = require("mongoose")

const counterschema = new mongoose.Schema({
    id:String,
    seq:Number
},{timestamps:true})

module.exports = mongoose.model("counter",counterschema)