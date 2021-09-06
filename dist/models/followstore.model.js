"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _normalizeMongoose = _interopRequireDefault(require("normalize-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;

/**
 * @swagger
 * components:
 *  schemas:
 *    FollowStore.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewFollowStore:
 *      properties:
 *        user_id:
 *          type: string
 *        store_id:
 *          type: string
 *        store_name:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    FollowStore.Filter:
 *      properties:
 *        user_id:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    FollowStore:
 *      properties:
 *        user_id:
 *          type: string
 *        store_id:
 *          type: string
 *        store_name:
 *          type: string
 */
let FollowStoreSchema = new Schema({
  user_id: String,
  store_id: String,
  store_name: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "update_at"
  }
});
FollowStoreSchema.plugin(_normalizeMongoose.default);
module.exports = _mongoose.default.model("FollowStore", FollowStoreSchema);