// Importing interfaces from express
import { Request, Response } from "express";
import { omit } from "lodash";
// Importing Services
import { createUserService, loginUserService } from "../service/user.service";

// Controller For Creating A User
export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUserService(req.body);
    if (user) {
      return res.send(omit(user.toJSON(), ["password", "tokens"]));
    }
  } catch (error: any) {
    console.error(error);
    return res.status(409).send({ error: error.message });
  }
}

// Controller For Logggin in User
export async function loginHandler(req: Request, res: Response) {
  try {
    const { user, token } = await loginUserService(req);
    return res.send({
      user: omit(user.toJSON(), ["password", "tokens"]),
      token,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(401).send({ error: error.message });
  }
}
