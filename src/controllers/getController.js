const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')


const getCollegeDetails = async (req, res) => {

    try {

        // get college name from query params
        const collegeName = req.query.collegeName.toUpperCase()
         
        if(!collegeName){
            collegeName = req.query.collegeName.toLowerCase()
        }


        if (!collegeName || collegeName.trim() == "") {
            return res.status(400).send({ status: false, msg: "College name is missing" })
        }

        const output = {}

        // find college data by using college name
        const collegeData = await collegeModel.findOne({ name: collegeName, isDeleted: false })

        if (!collegeData) {
            return res.status(404).send({ status: false, msg: `College name '${collegeName}' doesn't exist!` })
        }

        // get all interns[] related to this college _id
        const internsList = await internModel.find({ collegeId: collegeData._id, isDeleted: false }).select({
            name: 1,
            email: 1,
            mobile: 1
        })

        output.name = collegeData.name
        output.fullName = collegeData.fullName
        output.logoLink = collegeData.logoLink
        output.interns = internsList

        return res.status(200).send({ status: true, data: output })

    }
    catch (err) {
        return res.status(500).send({ status: true, data: e.message })
    }
}




module.exports.getCollegeDetails = getCollegeDetails