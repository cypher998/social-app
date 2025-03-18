const {Router}=require("express")
const bcrypt=require("bcrypt")
const jwt= require("jsonwebtoken")
const jwt_secret="qwerty"
const {userModel} =require( "../model/usermodel")
const userRouter=Router()
const {Signup}=require("../controllers/usercontroller")
const {Login}=require("../controllers/usercontroller")
/*while importing a function u have to destructure it as it get converting into object*/

userRouter.post("/Signup",  Signup)

userRouter.post("/login" ,Login)



module.exports={userRouter:userRouter}