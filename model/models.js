const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const userschema = new Schema({
    name:{
        type: String,
        required: [true, 'please provide a name']
    },
     email:{
        type: String,
        required: [true, 'please provide an email'],
        unique: [true, 'please provide a valid email address'],
        validate: [isEmail]
    },
    password:{
 type: String,
        required: [true, 'please provide a password'],
        minlength: [7, 'the minimum password length is 7']

    }
    

},{timestamps: true}
)

userschema.pre('save', async function (next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
}), 

userschema.methods.comparePassword = async function (Userpassword) {
    const isCorrect = await bcrypt.compare(Userpassword, this.password);
    return isCorrect;
    
}

userschema.methods.generatetoken = function () {
    return jsonwebtoken.sign({userId: this._id, name: this.name}, process.env.jwt_secret,{expiresIn: '1d' });
}
module.exports = mongoose.model('User', userschema)