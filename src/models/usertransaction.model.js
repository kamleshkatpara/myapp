import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import normalize from 'normalize-mongoose';

/**
 * @swagger
 * components:
 *  schemas:
 *    UserTransaction.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewUserTransaction:
 *      properties:
 *        store_name:
 *          type: string
 *        network:
 *          type: string
 *        user_id:
 *          type: string
 *        click_time:
 *          type: string
 *        status:
 *          type: string
 *        payout:
 *          type: string
 *        payout_type:
 *          type: string
 *        type:
 *          type: string
 *        sale_amount:
 *          type: string
 *        transaction_time:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    UserTransaction.Filter:
 *      properties:
 *        user_id:
 *          type: string
 */


/**
 * @swagger
 * components:
 *  schemas:
 *    UserTransaction:
 *      properties:
 *        store_name:
 *          type: string
 *        network:
 *          type: string
 *        user_id:
 *          type: string
 *        click_time:
 *          type: string
 *        status:
 *          type: string
 *        payout:
 *          type: string
 *        payout_type:
 *          type: string
 *        type:
 *          type: string
 *        sale_amount:
 *          type: string
 *        transaction_time:
 *          type: string
 */

let UserTransactionSchema = new Schema(
  {
    store_name: String,
    network: String,
    user_id: String,
    click_time: String,
    status: String,
    payout: String,
    payout_type: String,
    type: String,
    sale_amount: String,
    transaction_time: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "update_at" } }
);

UserTransactionSchema.plugin(normalize);

module.exports = mongoose.model("UserTransaction", UserTransactionSchema);
