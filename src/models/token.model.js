import mongoose from "mongoose";
const Schema = mongoose.Schema;
import normalize from "normalize-mongoose";

/**
 * @swagger
 * components:
 *  schemas:
 *    Token.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewToken:
 *      properties:
 *        access_token:
 *          type: string
 *        access_token_expires_at:
 *          type: string
 *        refresh_token:
 *          type: string
 *        refresh_token_expires_at:
 *          type: string
 *        mobile_number:
 *          type: string
 *        user_id:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Token.Filter:
 *      properties:
 *        mobile_number:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Token:
 *      properties:
 *        access_token:
 *          type: string
 *        access_token_expires_at:
 *          type: string
 *        refresh_token:
 *          type: string
 *        refresh_token_expires_at:
 *          type: string
 *        mobile_number:
 *          type: string
 *        user_id:
 *          type: string
 */

let TokenSchema = new Schema(
  {
    access_token: String,
    access_token_expires_at: String,
    refresh_token: String,
    refresh_token_expires_at: String,
    mobile_number: String,
    user_id: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "update_at" } }
);

TokenSchema.plugin(normalize);

module.exports = mongoose.model("Token", TokenSchema);
