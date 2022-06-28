const collegeModel = require('../models/collegeModel')
const internModel = require('../modules/internModel')
const mongoose = require('mongoose')


const createIntern = async (req, res) => {
    // get the body data
    const data = req.body

    // check data is exist | key exist in data
    if (Object.keys(data).length == 0) return unSuccess(res, 404, "Post body data must be required!")

    let {
        name,
        email,
        mobile,
        collegeName
    } = data

    // validate it's values
    if (!name || !name.trim()) {
        return unSuccess(res, 400, "Intern's name must be required!")
}
    if (!email || !email.trim()) return unSuccess(res, 400, "Intern's email must be required!")
    if (!isValidEmail(email.trim())) return unSuccess(res, 400, "Please enter a valid email address!")
    if (!mobile || !mobile.trim()) return unSuccess(res, 400, "Intern's mobile must be required!")
    if (!isValidMobile(mobile.trim())) return unSuccess(res, 400, "Please enter a valid phone number!")
    if (!collegeName || !collegeName.trim()) return unSuccess(res, 400, "Intern's collegeName must be required!")


    // check if college id is exist in our collection OR not
    const inCollegeDb = await collegeModel.findOne({
        name: collegeName.trim(),
        isDeleted: false
    }).catch(_ => null)
    if (!inCollegeDb) return unSuccess(res, 404, "The college where you belong currently does not exist!")


    // check if email address is exist in our collection OR not 
    const alreadyExistEmail = await internModel.findOne({
        email: email.trim()
    }).catch(_ => null)
    if (alreadyExistEmail) return unSuccess(res, 406, "This email address already exist!") // not acceptable


    // check if phone number is exist in our collection OR not
    const alreadyExistMobile = await internModel.findOne({
        mobile: mobile.trim()
    }).catch(_ => null)
    if (alreadyExistMobile) return unSuccess(res, 406, "This phone number already exist!") // not acceptable




    let insertData = {
        name,
        email,
        mobile,
        collegeId: inCollegeDb._id
    }


    try {
        // now - create a document in the collection
        const create = await internModel.create(insertData);
        success(res, 201, create)
    } catch (e) {
        // handel server side error(s)
        unSuccess(res, 500, e.message)
    }
}


// send success case
const success = (res, code, data) => {
    return res.status(code).send({
        status: true,
        data: data
    })
}

// send unsuccess case
const unSuccess = (res, code, message) => {
    return res.status(code).send({
        status: false,
        message: message
    })
}

// check any Doc _id (valid or not)
const isValid_Id = (_id) => {
    return mongoose.isValidObjectId(_id)
}

// validate email address 
const isValidEmail = (email) => {
    let regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regEx.test(email)
}

// validate phone number 
const isValidMobile = (number) => {
    let regEx = /^[6-9]\d{9}$/
    return regEx.test(number)
}




module.exports = createIntern