const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index: true
    },
    email:{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    fullname:{
        type : String,
        required : true,
        trim : true,
        index : true
    },
   
    paasword :{
        type: String,
        required : [true,"Password is required"]
    },
    refreshToken:{
        type: String
    }

},{
    timestamps : true
})


module.exports = mongoose.model("User",userSchema);
