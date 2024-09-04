const createError = require("http-errors");
const express = require("express");
const port = process.env.PORT || 3000;
const http = require("http");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { PrismaClient } = require("@prisma/client");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");

const cloudinary = require("cloudinary").v2;
const upload = require("./middleware/multer-config");

require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();
const prisma = new PrismaClient(); // Initialize PrismaClient instance

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

async function main() {
  try {
    await prisma.picture.create({
      data: {
        name: "field-of-dwarves",
        waldoPosition: [
          [846, 29],
          [841, 35],
          [851, 37],
          [846, 48],
        ],
        link: "https://res.cloudinary.com/dbmnceulk/image/upload/v1725403832/Wheres_Waldo/bb3i2nkfaul77zksdrej.webp",
      },
    });

    console.log("Record added successfully!");
  } catch (error) {
    console.error("Error creating record:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Failed to execute main function:", error);
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Create and start the server
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
