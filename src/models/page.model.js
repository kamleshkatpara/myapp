import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import normalize from 'normalize-mongoose';

/**
 * @swagger
 * components:
 *  schemas:
 *    Pages.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewPage:
 *      properties:
 *        title:
 *          type: string
 *        path:
 *          type: string
 *        content:
 *          type: string
 *        meta_title:
 *          type: string
 *        meta_content:
 *          type: string
 *        meta_keywords:
 *          type: string
 *        status:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Pages.Filter:
 *      properties:
 *        title:
 *          type: string
 */


/**
 * @swagger
 * components:
 *  schemas:
 *    Page:
 *      properties:
 *        title:
 *          type: string
 *        path:
 *          type: string
 *        content:
 *          type: string
 *        meta_title:
 *          type: string
 *        meta_content:
 *          type: string
 *        meta_keywords:
 *          type: string
 *        status:
 *          type: string
 */

let PageSchema = new Schema(
  {
    title: String,
    path: String,
    content: String,
    meta_title: String,
    meta_content: String,
    meta_keywords: String,
    status: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "update_at" } }
);

PageSchema.plugin(normalize);

module.exports = mongoose.model("Page", PageSchema);
