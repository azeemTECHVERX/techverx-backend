import { Express, Request, Response } from "express";
import cors from "cors";
import {
  createCommentHandler,
  createPostHandler,
  removeCommentHandler,
  toggleLikeHandler,
  getPostsHandler,
  removePostHandler,
} from "./controller/post.controller";
import {
  createUserHandler,
  getUserHandler,
  loginHandler,
} from "./controller/user.controller";
import validateAuth from "./middleware/validateAuth";

export default function (app: Express) {
  // End-Point Responsible for registering a user
  app.post("/api/users", createUserHandler);

  // End-Point Responsible for fetching a user
  app.get("/api/user", validateAuth, getUserHandler);

  // End-Point Responsible for logging in a user
  app.post("/api/login", loginHandler);

  // End-Point Responsible for creating a post
  app.post("/api/posts", validateAuth, createPostHandler);

  // End-Point Responsible for toggling like on a post
  app.post("/api/post/:id", validateAuth, toggleLikeHandler);

  // End-Point Responsible for creating a comment on a post
  app.post("/api/comment/:id", validateAuth, createCommentHandler);

  // End-Point Responsible for removing a comment on a post
  app.delete(
    "/api/posts/:postId/comment/:commentId",
    validateAuth,
    removeCommentHandler
  );

  app.delete("/api/post/:id", validateAuth, removePostHandler);

  app.get("/api/posts", validateAuth, getPostsHandler);
}
