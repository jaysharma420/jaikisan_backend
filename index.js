const express = require("express")
const app = express()
const mongoose = require("mongoose")
const url = "mongodb+srv://jay420:gRLzeLdOa6ENyasF@cluster0.dnkg3q6.mongodb.net/jaikisan"
const PORT = process.env.PORT||3500
const route = require("./route")
mongoose.set('strictQuery', false)

app.use(express.json())

mongoose.connect(url)
.then((res)=>console.log("Db connected..."))
.catch((err)=>console.log(err))

app.use("/",route)

app.use(function(req,res){
    return res.status(400).send({status:false,message:"url is wrong"})
})

app.listen(PORT,()=>{
    console.log("app is running on ",PORT);
})
