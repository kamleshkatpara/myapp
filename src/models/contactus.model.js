import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import normalize from 'normalize-mongoose';

/**
 * @swagger
 * components:
 *  schemas:
 *    ContactUs.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewContactUs:
 *      properties:
 *        full_name:
 *          type: string
 *        email_address:
 *          type: string
 *        phone_number:
 *          type: string
 *        regarding:
 *          type: string
 *        description:
 *          type: string
 *        read:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    ContactUs.Filter:
 *      properties:
 *        full_name:
 *          type: string
 */


/**
 * @swagger
 * components:
 *  schemas:
 *    ContactUs:
 *      properties:
 *        full_name:
 *          type: string
 *        email_address:
 *          type: string
 *        phone_number:
 *          type: string
 *        regarding:
 *          type: string
 *        description:
 *          type: string
 *        read:
 *          type: string
 */

let ContactUsSchema = new Schema(
  {
    full_name: String,
    email_address: String,
    phone_number: String,
    regarding: String,
    description: String,
    read: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "update_at" } }
);

ContactUsSchema.plugin(normalize);

module.exports = mongoose.model("ContactUs", ContactUsSchema);
