"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _normalizeMongoose = _interopRequireDefault(require("normalize-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;

/**
 * @swagger
 * components:
 *  schemas:
 *    ClickHistory.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewClickHistory:
 *      properties:
 *        merchant:
 *          type: string
 *        network:
 *          type: string
 *        user_id:
 *          type: string
 *        feed_id:
 *          type: string
 *        status:
 *          type: string
 *        click_time:
 *          type: string
 *        run_date:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    ClickHistory.Filter:
 *      properties:
 *        merchant:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    ClickHistory:
 *      properties:
 *        merchant:
 *          type: string
 *        network:
 *          type: string
 *        user_id:
 *          type: string
 *        feed_id:
 *          type: string
 *        status:
 *          type: string
 *        click_time:
 *          type: string
 *        run_date:
 *          type: string

 */
let ClickHistorySchema = new Schema({
  merchant: String,
  network: String,
  user_id: String,
  feed_id: String,
  status: String,
  click_time: String,
  run_date: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "update_at"
  }
});
ClickHistorySchema.plugin(_normalizeMongoose.default);
module.exports = _mongoose.default.model("ClickHistory", ClickHistorySchema);