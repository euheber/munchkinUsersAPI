const mongoose = require("mongoose")

const user = new mongoose.Schema({ 
    name: String,
    email: String,
    password: String,
    ongname: String,
    street: String,
    neighborhood: String,
    number: Number
})

module.exports = user