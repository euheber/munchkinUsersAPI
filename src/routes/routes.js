const HomeControler = require("../../controllers/Home")
const UserControler = require("../../controllers/User")
const express = require("express")
const router = express.Router()


router.get("/", HomeControler.index)
router.post("/user", UserControler.create)
router.post("/login", UserControler.login)
router.post("/authenticate", UserControler.authenticate)

module.exports = router
