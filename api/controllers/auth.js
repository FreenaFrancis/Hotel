const User = require("../models/User");
const bcrypt = require('bcrypt');
const createError = require("../utils/error");
const jwt = require('jsonwebtoken')
const register = async(req,res,next)=>{
try{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
const newUser = new User({
    username:req.body.username,
    email:req.body.email,
    password:hash,
})

await newUser.save()
res.status(200).send("User has been created")
}catch(err){
next(err)
}
}

const login = async(req,res,next)=>{
    try{
       const user =  await User.findOne({username:req.body.username})
       if(!user) return next(createError(404,"user not found"))
const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)

if(!isPasswordCorrect) return next(createError(400,"password not found"))
const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, "sdfghj")

const {password,isAdmin, ...otherDetails} = user._doc;
    res.cookie("access_token",token,{      //doesnt allow client to reach the secret key
        httpOnly: true,
    }).status(200).json({details:{...otherDetails, isAdmin}})
    }catch(err){
    next(err)
    }
    }

module.exports = {register,login}