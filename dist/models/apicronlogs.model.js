"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _normalizeMongoose = _interopRequireDefault(require("normalize-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;

/**
 * @swagger
 * components:
 *  schemas:
 *    APICronLog.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewAPICronLog:
 *      properties:
 *        run_date:
 *          type: string
 *        action:
 *          type: string
 *        note:
 *          type: string
 *        status:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    APICronLog.Filter:
 *      properties:
 *        status:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    APICronLog:
 *      properties:
 *        run_date:
 *          type: string
 *        action:
 *          type: string
 *        note:
 *          type: string
 *        status:
 *          type: string
 */
let APICronLogSchema = new Schema({
  run_date: String,
  action: String,
  note: String,
  status: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "update_at"
  }
});
APICronLogSchema.plugin(_normalizeMongoose.default);
module.exports = _mongoose.default.model("APICronLog", APICronLogSchema);