import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import normalize from 'normalize-mongoose';

/**
 * @swagger
 * components:
 *  schemas:
 *    Permissions.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewPermission:
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
 *    Permissions.Filter:
 *      properties:
 *        name:
 *          type: string
 */


/**
 * @swagger
 * components:
 *  schemas:
 *    Permissions:
 *      properties:
 *        name:
 *          type: string
 *        description:
 *          type: string
 *        status:
 *          type: boolean
 */

let PermissionsSchema = new Schema(
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

PermissionsSchema.plugin(normalize);

module.exports = mongoose.model("Permissions", PermissionsSchema);
