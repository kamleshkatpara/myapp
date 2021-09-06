import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import normalize from 'normalize-mongoose';

/**
 * @swagger
 * components:
 *  schemas:
 *    UserLogRequests.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewUserLogRequest:
 *      properties:
 *        user_id:
 *          type: string
 *        user_name:
 *          type: string
 *        login_time:
 *          type: string
 *        ip:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    UserLogRequest.Filter:
 *      properties:
 *        user_id:
 *          type: string
 */


/**
 * @swagger
 * components:
 *  schemas:
 *    UserLogRequest:
 *      properties:
 *        user_id:
 *          type: string
 *        user_name:
 *          type: string
 *        login_time:
 *          type: string
 *        ip:
 *          type: string
 */

let UserLogRequestSchema = new Schema(
  {
    user_id: String,
    user_name: String,
    login_time: String,
    ip: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "update_at" } }
);

UserLogRequestSchema.plugin(normalize);

module.exports = mongoose.model("UserLogRequest", UserLogRequestSchema);
