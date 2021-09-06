import mongoose from "mongoose";
const Schema = mongoose.Schema;
import normalize from "normalize-mongoose";

/**
 * @swagger
 * components:
 *  schemas:
 *    Resources.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewResource:
 *      properties:
 *        name:
 *          type: string
 *        description:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Resources.Filter:
 *      properties:
 *        name:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Resources:
 *      properties:
 *        name:
 *          type: string
 *        description:
 *          type: string
 *        status:
 *          type: boolean
 */

let ResourcesSchema = new Schema(
  {
    name: String,
    description: String,
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "update_at" } }
);

ResourcesSchema.plugin(normalize);

module.exports = mongoose.model("Resources", ResourcesSchema);
