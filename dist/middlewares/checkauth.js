"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _accesses = _interopRequireDefault(require("../models/accesses.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const checkAuth = resource => {
  return async (req, res, next) => {
    try {
      const bearerHeader = req.headers["authorization"];

      if (!bearerHeader) {
        return res.status(401).send({
          error: {
            statusCode: 401,
            name: "Unauthorized Access",
            message: "Unauthorized Accesss: Token is Missing",
            code: "TOKEN_NOT_FOUND"
          }
        });
      } else {
        const parts = bearerHeader.split(" ");

        if (parts.length === 2) {
          const scheme = parts[0];
          const credentials = parts[1];

          if (/^Bearer$/i.test(scheme)) {
            let token = credentials;

            if (!token) {
              return res.status(401).send({
                error: {
                  statusCode: 401,
                  name: "Unauthorized Access",
                  message: "Unauthorized Accesss: Token is Missing",
                  code: "TOKEN_NOT_FOUND"
                }
              });
            } else {
              try {
                const payload = _jsonwebtoken.default.verify(token, process.env.ACCESS_TOKEN_SECRET);

                req.user = payload.user;

                if (req.user) {
                  await _accesses.default.find({
                    role: req.user.role,
                    resource: resource
                  }).then(data => {
                    let allow = false;
                    data[0].permissions.forEach(perm => {
                      if (req.method === "POST" && perm.create) allow = true;else if (req.method === "GET" && perm.read) allow = true;else if (req.method === "PUT" && perm.update) allow = true;else if (req.method === "DELETE" && perm.delete) allow = true;
                    });
                    if (allow) next();else res.status(401).send({
                      error: {
                        statusCode: 401,
                        name: "Unauthorized Access",
                        message: "Unauthorized Accesss",
                        code: "NOT_ALLOWED"
                      }
                    });
                  });
                } else {
                  return res.status(400).send({
                    error: {
                      statusCode: 400,
                      name: "Invalid Token",
                      message: "Invalid Token: Unknown token",
                      code: "INVALID_TOKEN"
                    }
                  });
                }
              } catch (error) {
                if (error.name === "TokenExpiredError") {
                  return res.status(401).send({
                    error: {
                      statusCode: 401,
                      name: "Unauthorized Access",
                      message: "Unauthorized Accesss: Session has expired",
                      code: "SESSION_TIMED_OUT"
                    }
                  });
                } else if (error.name === "JsonWebTokenError") {
                  return res.status(401).send({
                    error: {
                      statusCode: 401,
                      name: "Invalid Token",
                      message: "Invalid Token: Unknown token",
                      code: "INVALID_TOKEN"
                    }
                  });
                } else {
                  return res.status(400).send({
                    error: {
                      statusCode: 400,
                      name: "Bad Request",
                      message: "Unable to process request",
                      code: "BAD_REQUEST"
                    }
                  });
                }
              }
            }
          }
        }
      }
    } catch (error) {
      next(error);
    }
  };
};

var _default = checkAuth;
exports.default = _default;