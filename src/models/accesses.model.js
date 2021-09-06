import mongoose from "mongoose";
const Schema = mongoose.Schema;
import normalize from "normalize-mongoose";

/**
 * @swagger
 * components:
 *  schemas:
 *    Accesses.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewAccess:
 *      properties:
 *        role:
 *          type: string
 *        resource:
 *          type: string
 *        permissions:
 *          type: array
 *          default: [{create: false, delete: false, update: false, read: false}]
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Accesses.Filter:
 *      properties:
 *        role:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Accesses:
 *      properties:
 *        role:
 *          type: string
 *        resource:
 *          type: string
 *        permissions:
 *          type: array
 *        status:
 *          type: boolean
 */

let AccessesSchema = new Schema(
  {
    role: String,
    resource: String,
    permissions: {
      type: Array,
      default: [
        {
          create: false,
          read: false,
          update: false,
          delete: false,
        },
      ],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "update_at" } }
);

AccessesSchema.plugin(normalize);

module.exports = mongoose.model("Accesses", AccessesSchema);
