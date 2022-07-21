import mongoose from "mongoose";
import config from "../../config/default";

function connect() {
  const dbUri = config.dbUri as string;

  return mongoose
    .connect(dbUri)
    .then(() => {
      console.info("Database Connected!");
    })
    .catch((error) => {
      console.error("db Error", error);
      process.exit(1);
    });
}

export default connect;
