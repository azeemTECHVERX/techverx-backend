import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../model/user.model";
import config from "../../config/default";
import log from "../logger";

export interface UserPayLoad {
  _id?: string;
}

const validateAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the token from the header
    const token = req.header("Authorization");
    // Throw an Error if no token found
    if (!token) {
      throw new Error();
    }

    const decode = jwt.verify(token, config.privateKey) as UserPayLoad;
    const user = await User.findById(decode._id);

    if (!user) {
      throw new Error();
    }

    req.currentUser = user;
    next();
  } catch (error) {
    debugger;
    log.error(error);
    return res.status(401).send("Authentication Error");
  }
};

export default validateAuth;
