const express = require("express");
const volleyball = require("volleyball");
const cors = require("cors");
const { db_url, allow_cors_origins } = require("./config");

const app = express();

app.use(
  cors({
    origin: allow_cors_origins,
  })
);
console.log(allow_cors_origins);
const middlewares = require("./middlewares");

const db = require("mongoose");

db.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("connection to db succesfull"))
  .catch((err) => console.log(err));

const habitRoutes = require("./api/routes/habitRoutes");
const authRoutes = require("./api/routes/authRoutes");

app.use(express.json());
if (process.env.NODE_ENV !== "TEST") {
  app.use(volleyball);
}

app.use("/api/habits", habitRoutes);
app.use("/api/auth", authRoutes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
