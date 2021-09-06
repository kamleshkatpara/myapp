const createError = require("http-errors");
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import compression from "compression";
import helmet from "helmet";
import mongoose from "mongoose";
import chalk from "chalk";
const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
import dotenv from "dotenv";
import fse from "fs-extra";
import errorhandler from "errorhandler";
import cors from "cors";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(errorhandler());
  dotenv.config({
    path: path.resolve("./", process.env.NODE_ENV + ".env"),
  });
} else {
  dotenv.config({
    path: path.resolve("./", process.env.NODE_ENV + ".env"),
  });
}
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express Mongo API",
    version: "1.0.0",
    description: "Express Mongo API Template",
    contact: {
      name: "express",
      email: "mekamleshk@gmail.com",
    },
  },
  host: `localhost:${process.env.PORT}`,
  tags: [],
  servers: [
    {
      url: `http://${process.env.HOST}:${process.env.PORT}`,
    },
  ],
  basePath: "/",
  components: {
    securitySchemes: {
      // basicAuth: {
      //   type: "http",
      //   scheme: "basic",
      // },
      bearerAuth: {
        type: "http",
        in: "header",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
      // apiKeyAuth: {
      //   type: "apiKey",
      //   in: "header",
      //   name: "x-auth-token",
      // },
    },
  },
};

const options = {
  swaggerDefinition: swaggerDefinition,
  apis: ["./src/routes/*.js", "./src/models/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.get("/swagger.json", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

mongoose
  .connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(
      connected(`Mongoose connection is open at ${process.env.DBURL}`)
    )
  )
  .catch((err) =>
    console.log(error(`Mongoose connection has occured ${err} error`))
  );

mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hbs");

app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "'unsafe-inline'", "localhost"],
      },
    },
  })
);
app.disable("x-powered-by");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(cors());

app.use("/", require("./routes/index"));

app.use(function (req, res, next) {
  next(createError(404));
});

if (!fse.existsSync("public/images/uploads")) {
  fse
    .ensureDir("public/images/uploads")
    .then("uploads folder created")
    .catch((error) =>
      console.log(`error in recreating uploads folder due to ${error}`)
    );
}

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

export default app;
