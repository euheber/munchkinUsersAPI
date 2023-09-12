const { mongoose } = require("mongoose")
const UserSchema = require("../models/User")
const UserModel = mongoose.model("users", UserSchema)
const bcrypt = require("bcrypt")
mongoose
  .connect("mongodb://127.0.0.1:27017/munchkinDB")
  .then((res) => {})
  .catch((e) => console.log(e))

class UserControler {
  async create(req, res) {
    const { email, password } = req.body
    

    if (email == "" || password == "") {
      res.sendStatus(400)
      return
    }

      try {
        const emailExists = await UserModel.findOne({ email: email }).exec()
        if(emailExists){ 
          res.sendStatus(400)
          return
        }

        const hash = bcrypt.hashSync(password, 10)
        const registerUser = new UserModel({ email, password: hash })
        await registerUser.save()
        res.sendStatus(200)
      } catch (e) {
        console.log(e)
      }
  }

  async login(req, res) {
    const { email, password } = req.body
  }
}

module.exports = new UserControler()
