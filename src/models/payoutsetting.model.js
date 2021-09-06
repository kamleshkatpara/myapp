import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import normalize from 'normalize-mongoose';

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

let PayoutSettingSchema = new Schema(
  {
    min_bank_transfer_amount: String,
    wallet_redemption_amount: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "update_at" } }
);

PayoutSettingSchema.plugin(normalize);

module.exports = mongoose.model("PayoutSetting", PayoutSettingSchema);
