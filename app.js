var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv/config");
const mongoose = require("mongoose");

console.log(`Connection URI ${process.env.DB_CONNECTION}`);
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true}).then(console.log('Connection to DB!')).catch(err=>console.log(err.message));


// Indexes
const eventRouter = require("./routes/Event");
const projecRouter = require("./routes/Project");
const taskRouter = require("./routes/Task");
const teamMemberRouter = require("./routes/TeamMember.js");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front/build")));

app.use("/event", eventRouter);
app.use("/project", projecRouter);
app.use("/task", taskRouter);
app.use("/teammember", teamMemberRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
