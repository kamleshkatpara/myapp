"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _normalizeMongoose = _interopRequireDefault(require("normalize-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;

/**
 * @swagger
 * components:
 *  schemas:
 *    FollowFeed.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewFollowFeed:
 *      properties:
 *        user_id:
 *          type: string
 *        feed_id:
 *          type: string
 *        store_name:
 *          type: string
 *        category_name:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    FollowFeed.Filter:
 *      properties:
 *        user_id:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    FollowFeed:
 *      properties:
 *        user_id:
 *          type: string
 *        feed_id:
 *          type: string
 *        store_name:
 *          type: string
 *        category_name:
 *          type: string
 */
let FollowFeedSchema = new Schema({
  user_id: String,
  feed_id: String,
  store_name: String,
  category_name: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "update_at"
  }
});
FollowFeedSchema.plugin(_normalizeMongoose.default);
module.exports = _mongoose.default.model("FollowFeed", FollowFeedSchema);