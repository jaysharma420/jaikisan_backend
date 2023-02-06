const express = require("express")
const router = express.Router()
const {CreateCustomer,GetCustomer,DeleteCustomer} = require("./Controller/Customer")
const {createcard,getcard} = require("./Controller/Card")

router.post("/customer",CreateCustomer)
router.get("/customer",GetCustomer)
router.delete("/customer/:id",DeleteCustomer)
router.post("/card",createcard)
router.get("/card",getcard)

module.exports = router