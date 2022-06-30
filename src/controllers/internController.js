const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')
const mongoose = require('mongoose')


/*-------------------------------------------------VALIDATION FUNCTION -------------------------------------------------*/
// check any Doc _id (valid or not)
function isValid_Id(_id) {
    return mongoose.isValidObjectId(_id)
}

// validate email address 
const isValidEmail = (email) => {
    let regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regEx.test(email)
}

// validate phone number 
const isValidMobile = (number) => {
    let regEx = /^(\+\d{1,3}[- ]?)?\d{10}$/

    return regEx.test(number)
}


/*------------------------------------CREATE INTERN ------------------------------------------------*/

const createIntern = async (req, res) => {
    try {
        const data = req.body

        // check data is exist | key exist in data
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Post body data is required!" })
        }

        let {
            name,
            email,
            mobile,
            collegeName
        } = data

        // validate it's values
        if (!name || !name.trim()) {
            return res.status(400).send({ status: false, msg: "Intern's name is missing" })
        }

        if (!/^([a-zA-Z. ]){1,100}$/.test(name)) {
            return res.status(400).send({ status: false, msg: "name should contain only alphabetic chacraters" })
        }

        if (!email || !email.trim()) {
            return res.status(400).send({ status: false, msg: "Intern's email is missing" })
        }
        if (!isValidEmail(email.trim())) {
            return res.status(400).send({ status: false, msg: "enter valid email address" })
        }
        if (!mobile) {
            return res.status(400).send({ status: false, msg: "Intern's mobile number is missing" })
        }
        if (!isValidMobile(mobile.trim())) {
            return res.status(400).send({ status: false, msg: "mobile number is not valid" })
        }
        if (!collegeName || !collegeName.trim()) {
            return res.status(400).send({ status: false, msg: "Intern's college name is missing" })
        }


        // check if college id exists in our collection OR not
        const inCollegeDb = await collegeModel.findOne({
            name: collegeName,
            isDeleted: false
        })

        
        if (!inCollegeDb) {
            return res.status(400).send({ status: false, msg: "the college where you belong doesn't exist" })
        }


        // check if email address exists in our collection OR not 
        let duplicateEmail = await internModel.find({ email: email })
        if (duplicateEmail.length !== 0) {
            return res.status(400).send({ status: false, msg: "Email already exists" })
        }


        // check if phone number exists in our collection OR not
        let duplicateMobile = await internModel.find({mobile:mobile})
        if(duplicateMobile.length !==0){
            return res.status(400).send({status: false, msg: "Mobile already exists"})
        }


        let insertData = {
            name,
            email,
            mobile,
            collegeId: inCollegeDb._id,
        }


        // now - create a document in the collection
        const create = await internModel.create(insertData)
        return res.status(201).send({ status: true, data: create})
    }


    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })

    }
}



module.exports.createIntern = createIntern