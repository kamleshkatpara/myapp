import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import normalize from 'normalize-mongoose';

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

let APICronLogSchema = new Schema(
  {
    run_date: String,
    action: String,
    note: String,
    status: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "update_at" } }
);

APICronLogSchema.plugin(normalize);

module.exports = mongoose.model("APICronLog", APICronLogSchema);
