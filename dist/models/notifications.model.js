"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _normalizeMongoose = _interopRequireDefault(require("normalize-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;

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
let NotificationSchema = new Schema({
  title: String,
  description: String,
  type: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "update_at"
  }
});
NotificationSchema.plugin(_normalizeMongoose.default);
module.exports = _mongoose.default.model("Notification", NotificationSchema);