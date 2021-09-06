import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import normalize from 'normalize-mongoose';

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

let ClickHistorySchema = new Schema(
  {
    merchant: String,
    network: String,
    user_id: String,
    feed_id: String,
    status: String,
    click_time: String,
    run_date: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "update_at" } }
);

ClickHistorySchema.plugin(normalize);

module.exports = mongoose.model("ClickHistory", ClickHistorySchema);
