"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _normalizeMongoose = _interopRequireDefault(require("normalize-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;

/**
 * @swagger
 * components:
 *  schemas:
 *    PayoutSetting.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewPayoutSetting:
 *      properties:
 *        min_bank_transfer_amount:
 *          type: string
 *        wallet_redemption_amount:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    PayoutSetting.Filter:
 *      properties:
 *        min_bank_transfer_amount:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    PayoutSetting:
 *      properties:
 *        min_bank_transfer_amount:
 *          type: string
 *        wallet_redemption_amount:
 *          type: string
 */
let PayoutSettingSchema = new Schema({
  min_bank_transfer_amount: String,
  wallet_redemption_amount: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "update_at"
  }
});
PayoutSettingSchema.plugin(_normalizeMongoose.default);
module.exports = _mongoose.default.model("PayoutSetting", PayoutSettingSchema);