"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _normalizeMongoose = _interopRequireDefault(require("normalize-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;

/**
 * @swagger
 * components:
 *  schemas:
 *    UserLogRequests.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewUserLogRequest:
 *      properties:
 *        user_id:
 *          type: string
 *        user_name:
 *          type: string
 *        login_time:
 *          type: string
 *        ip:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    UserLogRequest.Filter:
 *      properties:
 *        user_id:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    UserLogRequest:
 *      properties:
 *        user_id:
 *          type: string
 *        user_name:
 *          type: string
 *        login_time:
 *          type: string
 *        ip:
 *          type: string
 */
let UserLogRequestSchema = new Schema({
  user_id: String,
  user_name: String,
  login_time: String,
  ip: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "update_at"
  }
});
UserLogRequestSchema.plugin(_normalizeMongoose.default);
module.exports = _mongoose.default.model("UserLogRequest", UserLogRequestSchema);