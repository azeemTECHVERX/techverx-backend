// Libraries
import express from "express";
// Typescript Helpers
import config from "../config/default";
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
  console.info(`Server is Listening at post: ${port}`);

  connect();
  routes(app);
});
