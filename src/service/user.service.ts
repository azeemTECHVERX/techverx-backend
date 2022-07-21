import { Request } from "express";
import { omit } from "lodash";
import { DocumentDefinition } from "mongoose";
import bcrypt from "bcrypt";
import User, { UserDocument } from "../model/user.model";

export async function createUserService(
  input: DocumentDefinition<UserDocument>
) {
  try {
    // Checking Weather User is Previously Registered or Nor
    const user = await User.findOne({ email: input.email });
    if (!user) {
      return await User.create(input);
    }
    throw new Error("User Already Exists!");
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function loginUserService(req: Request) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Unable to Login - Wronge Email");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Unable to Login - Wronge Password");
    }
    const token = await user.generateAuthToken();
    return { user, token };
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function validateUserPassword({
  email,
  password,
}: {
  email: UserDocument["email"];
  password: string;
}) {
  const user = await User.findOne({ email });
  if (!user) {
    return false;
  }

  const isValid = await user.compatePassword(password);
  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), "password");
}
