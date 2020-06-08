const mongoose=require('mongoose')

const bcrypt=require('bcryptjs')
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true
    },password:{
        type:String,
        required:true
    },date:{
        type:Date,
        default:Date.now
    },
})
UserSchema.methods.isValidPassword = async function(password){
    const user = this;
    //Hashes the password sent by the user for login and checks if the hashed password stored in the
    //database matches the one sent. Returns true if it does else false.
    const compare = await bcrypt.compare(password, user.password);
    return compare;
  }
  

const User=mongoose.model('user',UserSchema)

module.exports=User