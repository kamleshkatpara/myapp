"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _normalizeMongoose = _interopRequireDefault(require("normalize-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;

/**
 * @swagger
 * components:
 *  schemas:
 *    UserTracking.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewUserTracking:
 *      properties:
 *        browser:
 *          type: string
 *        operating_system:
 *          type: string
 *        device:
 *          type: string
 *        ip_address:
 *          type: string
 *        country:
 *          type: string
 *        city:
 *          type: string
 *        region:
 *          type: string
 *        user_id:
 *          type: string
 *        url:
 *          type: string
 *        og_url:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    UserTracking.Filter:
 *      properties:
 *        user_id:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    UserTracking:
 *      properties:
 *        browser:
 *          type: string
 *        operating_system:
 *          type: string
 *        device:
 *          type: string
 *        ip_address:
 *          type: string
 *        country:
 *          type: string
 *        city:
 *          type: string
 *        region:
 *          type: string
 *        user_id:
 *          type: string
 *        url:
 *          type: string
 *        og_url:
 *          type: string
 */
let UserTrackingSchema = new Schema({
  browser: String,
  operating_system: String,
  device: String,
  ip_address: String,
  country: String,
  city: String,
  region: String,
  user_id: String,
  url: String,
  og_url: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "update_at"
  }
});
UserTrackingSchema.plugin(_normalizeMongoose.default);
module.exports = _mongoose.default.model("UserTracking", UserTrackingSchema);