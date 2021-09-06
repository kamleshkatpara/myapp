"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _normalizeMongoose = _interopRequireDefault(require("normalize-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;

/**
 * @swagger
 * components:
 *  schemas:
 *    Pages.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewPage:
 *      properties:
 *        title:
 *          type: string
 *        path:
 *          type: string
 *        content:
 *          type: string
 *        meta_title:
 *          type: string
 *        meta_content:
 *          type: string
 *        meta_keywords:
 *          type: string
 *        status:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Pages.Filter:
 *      properties:
 *        title:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Page:
 *      properties:
 *        title:
 *          type: string
 *        path:
 *          type: string
 *        content:
 *          type: string
 *        meta_title:
 *          type: string
 *        meta_content:
 *          type: string
 *        meta_keywords:
 *          type: string
 *        status:
 *          type: string
 */
let PageSchema = new Schema({
  title: String,
  path: String,
  content: String,
  meta_title: String,
  meta_content: String,
  meta_keywords: String,
  status: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "update_at"
  }
});
PageSchema.plugin(_normalizeMongoose.default);
module.exports = _mongoose.default.model("Page", PageSchema);