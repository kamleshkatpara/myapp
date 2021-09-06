import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import normalize from 'normalize-mongoose';

/**
 * @swagger
 * components:
 *  schemas:
 *    FollowCategory.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewFollowCategory:
 *      properties:
 *        user_id:
 *          type: string
 *        category_id:
 *          type: string
 *        category_name:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    FollowCategory.Filter:
 *      properties:
 *        user_id:
 *          type: string
 */


/**
 * @swagger
 * components:
 *  schemas:
 *    FollowCategory:
 *      properties:
 *        user_id:
 *          type: string
 *        category_id:
 *          type: string
 *        category_name:
 *          type: string
 */

let FollowCategorySchema = new Schema(
  {
    user_id: String,
    category_id: String,
    category_name: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "update_at" } }
);

FollowCategorySchema.plugin(normalize);

module.exports = mongoose.model("FollowCategory", FollowCategorySchema);
