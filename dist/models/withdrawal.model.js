"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _normalizeMongoose = _interopRequireDefault(require("normalize-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;

/**
 * @swagger
 * components:
 *  schemas:
 *    WithDrawals.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewWithDrawal:
 *      properties:
 *        user_id:
 *          type: string
 *        user_name:
 *          type: string
 *        redemption_id:
 *          type: string
 *        type:
 *          type: string
 *        amount:
 *          type: string
 *        status:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    WithDrawals.Filter:
 *      properties:
 *        user_id:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    WithDrawal:
 *      properties:
 *        user_id:
 *          type: string
 *        user_name:
 *          type: string
 *        redemption_id:
 *          type: string
 *        type:
 *          type: string
 *        amount:
 *          type: string
 *        status:
 *          type: string
 */
let WithDrawalSchema = new Schema({
  user_id: String,
  user_name: String,
  redemption_id: String,
  type: String,
  amount: String,
  status: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "update_at"
  }
});
WithDrawalSchema.plugin(_normalizeMongoose.default);
module.exports = _mongoose.default.model("WithDrawal", WithDrawalSchema);