const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
//
const app = express();
//

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(morgan("dev"));
// app.use("/uploads", express.static("uploads"));
// app.use("/upload_image", express.static("upload_image"));
const userRoutes = require("./api/routes/users");
const taskRoutes = require("./api/routes/tasks");
//
app.use(bodyParser.json()).use(bodyParser({ extended: true }));
//Routes
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

//Serve static files if in production version

if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Handle errors
app.use((req, res, next) => {
  const error = new Error("NOT FOUNDED");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500 || 401);
  res.json({ message: error.message, status: error.status });
});
module.exports = app;
