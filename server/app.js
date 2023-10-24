const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/indexRouter");
const usersRouter = require("./routes/usersRouter");
const notesRouter = require("./routes/notesRouter");
const authRouter = require("./routes/authRouter");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorHandler");
const versioning = require("./middlewares/versioning");

// Create express app
const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Set up common middlewares.
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use('/api/v1', versioning('v1'));

// Setup routers.
app.use("/", indexRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/notes", notesRouter);
app.use("/api/v1/auth", authRouter);

// For all other un-supported URLs, catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(errorHandler);

module.exports = app;
