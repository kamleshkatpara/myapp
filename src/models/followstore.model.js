import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import normalize from 'normalize-mongoose';

/**
 * @swagger
 * components:
 *  schemas:
 *    FollowStore.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewFollowStore:
 *      properties:
 *        user_id:
 *          type: string
 *        store_id:
 *          type: string
 *        store_name:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    FollowStore.Filter:
 *      properties:
 *        user_id:
 *          type: string
 */


/**
 * @swagger
 * components:
 *  schemas:
 *    FollowStore:
 *      properties:
 *        user_id:
 *          type: string
 *        store_id:
 *          type: string
 *        store_name:
 *          type: string
 */

let FollowStoreSchema = new Schema(
  {
    user_id: String,
    store_id: String,
    store_name: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "update_at" } }
);

FollowStoreSchema.plugin(normalize);

module.exports = mongoose.model("FollowStore", FollowStoreSchema);
