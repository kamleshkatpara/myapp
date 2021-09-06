import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import normalize from 'normalize-mongoose';

/**
 * @swagger
 * components:
 *  schemas:
 *    Store.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewStore:
 *      properties:
 *        store_name:
 *          type: string
 *        store_path:
 *          type: string
 *        store_description:
 *          type: string
 *        store_banner:
 *          type: string
 *        store_image:
 *          type: string
 *        store_icon:
 *          type: string
 *        store_banner_code:
 *          type: string
 *        store_contact_name:
 *          type: string
 *        store_contact_email:
 *          type: string
 *        store_contact_number:
 *          type: string
 *        store_url:
 *          type: string
 *        store_meta_title:
 *          type: string
 *        store_meta_description:
 *          type: string
 *        store_meta_keyword:
 *          type: string
 *        store_featured:
 *          type: number
 *        store_status:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Store.Filter:
 *      properties:
 *        store_name:
 *          type: string
 */


/**
 * @swagger
 * components:
 *  schemas:
 *    Store:
 *      properties:
 *        store_name:
 *          type: string
 *        store_path:
 *          type: string
 *        store_description:
 *          type: string
 *        store_banner:
 *          type: string
 *        store_image:
 *          type: string
 *        store_icon:
 *          type: string
 *        store_banner_code:
 *          type: string
 *        store_contact_name:
 *          type: string
 *        store_contact_email:
 *          type: string
 *        store_contact_number:
 *          type: string
 *        store_url:
 *          type: string
 *        store_meta_title:
 *          type: string
 *        store_meta_description:
 *          type: string
 *        store_meta_keyword:
 *          type: string
 *        store_featured:
 *          type: number
 *        store_status:
 *          type: number
 */

let StoreSchema = new Schema(
  {
    store_name: String,
    store_path: String,
    store_description: String,
    store_banner: String,
    store_image: String,
    store_icon: String,
    store_banner_code: String,
    store_contact_name: String,
    store_contact_email: String,
    store_contact_number: String,
    store_url: String,
    store_meta_title: String,
    store_meta_description: String,
    store_meta_keyword: String,
    store_featured: Number,
    store_status: Number,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "update_at" } }
);

StoreSchema.plugin(normalize);

module.exports = mongoose.model("Store", StoreSchema);
