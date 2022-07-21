// Libraries
import mongoose from "mongoose";
import { UserDocument } from "./user.model";

const postSchema = new mongoose.Schema(
  {
    postBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export interface Comment {
  _id: string;
  user: string;
  text: string;
  date: Date;
}

const Post = mongoose.model("Post", postSchema);

export default Post;
