import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import normalize from 'normalize-mongoose';

/**
 * @swagger
 * components:
 *  schemas:
 *    OLPostBack.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewOLPostBack:
 *      properties:
 *        data:
 *          type: object
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Store.Filter:
 *      properties:
 *        ol_id:
 *          type: string
 */


/**
 * @swagger
 * components:
 *  schemas:
 *    OLPostBack:
 *      properties:
 *        data:
 *          type: object
 */

let OLPostBackSchema = new Schema(
  {data : JSON},
  { timestamps: { createdAt: "created_at", updatedAt: "update_at" } }
);

OLPostBackSchema.plugin(normalize);

module.exports = mongoose.model("OLPostBack", OLPostBackSchema);
