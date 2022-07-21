import { Express, Request, Response } from "express";
import {
  createCommentHandler,
  createPostHandler,
  removeCommentHandler,
  toggleLikeHandler,
} from "./controller/post.controller";
import { createUserHandler, loginHandler } from "./controller/user.controller";
import validateAuth from "./middleware/validateAuth";

export default function (app: Express) {
  // End-Point Responsible for registering a user
  app.post("/api/users", createUserHandler);

  // End-Point Responsible for logging in a user
  app.post("/api/login", loginHandler);

  // End-Point Responsible for creating a post
  app.post("/api/posts", validateAuth, createPostHandler);

  // End-Point Responsible for toggling like on a post
  app.post("/api/post/:id", validateAuth, toggleLikeHandler);

  // End-point Responsible for commenting on a post
  app.post("/api/comment/:id", validateAuth, createCommentHandler);

  app.delete(
    "/api/posts/:postId/comment/:commentId",
    validateAuth,
    removeCommentHandler
  );
}
