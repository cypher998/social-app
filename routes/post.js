const { Router } = require("express");
const { auth } = require("../authorization/auth");
const { postModel } = require("../model/postmodel");
const postRouter = Router();
//create the  posts
postRouter.post("/create", auth, async (req, res) => {
  try {
    const { caption, media } = req.body;
    const userid = req.user.id;
    await postModel.create({
      userid: userid,
      caption: caption,
      media: media,
    });
    res.status(201).json({ message: "post created successfully" });
  } catch (e) {
    res
      .status(400)
      .json({ error: e.message, message: "post didn't get posted" });
  }
});
// get all the posts
postRouter.get("/", async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("userid", "username profile")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "fetched all post", post: posts });
  } catch (e) {
    res.json({ message: e.message, error: "didnt fetch" });
  }
});

postRouter.post("/like/:postId", auth, async (req, res) => {
  try {
    const postId = req.params.postId; //in body
    const userid = req.user.id; //user that will like the post

    const post = await postModel.findOne({ _id: postId });

    if (!post) {
      return res.status(404).json({ message: "post didn't exist" });
    }
    if (post.likes.some((like) => like.userId.toString() === userid)) {
      console.log("hiii");
      await postModel.updateOne(
        { _id: postId },
        { $pull: { likes: { userId:userid } } }
      );
      res.status(200).json({ message: "post unliked successfully" });
    } else {
    /*ADD_TO_SET : avoid duplicates if user had already liked the post it  will not like it again
-----------
cleaner code
-------------
we don't have to check manually whether user had liked before*/
      await postModel.updateOne(
        { _id: postId },
        { $addToSet: { likes: { userId :userid} } }
      );
      res.status(200).json({ message: `post liked successfully ${userid}` });
    }
  } catch (e) {
    console.log(e);
    res.json({ error: e.message });
  }
});



postRouter.post("/comment/:postId",auth , async (req , res)=>{
  try{ const postId= req.params.postId
   const {text}=req.body
 const post= await  postModel.findOne({_id:postId})

 if(!post){
   return res.status(404).json({message:"post didn't exist"})
 }
 const userId=req.user.id

const newcomments={Id:userId , text:text , createdAt:new Date()}
 post.comments.push(newcomments)
await post.save()
res.status(200).json({message:"comment added"})}
catch(e){
   res.status(501).json({message:e.message})
}
})





module.exports = { postRouter: postRouter };
