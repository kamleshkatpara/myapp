"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _normalizeMongoose = _interopRequireDefault(require("normalize-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;

/**
 * @swagger
 * components:
 *  schemas:
 *    FAQs.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewFAQ:
 *      properties:
 *        faq_question:
 *          type: string
 *        faq_answer:
 *          type: string
 *        faq_type:
 *          type: string
 *        status:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    FAQs.Filter:
 *      properties:
 *        faq_question:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    FAQ:
 *      properties:
 *        faq_question:
 *          type: string
 *        faq_answer:
 *          type: string
 *        faq_type:
 *          type: string
 *        status:
 *          type: string
 */
let FAQSchema = new Schema({
  faq_question: String,
  faq_answer: String,
  faq_type: String,
  status: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "update_at"
  }
});
FAQSchema.plugin(_normalizeMongoose.default);
module.exports = _mongoose.default.model("FAQ", FAQSchema);