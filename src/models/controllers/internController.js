const internModel = require("../models/internModel.js")



const createIntern = async function (req,res){
    try{
        let college = req.body
        let newCollege = await internModel.create(college)
        res.status(201).send({status : true, msg : "College created successfully", newCollege})
    }catch(error){
        res.status(500).send({msg : message.error})
    }
}
module.exports.createIntern = createIntern