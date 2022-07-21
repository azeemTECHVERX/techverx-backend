// Libraries
import express from "express";
// Typescript Helpers
import config from "../config/default";
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";

// Config file post and host
const port = config.port as number;
const host = config.host as string;

// Express app instance
const app = express();

// Middleware to automatically parse data into json object
app.use(express.json());

app.listen(port, host, () => {
  log.info(`Server is listing at port: ${port}`);

  connect();
  routes(app);
});
