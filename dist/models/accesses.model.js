"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _normalizeMongoose = _interopRequireDefault(require("normalize-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;

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
let AccessesSchema = new Schema({
  role: String,
  resource: String,
  permissions: {
    type: Array,
    default: [{
      create: false,
      read: false,
      update: false,
      delete: false
    }]
  },
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
AccessesSchema.plugin(_normalizeMongoose.default);
module.exports = _mongoose.default.model("Accesses", AccessesSchema);