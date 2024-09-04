const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
    username: {
        type:String,
        required:[true,"User Name is Required"]
    },
    useremail: {
        type:String,
        required:[true,"User Email is Required"]
    },
    userpassword: {
        type:String,
        required:[true,"User Password is Required"]
    },
    userimage: {
        type:String,
        required:[true,"Image is Required"]
    },
    
    
},
{
    timestamps:true
});

module.exports = mongoose.model('RegistrationModel', RegistrationSchema);


