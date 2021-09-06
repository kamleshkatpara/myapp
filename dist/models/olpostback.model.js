"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _normalizeMongoose = _interopRequireDefault(require("normalize-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;

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
let OLPostBackSchema = new Schema({
  data: JSON
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "update_at"
  }
});
OLPostBackSchema.plugin(_normalizeMongoose.default);
module.exports = _mongoose.default.model("OLPostBack", OLPostBackSchema);