const {Router} = require("express")
const {auth} = require("../authorization/auth")
const {postModel} = require("../model/postmodel")
const postRouter=Router()
 //create the  posts
postRouter.post("/create" , auth,async (req , res)=>{

 try{    const {caption , media} = req.body
      const userid=req.user.id
     await postModel.create({
         
      userid:userid,
      caption:caption,
         media:media,
         
         
     })
     res.status(201).json({message:"post created successfully"})
     }catch(e){
      res.status(400).json({error:e.message
         ,message:"post didn't get posted"
      })
     }
})
// get all the posts
postRouter.get("/" , async(req ,res)=>{

     try{const posts=await postModel.find().populate("userid" , "username profile").sort({createdAt:-1})


      res.status(200).json({message:"fetched all post",
      post:posts})}catch(e){
         res.json({message:e.message,error:"didnt fetch"})
      }



})



module.exports={postRouter:postRouter}





