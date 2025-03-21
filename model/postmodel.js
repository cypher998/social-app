//import { userModel } from "./usermodel";
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const post = new Schema({
  userid:{type:mongoose.Schema.Types.ObjectId},
  media: { type: String, default: "" },
  caption: { type: String, default: "" },
  comments: [
    {
      Id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  likes: [{
   
    userId:{type: mongoose.Schema.Types.ObjectId,
    ref: "user",}
  }]
},{timestamps:true});


const postModel = mongoose.model("post", post);
module.exports = {  postModel };