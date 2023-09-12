const express = require("express")
const HomeControler = require("../../controllers/Home")
const UserControler = require("../../controllers/User")
const router = express.Router()


router.get("/", HomeControler.index)
router.post("/user", UserControler.create)


module.exports = router
