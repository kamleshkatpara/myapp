"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _normalizeMongoose = _interopRequireDefault(require("normalize-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;

/**
 * @swagger
 * components:
 *  schemas:
 *    Feed.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewFeed:
 *      properties:
 *        feed_store:
 *          type: string
 *        feed_category:
 *          type: string
 *        feed_click_count:
 *          type: string
 *        feed_title:
 *          type: string
 *        feed_description:
 *          type: string
 *        feed_terms:
 *          type: string
 *        feed_coupon:
 *          type: string
 *        feed_type:
 *          type: string
 *        feed_link:
 *          type: string
 *        feed_aff_link:
 *          type: string
 *        feed_network:
 *          type: string
 *        feed_validity_date:
 *          type: string
 *        feed_discount:
 *          type: string
 *        feed_applicable_on:
 *          type: string
 *        feed_not_applicable_on:
 *          type: string
 *        feed_user_type:
 *          type: string
 *        feed_payment_mode:
 *          type: string
 *        feed_brands:
 *          type: string
 *        feed_min_purchase:
 *          type: string
 *        feed_max_discount:
 *          type: string
 *        feed_featured:
 *          type: string
 *        feed_store_image:
 *          type: string
 *        feed_status:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Feed.Filter:
 *      properties:
 *        feed_store:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Feed:
 *      properties:
 *        feed_store:
 *          type: string
 *        feed_category:
 *          type: string
 *        feed_click_count:
 *          type: string
 *        feed_title:
 *          type: string
 *        feed_description:
 *          type: string
 *        feed_terms:
 *          type: string
 *        feed_coupon:
 *          type: string
 *        feed_type:
 *          type: string
 *        feed_link:
 *          type: string
 *        feed_aff_link:
 *          type: string
 *        feed_network:
 *          type: string
 *        feed_validity_date:
 *          type: string
 *        feed_discount:
 *          type: string
 *        feed_applicable_on:
 *          type: string
 *        feed_not_applicable_on:
 *          type: string
 *        feed_user_type:
 *          type: string
 *        feed_payment_mode:
 *          type: string
 *        feed_brands:
 *          type: string
 *        feed_min_purchase:
 *          type: string
 *        feed_max_discount:
 *          type: string
 *        feed_featured:
 *          type: string
 *        feed_store_image:
 *          type: string
 *        feed_status:
 *          type: string
 */
let FeedSchema = new Schema({
  feed_store: String,
  feed_category: String,
  feed_click_count: String,
  feed_title: String,
  feed_description: String,
  feed_terms: String,
  feed_coupon: String,
  feed_type: String,
  feed_link: String,
  feed_aff_link: String,
  feed_network: String,
  feed_validity_date: String,
  feed_discount: String,
  feed_applicable_on: String,
  feed_not_applicable_on: String,
  feed_user_type: String,
  feed_payment_mode: String,
  feed_brands: String,
  feed_min_purchase: String,
  feed_max_discount: String,
  feed_featured: String,
  feed_store_image: String,
  feed_status: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "update_at"
  }
});
FeedSchema.plugin(_normalizeMongoose.default);
module.exports = _mongoose.default.model("Feed", FeedSchema);