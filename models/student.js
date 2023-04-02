//define schema
const mongoose = require('mongoose');

const studschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rollno:{
        type:String,
        required:true
    }
})

//model helps us to interact with the db
module.exports = mongoose.model('student',studschema);