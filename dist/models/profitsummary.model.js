"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _normalizeMongoose = _interopRequireDefault(require("normalize-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;

/**
 * @swagger
 * components:
 *  schemas:
 *    ProfitSummary.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewProfitSummary:
 *      properties:
 *        total:
 *          type: string
 *        tracked_cashback:
 *          type: string
 *        validated_cashback:
 *          type: string
 *        payable_cashback:
 *          type: string
 *        claimed_cashback:
 *          type: string
 *        rejected_cashback:
 *          type: string
 *        total_earned_cashback:
 *          type: string
 *        user_id:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    ProfitSummary.Filter:
 *      properties:
 *        user_id:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    ProfitSummary:
 *      properties:
 *        total:
 *          type: string
 *        tracked_cashback:
 *          type: string
 *        validated_cashback:
 *          type: string
 *        payable_cashback:
 *          type: string
 *        claimed_cashback:
 *          type: string
 *        rejected_cashback:
 *          type: string
 *        total_earned_cashback:
 *          type: string
 *        user_id:
 *          type: string
 */
let ProfitSummarySchema = new Schema({
  total: String,
  tracked_cashback: String,
  validated_cashback: String,
  payable_cashback: String,
  claimed_cashback: String,
  rejected_cashback: String,
  total_earned_cashback: String,
  user_id: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "update_at"
  }
});
ProfitSummarySchema.plugin(_normalizeMongoose.default);
module.exports = _mongoose.default.model("ProfitSummary", ProfitSummarySchema);