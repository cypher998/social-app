const { Router } = require("express");
const { profiledata } = require("../model/profile");
const { pusedata } = require("../model/profile");
const { auth } = require("../authorization/auth");
const { userModel } = require("../model/usermodel");
const profileRouter = Router();

profileRouter.post("/create", auth, async (req, res) => {
  try {
    const { username, profile, bio } = req.body;
    const userid = req.user.id; //from the auth
    const existinguser = await profiledata.findOne({ userid });
    if (existinguser) {
      return res.json({ message: "Profile already exist" });
    }
    await profiledata.create({
      userid: userid,
      username: username,
      profile: profile,
      bio: bio,
    });

    res.status(200).send("profile created successfully");
  } catch (e) {
    res.status(400).json({ message: e });
  }
});

profileRouter.put("/update", auth, async (req, res) => {
  try {
    const userid = req.user.id;
    const { username, profile, bio } = req.body;
    const userProfile = await profiledata.findOneAndUpdate(
      { userid: userid }, //find the person
      { $set: { username, profile, bio } }, //updating the field
      { new: true }
    );
    res.status(200).json({ message: "updated successfully" });
    if (!userProfile) {
      res.status(404).json({ messgae: "profile didn't exist" });
    }
  } catch (e) {
    res.json({ error: e.message });
  }
});

profileRouter.post("/follow/:targetid", auth, async (req, res) => {
  try {
    const userid = req.user.id; // get yout id that
    const targetid = req.params.targetid; //that you want to follow

    console.log("userid",userid);
    console.log(targetid);

    const targetuser = await profiledata.findById(targetid);
    if (!targetuser) {
    return  res.json({  message: "user you want to follow  didn't exist " });
    }
    const user = await profiledata.findOne({userid});
    if (!user) {
      return res.json({message:"user didn't exist"})
      } 
    if(user.following.includes(targetid)) {
        return  res.json({message:"you already followed that account"})}
      
        user.following.push(targetid);
        targetuser.followers.push(userid);
        await user.save();
        await targetuser.save();
        res.json({ message: " followed the account " });
    
   
  } catch (e) {
    res.json({ error: e.message });
  }
});


postRouter.post("/unfollow/:targetid" , auth ,async (req,res)=>{
  const userid=req.user.id;
  const target=req.params.id


})

module.exports = { profileRouter: profileRouter };
