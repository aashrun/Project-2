const internModel = require("../models/internModel.js")



const createIntern = async function (req,res){
    try{
        let intern = req.body
        let newIntern = await internModel.create(intern)
        res.status(201).send({status : true, msg : "Intern created successfully!", newIntern})
    }catch(error){
        res.status(500).send({msg : message.error})
    }
}






module.exports.createIntern = createIntern