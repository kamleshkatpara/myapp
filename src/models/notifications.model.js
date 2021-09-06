import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import normalize from 'normalize-mongoose';

/**
 * @swagger
 * components:
 *  schemas:
 *    Notifications.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewNotification:
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        type:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Notification.Filter:
 *      properties:
 *        type:
 *          type: string
 */


/**
 * @swagger
 * components:
 *  schemas:
 *    Notification:
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        type:
 *          type: string
 */

let NotificationSchema = new Schema(
  {
    title: String,
    description: String,
    type: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "update_at" } }
);

NotificationSchema.plugin(normalize);

module.exports = mongoose.model("Notification", NotificationSchema);
