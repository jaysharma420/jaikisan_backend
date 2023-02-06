const CardModel = require("../Model/Card")
const CounterModel = require("../Model/Counter")
const CustomerModel = require("../Model/Customer");
const uuid = require("uuid")
const {isPresent,isValidName} = require("../Validation/validation")
const createcard = async (req,res)=>{
  try{
    let temp;
    let count = await CounterModel.findOneAndUpdate({id:"jay"},
    {$inc:{seq:1}},
    {new:true})

    if(count==null){
        let counter = await CounterModel.create({id:"jay",seq:1})
        temp = 1
    }
    else{
        temp = count.seq
    }
      carddata = req.body
      const {cardType,customerName,vision,customerID,status} = carddata

      
if (!isPresent(cardType)) return res.status(400).send({ status: false, message: "cardtype is mandatory" })
if(!(cardType == "regular" || status == "special")) return res.status(400).send({status:false,message:"please enter cardType only regular or special"})


if (!isPresent(customerName)) return res.status(400).send({ status: false, message: "customerName is mandatory" })
if (!isValidName(customerName)) return res.status(400).send({ status: false, message: "Please Provide the valid customerName" })

if (!isPresent(vision)) return res.status(400).send({ status: false, message: "vision is mandatory" })

if (!isPresent(status)) return res.status(400).send({ status: false, message: "status is mandatory" })
if(!(status == "ACTIVE" || status == "INACTIVE")) return res.status(400).send({status:false,message:"please enter status only ACTIVE or INACTIVE in capital words"})

if (!isPresent(customerID)) return res.status(400).send({ status: false, message: "customerID is mandatory" })
if (!(customerID.length==36)) return res.status(400).send({ status: false, message: "please enter correct customer id" })
if(!(await CustomerModel.findOne({customerID:customerID,isdeleted:false}))) return res.status(404).send({ status: false, message: `no customer present with this ${customerID} id`})

      carddata.cardNumber = temp

    let card = await CardModel.create(carddata)
  return   res.status(201).send({status:true,data:card})
} catch (err) {
  return res.status(500).send({ status: false, message: err.message });
}
}

const getcard = async(req,res)=>{
  try {
    // console.log(uuid.v4());
    // console.log(uuid.v4().length);
      let carddata = await CardModel.find({isdeleted:false})
      if(carddata.length==0)  return res.status(404).send({status:false,message:"no card found"})
      return res.status(200).send({status:true,data:carddata})
    } catch (err) {
      return res.status(500).send({ status: false, message: err.message });
    }
}

module.exports = {createcard,getcard}