const collegeModel = require("../models/collegeModel")




/*-------------------------------------------------VALIDATION FUNCTION -------------------------------------------------*/
const url_valid = function (url) {
    let regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig

    return regex.test(url)
}




/*------------------------------------------------CREATE COLLEGE ------------------------------------------------*/
const createCollege = async function (req, res) {
    try {
        const data = req.body
        let { name, fullName, logoLink } = data
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Data is required to add a college" })
        }
        if (!name || !name.trim()) {
            return res.status(400).send({ status: false, msg: "Name is required" })
        }

        if (!/^([a-zA-Z. ]){1,100}$/.test(name)) {
            return res.status(400).send({ status: false, msg: "name should contain only alphabetic chacraters" })
        }

        if (!fullName || !fullName.trim()) {
            return res.status(400).send({ status: false, msg: "Full Name is required" })
        }

        if (!/^([a-zA-Z. ]){1,100}$/.test(fullName)) {
            return res.status(400).send({ status: false, msg: "fullname should contain only alphabetic chacraters" })
        }

        if (!logoLink || !logoLink.trim()) {
            return res.status(400).send({ status: false, msg: "logoLink is required" })
        }
        if (!url_valid(logoLink)) {
            return res.status(400).send({ status: false, msg: "Invalid logo link" })
        }
        const collegeExist = await collegeModel.findOne({ name: name })

        if (collegeExist) {
            return res.status(400).send({ status: false, msg: "college name already exits" })
        }
        let createdCollege = await collegeModel.create(data)
        return res.status(201).send({ status: true, data: createdCollege })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}



module.exports.createCollege = createCollege


