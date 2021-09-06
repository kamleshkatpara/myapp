"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _normalizeMongoose = _interopRequireDefault(require("normalize-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;

/**
 * @swagger
 * components:
 *  schemas:
 *    MissingCashbackClaims.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewMissingCashbackClaim:
 *      properties:
 *        ticket_id:
 *          type: string
 *        full_name:
 *          type: string
 *        order_id:
 *          type: string
 *        transaction_amount:
 *          type: string
 *        store_name:
 *          type: string
 *        click_id:
 *          type: string
 *        click_time:
 *          type: string
 *        description:
 *          type: string
 *        status:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    MissingCashbackClaims.Filter:
 *      properties:
 *        full_name:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    MissingCashbackClaim:
 *      properties:
 *        ticket_id:
 *          type: string
 *        full_name:
 *          type: string
 *        order_id:
 *          type: string
 *        transaction_amount:
 *          type: string
 *        store_name:
 *          type: string
 *        click_id:
 *          type: string
 *        click_time:
 *          type: string
 *        description:
 *          type: string
 *        status:
 *          type: string
 */
let MissingCashbackClaimSchema = new Schema({
  ticket_id: String,
  full_name: String,
  order_id: String,
  transaction_amount: String,
  store_name: String,
  click_id: String,
  click_time: String,
  description: String,
  status: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "update_at"
  }
});
MissingCashbackClaimSchema.plugin(_normalizeMongoose.default);
module.exports = _mongoose.default.model("MissingCashbackClaim", MissingCashbackClaimSchema);