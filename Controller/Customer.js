const CustomerModel = require("../Model/Customer");
const mongoose = require('mongoose')
const Objectid = mongoose.Types.ObjectId.isValid
const moment = require("moment")
const {
  isPresent,
  isValidName,
  isValidEmail,
  isValidPhone,
  isValidadd
} = require("../Validation/validation");

const CreateCustomer = async (req, res) => {
  try {
    let data = req.body;
    const {firstName,lastName,mobileNumber,DOB,emailID,address,customerID,status} = data

    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Please Enter data to Create the customer" })

// firstname validation

if (!isPresent(firstName)) return res.status(400).send({ status: false, message: "firstname is mandatory" })
if (!isValidName(firstName)) return res.status(400).send({ status: false, message: "Please Provide the valid firstname" })

if (!isPresent(lastName)) return res.status(400).send({ status: false, message: "lastname is mandatory" })
if (!isValidName(lastName)) return res.status(400).send({ status: false, message: "Please Provide the valid lastname" })

if (!isPresent(emailID)) return res.status(400).send({ status: false, message: "email is mandatory" })
if (!isValidEmail(emailID)) return res.status(400).send({ status: false, message: "email should be in  valid format eg:- name@gmail.com" })

if (await CustomerModel.findOne({ emailID:emailID,isdeleted:false })) return res.status(400).send({ status: false, message: "This email is already Registered Please give another Email" })

if (!isPresent(mobileNumber)) return res.status(400).send({ status: false, message: "mobileNumber is mandatory" })
if (!isValidPhone(mobileNumber)) return res.status(400).send({ status: false, message: "please provide Valid mobileNumber Number with 10 digits starts with 6||7||8||9" })

if (await CustomerModel.findOne({ mobileNumber:mobileNumber,isdeleted:false })) return res.status(400).send({ status: false, message: "This mobileNumber is already Registered Please give another Phone" })

if (!isPresent(address)) return res.status(400).send({ status: false, message: "Address is mandatory" })
if (!isValidadd(address)) return res.status(400).send({ status: false, message: "address containt only these letters [a-zA-Z0-9_ ,.-]" })

if (!isPresent(status)) return res.status(400).send({ status: false, message: "status is mandatory" })
if(!(status == "ACTIVE" || status == "INACTIVE")) return res.status(400).send({status:false,message:"please enter status only ACTIVE or INACTIVE in capital words"})

// if (!isPresent(customerID)) return res.status(400).send({ status: false, message: "customerid is mandatory" })
// if (await CustomerModel.findOne({ customerID:customerID,isdeleted:false })) return res.status(400).send({ status: false, message: "This customerID is already present please write another one" })


if(!DOB) return res.status(400).send({ status: false, message: "dob is mandatory" })
// (date only 2000) acceptable without true
// with true only (format 2000-11-26) acceptable
if (!moment(DOB, 'YYYY-MM-DD',true).isValid()) return res.status(400).send({ status: false, msg: "Plz write DOB in Valid format YYYY-MM-DD" })

    let customer = await CustomerModel.create(data);
    return res.status(201).send({ status: true, data: customer });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const GetCustomer = async (req, res) => {
  try {
    let customer = await CustomerModel.find({
      status: "ACTIVE",
      isdeleted: false,
    });
    if(customer.length==0) return res.status(404).send({status:false,message:"no customer found"})
    return res.status(200).send({ status: true, data: customer });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const DeleteCustomer = async (req, res) => {
  try {
    let id = req.params.id
    if (!Objectid(id)) {
        return res.status(400).send({ status: false, message: "please enter correct customer id" })
    }
    const findUseridInDb = await CustomerModel.findOne({_id:id,isdeleted:false})
    if (!findUseridInDb) {
        return res.status(404).send({ status: false, message: "customer is not found" })
    }
    let customer = await CustomerModel.findByIdAndUpdate(
      { _id: id },
      { $set: { isdeleted: true, deletedAt: Date.now() } },
      {new:true}
    );
    return res.status(200).send({ status: true, message:"data deleted successfully" });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { CreateCustomer, GetCustomer, DeleteCustomer };
