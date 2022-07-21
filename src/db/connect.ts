import mongoose from "mongoose";
import config from "../../config/default";
import log from "../logger";

function connect() {
  const dbUri = config.dbUri as string;

  return mongoose
    .connect(dbUri)
    .then(() => {
      log.info("Database Connected!");
    })
    .catch((error) => {
      log.error("db Error", error);
      process.exit(1);
    });
}

export default connect;
