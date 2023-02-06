const mongoose = require("mongoose")
// const ObjectId = mongoose.Schema.Types.ObjectId
const uuid = require("uuid")

const cardschema = new mongoose.Schema({
    cardNumber:{
        type: String,
        required:true
    },
    cardType : {
        type: String,
        enum:["regular","special"],
        required:true
    },
    customerName : {
        type: String,
        required:true
    },
    vision : {
        type: String,
        required:true
    },
    customerID : {
        type: String,
        ref:"Customer"
    },
    status : {
        type: String,
        enum : ["ACTIVE","INACTIVE"],
        default:"ACTIVE"
    }, 
     isdeleted : {
        type: Boolean,
        default:false
    },
    deletedAt : {
        type:Date,
        default:null
    }
},{timestamps:true})

module.exports = mongoose.model("Card",cardschema)