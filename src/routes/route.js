const express = require('express');
const createCollege = require("../controllers/createCollege")
const createIntern = require('../controllers/createIntern')
const getCollegeList = require('../controllers/getcollegeList')
let router = express.Router();



router.post("/functionup/colleges", createCollege)

router.post("/functionup/interns", createIntern)

router.get("/functionup/collegeDetails", getCollegeList)







module.exports = router;