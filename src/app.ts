// Libraries
import express from "express";
import cors from "cors";
// Typescript Helpers
import config from "../config/default";
import connect from "./db/connect";
import routes from "./routes";

// Config file post and host
const port = config.port as number;

// Express app instance
const app = express();

// app using middleware cors
app.use(cors());

// Middleware to automatically parse data into json object
app.use(express.json());

app.listen(port, () => {
  console.info(`Server is Listening at post: ${port}`);

  connect();
  routes(app);
});
