import { Request, Response } from "express";
import mongoose, { Mongoose, ObjectId } from "mongoose";
import Post from "../model/post.model";
import { Comment } from "../model/post.model";
// Service Responsible for creating a post
export async function createPostService({ body }: Request) {
  try {
    console.log(body);
    return await Post.create(body);
  } catch (error: any) {
    throw new Error(error);
  }
}

// Service Responsible for Toggling likes on a post
export async function toggleLikeService(req: Request) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      throw new Error("No Post Found!");
    }
    const { currentUser } = req;
    const index = post.likes.indexOf(currentUser._id);
    index === -1
      ? post.likes.push(currentUser._id)
      : post.likes.splice(index, 1);
    await post.save();
    return post;
  } catch (error: any) {
    throw new Error(error);
  }
}

// Service Responsible for Adding a Comment on a post
export async function createCommentService(req: Request) {
  try {
    // Get The Post by its Id
    const post = await Post.findById(req.params.id);
    if (!post) {
      throw new Error("No Post found!");
    }

    const { currentUser } = req;

    post.comments.push({
      user: currentUser._id,
      text: req.body.text,
      date: new Date(),
    });
    await post.save();
    return post;
  } catch (error: any) {
    throw new Error(error);
  }
}

// Service Responsible for Deleting a Comment on a post
export async function removeCommentService(req: Request, res: Response) {
  try {
    // Getting the post
    const post = await Post.findById(req.params.postId);
    if (!post) {
      res.status(404);
      throw new Error("No Post Found!");
    }

    // Finding comment index and removing it.
    let index = post.comments
      .map((comment: any) => comment._id.toString())
      .indexOf(req.params.commentId);
    if (index !== -1) {
      await post.comments.splice(index, 1);
      await post.save();
      return post;
    }
    // Throwing Error if no comment found!
    res.status(404);
    throw new Error("No Comment found!");
  } catch (error: any) {
    throw new Error(error);
  }
}

// Service Responsible for Getting the Posts
export async function getPostsService(req: Request, res: Response) {
  try {
    // returning all the documents
    return await Post.find({})
      .populate("likes", "name")
      .populate("comments.user", "name");
  } catch (error: any) {
    throw new Error(error);
  }
}
