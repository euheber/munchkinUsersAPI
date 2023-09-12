class HomeController  { 
     async index (req, res){ 
        res.status(200).send("Olá, mundo")
     }
}


module.exports = new HomeController()