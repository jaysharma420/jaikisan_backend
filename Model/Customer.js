const mongoose = require("mongoose")
const uuid = require("uuid")

const customerschema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true
    },
    lastName : {
        type: String,
        required:true
    },
    mobileNumber : {
        type: String,
        required:true,
        unique:true
    },
    DOB : {
        type: Date,
        required:true
    },
    emailID : {
        type: String,
        required:true,
        unique:true
    },
    address : {
        type: String,
        required:true
    },
    customerID : {
        type: String,
        required:true,
        unique:true,
        default:uuid.v4
    },
    status : {
        type: String,
        required:true,
        enum : ["ACTIVE","INACTIVE"]
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

module.exports = mongoose.model("Customer",customerschema)

// var uuid = require('node-uuid');
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// Will add the UUID type to the Mongoose Schema types
// require('mongoose-uuid2').loadType(mongoose);
// var UUID = mongoose.Types.UUID;