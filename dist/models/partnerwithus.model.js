"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _normalizeMongoose = _interopRequireDefault(require("normalize-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;

/**
 * @swagger
 * components:
 *  schemas:
 *    PartnerWithUs.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewPartnerWithUs:
 *      properties:
 *        website_name:
 *          type: string
 *        website_url:
 *          type: string
 *        contact_name:
 *          type: string
 *        contact_email_address:
 *          type: string
 *        contact_number:
 *          type: string
 *        logo_url:
 *          type: string
 *        description:
 *          type: string
 *        provide_affiliate:
 *          type: string
 *        all_over_india:
 *          type: string
 *        read:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    PartnerWithUs.Filter:
 *      properties:
 *        website_name:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    PartnerWithUs:
 *      properties:
 *        website_name:
 *          type: string
 *        website_url:
 *          type: string
 *        contact_name:
 *          type: string
 *        contact_email_address:
 *          type: string
 *        contact_number:
 *          type: string
 *        logo_url:
 *          type: string
 *        description:
 *          type: string
 *        provide_affiliate:
 *          type: string
 *        all_over_india:
 *          type: string
 *        read:
 *          type: string
 */
let PartnerWithUsSchema = new Schema({
  website_name: String,
  website_url: String,
  contact_name: String,
  contact_email_address: String,
  contact_number: String,
  logo_url: String,
  description: String,
  provide_affiliate: String,
  all_over_india: String,
  read: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "update_at"
  }
});
PartnerWithUsSchema.plugin(_normalizeMongoose.default);
module.exports = _mongoose.default.model("PartnerWithUs", PartnerWithUsSchema);