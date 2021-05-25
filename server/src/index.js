const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const middlewares = require("./middlewares");
const logs = require("./api/FavPersonManager");
const app = express();
app.use(express.json());

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan("common"));
app.use(helmet());
console.log("origin: ", process.env.CORS_ORIGIN);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

// Route used for accessing data
app.use("/api/logs", logs);

// Error handling
app.use(middlewares.notFound);

app.use(middlewares.errorHandler);

function log(message) {
  // TODO console log will be replaced/supplemented by true application logging mechanism
  console.log(message);
}

const port = process.env.PORT || 1337;
app.listen(port, () => {
  log("listening at http://localhost:1337");
});
