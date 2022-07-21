// Importing Interfaces
import { Request, Response } from "express";
import { omit } from "lodash";
import {
  createCommentService,
  createPostService,
  removeCommentService,
  toggleLikeService,
} from "../service/post.service";
import log from "../logger";

// Controller for Creating a Post
export async function createPostHandler(req: Request, res: Response) {
  try {
    const post = await createPostService(req);
    return res.status(200).send(post);
  } catch (error: any) {
    log.error(error);
    return res.status(409).send({ error: error.message });
  }
}

// Controller For Toggling Like on a Post
export async function toggleLikeHandler(req: Request, res: Response) {
  try {
    const post = await toggleLikeService(req);
    return res.status(200).send(post);
  } catch (error: any) {
    log.error(error);
    return res.status(409).send({ error: error.message });
  }
}

// Controller For Adding A Comment on a Post
export async function createCommentHandler(req: Request, res: Response) {
  try {
    const post = await createCommentService(req);
    return res.status(200).send(post);
  } catch (error: any) {
    log.error(error);
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
    log.error(error);
    return res.send({ error: error.message });
  }
}
