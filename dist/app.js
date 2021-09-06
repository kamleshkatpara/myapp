"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _compression = _interopRequireDefault(require("compression"));

var _helmet = _interopRequireDefault(require("helmet"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _chalk = _interopRequireDefault(require("chalk"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _errorhandler = _interopRequireDefault(require("errorhandler"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createError = require("http-errors");

const connected = _chalk.default.bold.cyan;
const error = _chalk.default.bold.yellow;
const app = (0, _express.default)();

if (process.env.NODE_ENV === "development") {
  app.use((0, _errorhandler.default)());

  _dotenv.default.config({
    path: _path.default.resolve("./", process.env.NODE_ENV + ".env")
  });
} else {
  _dotenv.default.config({
    path: _path.default.resolve("./", process.env.NODE_ENV + ".env")
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
      email: "mekamleshk@gmail.com"
    }
  },
  host: `localhost:${process.env.PORT}`,
  tags: [],
  servers: [{
    url: `http://${process.env.HOST}:${process.env.PORT}`
  }],
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
        bearerFormat: "JWT"
      } // apiKeyAuth: {
      //   type: "apiKey",
      //   in: "header",
      //   name: "x-auth-token",
      // },

    }
  }
};
const options = {
  swaggerDefinition: swaggerDefinition,
  apis: ["./src/routes/*.js", "./src/models/*.js"]
};
const swaggerSpec = (0, _swaggerJsdoc.default)(options);
app.get("/swagger.json", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

_mongoose.default.connect(process.env.DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log(connected(`Mongoose connection is open at ${process.env.DBURL}`))).catch(err => console.log(error(`Mongoose connection has occured ${err} error`)));

_mongoose.default.set("useFindAndModify", false);

_mongoose.default.set("useNewUrlParser", true);

_mongoose.default.set("useCreateIndex", true);

app.set("views", _path.default.join(__dirname, "../views"));
app.set("view engine", "hbs");
app.use((0, _compression.default)());
app.use((0, _helmet.default)({
  contentSecurityPolicy: {
    directives: { ..._helmet.default.contentSecurityPolicy.getDefaultDirectives(),
      "script-src": ["'self'", "'unsafe-inline'", "localhost"]
    }
  }
}));
app.disable("x-powered-by");
app.use((0, _morgan.default)("dev"));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use((0, _cookieParser.default)());
app.use(_express.default.static(_path.default.join(__dirname, "../public")));
app.use((0, _cors.default)());
app.use("/", require("./routes/index"));
app.use(function (req, res, next) {
  next(createError(404));
});

if (!_fsExtra.default.existsSync("public/images/uploads")) {
  _fsExtra.default.ensureDir("public/images/uploads").then("uploads folder created").catch(error => console.log(`error in recreating uploads folder due to ${error}`));
}

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});
var _default = app;
exports.default = _default;