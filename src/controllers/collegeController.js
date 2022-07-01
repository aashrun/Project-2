const collegeModel = require("../models/collegeModel")




/*-------------------------------------------------VALIDATION FUNCTION -------------------------------------------------*/
const url_valid = function (url) {
    let regex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gmi
    return regex.test(url)
}

const upar_case = function(fun){
    return  fun.toUpperCase()
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
            return res.status(400).send({ status: false, msg: "Name should contain only alphabetic chacraters" })
        }

        if (!fullName || !fullName.trim()) {
            return res.status(400).send({ status: false, msg: "Full Name is required" })
        }

        if (!/^([a-zA-Z. ]){1,100}$/.test(fullName)) {
            return res.status(400).send({ status: false, msg: "Fullname should contain only alphabetic chacraters" })
        }

        if (!logoLink || !logoLink.trim()) {
            return res.status(400).send({ status: false, msg: "LogoLink is required" })
        }
        if (!url_valid(logoLink)) {
            return res.status(400).send({ status: false, msg: "Invalid logo link" })
        }
        data.name = upar_case(name)
        const collegeExist = await collegeModel.findOne({ name: name })

        if (collegeExist) {
            return res.status(409).send({ status: false, msg: "college name already exits" })
        }
        let createdCollege = await collegeModel.create(data)
        return res.status(201).send({ status: true, data: createdCollege })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}



module.exports.createCollege = createCollege


