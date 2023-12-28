const { mongoose } = require("mongoose")
const UserSchema = require("../models/User")
const UserModel = mongoose.model("users", UserSchema)
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secret = "#haeuhaeuh@pasdasd"
mongoose
  .connect("mongodb://127.0.0.1:27017/munchkinDB")
  .then(res => {})
  .catch(e => console.log(e))


class UserControler {
  async create(req, res) {
    const {name, email, password, ongname, street, neighborhood, number } = req.body

      try {
        const emailExists = await UserModel.findOne({ email: email }).exec()
        if(emailExists){ 
          res.status(400).json({ error: 'Este email já está cadastrado' });
          return
        }

        const hash = bcrypt.hashSync(password, 10)
        const registerUser = new UserModel({name, email, password: hash, ongname, street, neighborhood, number })

        await registerUser.save()
        res.sendStatus(200)
      } catch (e) {
        console.log(e)
      }
  }

  async delete(req, res) {
    const {email} = req.params
    try{
      await UserModel.findOneAndDelete({email: email})
      res.status(200).json({sucess:"Usuário deletado com sucesso."})
    }catch(e){ 
      console.log(e);
    }
  }

  async login(req, res){ 
    const {email, password} = req.body
    const user =  await UserModel.findOne({email: email, exp: Date.now()})
    
    
    if(user != undefined){ 
        const result = await bcrypt.compare(password, user.password);
        if(result){ 
          const token = jwt.sign({email:user.email}, secret)
          res.status(200).json({token: token}) 
        }
    }
  }
}

module.exports = new UserControler()
