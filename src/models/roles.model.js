import mongoose from "mongoose";
const Schema = mongoose.Schema;
import normalize from "normalize-mongoose";

/**
 * @swagger
 * components:
 *  schemas:
 *    Roles.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewRole:
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
 *    Roles.Filter:
 *      properties:
 *        name:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Roles:
 *      properties:
 *        name:
 *          type: string
 *        description:
 *          type: string
 *        status:
 *          type: boolean
 */

let RolesSchema = new Schema(
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

RolesSchema.plugin(normalize);

module.exports = mongoose.model("Roles", RolesSchema);
