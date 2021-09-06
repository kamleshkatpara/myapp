import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import normalize from 'normalize-mongoose';

/**
 * @swagger
 * components:
 *  schemas:
 *    WithDrawals.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewWithDrawal:
 *      properties:
 *        user_id:
 *          type: string
 *        user_name:
 *          type: string
 *        redemption_id:
 *          type: string
 *        type:
 *          type: string
 *        amount:
 *          type: string
 *        status:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    WithDrawals.Filter:
 *      properties:
 *        user_id:
 *          type: string
 */


/**
 * @swagger
 * components:
 *  schemas:
 *    WithDrawal:
 *      properties:
 *        user_id:
 *          type: string
 *        user_name:
 *          type: string
 *        redemption_id:
 *          type: string
 *        type:
 *          type: string
 *        amount:
 *          type: string
 *        status:
 *          type: string
 */

let WithDrawalSchema = new Schema(
  {
    user_id: String,
    user_name: String,
    redemption_id: String,
    type: String,
    amount: String,
    status: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "update_at" } }
);

WithDrawalSchema.plugin(normalize);

module.exports = mongoose.model("WithDrawal", WithDrawalSchema);
