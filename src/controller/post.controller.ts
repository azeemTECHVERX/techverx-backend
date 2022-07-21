// Importing Interfaces
import { Request, Response } from "express";
import {
  createCommentService,
  createPostService,
  removeCommentService,
  toggleLikeService,
  getPostsService,
} from "../service/post.service";

// Controller for Creating a Post
export async function createPostHandler(req: Request, res: Response) {
  try {
    const post = await createPostService(req);
    return res.status(200).send(post);
  } catch (error: any) {
    console.error(error);
    return res.status(409).send({ error: error.message });
  }
}

// Controller For Toggling Like on a Post
export async function toggleLikeHandler(req: Request, res: Response) {
  try {
    const post = await toggleLikeService(req);
    return res.status(200).send(post);
  } catch (error: any) {
    console.error(error);
    return res.status(409).send({ error: error.message });
  }
}

// Controller For Adding A Comment on a Post
export async function createCommentHandler(req: Request, res: Response) {
  try {
    const post = await createCommentService(req);
    return res.status(200).send(post);
  } catch (error: any) {
    console.error(error);
    return res.status(409).send({ error: error.message });
  }
}

// Controller For Removing A Comment on a Post
export async function removeCommentHandler(req: Request, res: Response) {
  try {
    const post = await removeCommentService(req, res);
    debugger;
    return res.status(200).send(post);
  } catch (error: any) {
    console.error(error);
    return res.send({ error: error.message });
  }
}

// Controller For Getting Posts
export async function getPostsHandler(req: Request, res: Response) {
  try {
    const posts = await getPostsService(req, res);
    return res.status(200).send(posts);
  } catch (error: any) {
    console.error(error);
    return res.status(404).send({ error: error.message });
  }
}
