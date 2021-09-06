"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _normalizeMongoose = _interopRequireDefault(require("normalize-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;

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
let RolesSchema = new Schema({
  name: String,
  description: String,
  status: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "update_at"
  }
});
RolesSchema.plugin(_normalizeMongoose.default);
module.exports = _mongoose.default.model("Roles", RolesSchema);