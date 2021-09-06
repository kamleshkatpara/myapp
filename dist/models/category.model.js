"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _normalizeMongoose = _interopRequireDefault(require("normalize-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;

/**
 * @swagger
 * components:
 *  schemas:
 *    Category.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewCategory:
 *      properties:
 *        category_name:
 *          type: string
 *        category_path:
 *          type: string
 *        category_description:
 *          type: string
 *        category_banner:
 *          type: string
 *        category_banner_code:
 *          type: string
 *        category_image:
 *          type: string
 *        category_icon:
 *          type: string
 *        category_meta_title:
 *          type: string
 *        category_meta_description:
 *          type: string
 *        category_meta_keyword:
 *          type: string
 *        category_featured:
 *          type: number
 *        category_status:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Category.Filter:
 *      properties:
 *        category_name:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Category:
 *      properties:
 *        category_name:
 *          type: string
 *        category_path:
 *          type: string
 *        category_description:
 *          type: string
 *        category_banner:
 *          type: string
 *        category_banner_code:
 *          type: string
 *        category_image:
 *          type: string
 *        category_icon:
 *          type: string
 *        category_meta_title:
 *          type: string
 *        category_meta_description:
 *          type: string
 *        category_meta_keyword:
 *          type: string
 *        category_featured:
 *          type: number
 *        category_status:
 *          type: number
 */
let CategorySchema = new Schema({
  category_name: String,
  category_path: String,
  category_description: String,
  category_banner: String,
  category_banner_code: String,
  category_image: String,
  category_icon: String,
  category_meta_title: String,
  category_meta_description: String,
  category_meta_keyword: String,
  category_featured: Number,
  category_status: Number
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "update_at"
  }
});
CategorySchema.plugin(_normalizeMongoose.default);
module.exports = _mongoose.default.model("Category", CategorySchema);