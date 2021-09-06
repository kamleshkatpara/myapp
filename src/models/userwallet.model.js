import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import normalize from 'normalize-mongoose';

/**
 * @swagger
 * components:
 *  schemas:
 *    UserWallet.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewUserWallet:
 *      properties:
 *        store_name:
 *          type: string
 *        network:
 *          type: string
 *        user_id:
 *          type: string
 *        transaction_id:
 *          type: string
 *        click_time:
 *          type: string
 *        status:
 *          type: string
 *        payout:
 *          type: string
 *        type:
 *          type: string
 *        sale_amount:
 *          type: string
 *        transaction_time:
 *          type: string
 *        transaction_type:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    UserWallet.Filter:
 *      properties:
 *        user_id:
 *          type: string
 */


/**
 * @swagger
 * components:
 *  schemas:
 *    UserWallet:
 *      properties:
 *        store_name:
 *          type: string
 *        network:
 *          type: string
 *        user_id:
 *          type: string
 *        transaction_id:
 *          type: string
 *        click_time:
 *          type: string
 *        status:
 *          type: string
 *        payout:
 *          type: string
 *        type:
 *          type: string
 *        sale_amount:
 *          type: string
 *        transaction_time:
 *          type: string
 *        transaction_type:
 *          type: string
 */

let UserWalletSchema = new Schema(
  {
    store_name: String,
    network: String,
    user_id: String,
    transaction_id: String,
    click_time: String,
    status: String,
    payout: String,
    type: String,
    sale_amount: String,
    transaction_time: String,
    transaction_type: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "update_at" } }
);

UserWalletSchema.plugin(normalize);

module.exports = mongoose.model("UserWallet", UserWalletSchema);
