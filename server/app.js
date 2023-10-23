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
const { ValidationError } = require("./errors/errors");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Set up common middlewares.
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Setup routers.
app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/notes", notesRouter);
app.use("/api/auth", authRouter);

// For all other URLs, catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (error, req, res, next) {
  if (error instanceof ValidationError) {
    // Handle field-level errors
    return res.status(error.statusCode).json({
      error: {
        name: error.name,
        message: error.message,
        fieldErrors: error.fieldErrors.map((error) => ({
          field: error.field,
          message: error.message,
        })),
        globalErrors: error.globalErrors
      },
    });
  }

  const errorName =
    process.env.NODE_ENV === "dev" && error.statusCode === 500
      ? "InternalServerError"
      : error.name;
  const errorMessage =
    process.env.NODE_ENV === "dev" && error.statusCode === 500
      ? "Internal Server Error"
      : error.message;
  return res.status(error.statusCode || 500).json({
    error: {
      name: errorName,
      message: errorMessage,
    },
  });
});

module.exports = app;
