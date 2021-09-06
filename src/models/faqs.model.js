import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import normalize from 'normalize-mongoose';

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

let FAQSchema = new Schema(
  {
    faq_question: String,
    faq_answer: String,
    faq_type: String,
    status: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "update_at" } }
);

FAQSchema.plugin(normalize);

module.exports = mongoose.model("FAQ", FAQSchema);
