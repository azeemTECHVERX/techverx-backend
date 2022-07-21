// Libraries
import mongoose from "mongoose"; // mongoDB ORM
import bcrypt from "bcrypt"; // For creating Hases
import jwt from "jsonwebtoken";
// Typescript Files
import config from "../../config/default";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    tokens: [
      {
        token: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  tokens: object[];
  createdAt: Date;
  updatedAt: Date;
  compatePassword(candidatePassword: string): Promise<boolean>; // Mothod to compare user's entered and saved password using bcrypt
  generateAuthToken(): void;
}

// Defining a method on User Schema for comparing the password
UserSchema.methods.compatePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch(() => false);
};

// Defining a method before saving user to hash the password

UserSchema.pre("save", async function (next: any) {
  const user = this as UserDocument;

  // If user didn't change password we want to exit
  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.saltValue);
  const hash = await bcrypt.hashSync(user.password, salt);

  // Adding hashed value to password
  user.password = hash;

  return next();
});

UserSchema.methods.generateAuthToken = async function () {
  const user = this as UserDocument;
  const token = jwt.sign({ _id: user._id.toString() }, config.privateKey);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
