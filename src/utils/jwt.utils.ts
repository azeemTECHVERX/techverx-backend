import Jwt from "jsonwebtoken";
import config from "../../config/default";

export function sign(object: object, options?: Jwt.SignOptions | undefined) {
  return Jwt.sign(object, config.privateKey as string, options);
}
