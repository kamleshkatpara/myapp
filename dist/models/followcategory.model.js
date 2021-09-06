"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _normalizeMongoose = _interopRequireDefault(require("normalize-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;

/**
 * @swagger
 * components:
 *  schemas:
 *    FollowCategory.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewFollowCategory:
 *      properties:
 *        user_id:
 *          type: string
 *        category_id:
 *          type: string
 *        category_name:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    FollowCategory.Filter:
 *      properties:
 *        user_id:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    FollowCategory:
 *      properties:
 *        user_id:
 *          type: string
 *        category_id:
 *          type: string
 *        category_name:
 *          type: string
 */
let FollowCategorySchema = new Schema({
  user_id: String,
  category_id: String,
  category_name: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "update_at"
  }
});
FollowCategorySchema.plugin(_normalizeMongoose.default);
module.exports = _mongoose.default.model("FollowCategory", FollowCategorySchema);