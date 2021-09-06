"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _normalizeMongoose = _interopRequireDefault(require("normalize-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;

/**
 * @swagger
 * components:
 *  schemas:
 *    Carousel.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewCarousel:
 *      properties:
 *        carousel_image:
 *          type: string
 *        carousel_text:
 *          type: string
 *        carousel_link:
 *          type: string
 *        carousel_type:
 *          type: string
 *        status:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Carousel.Filter:
 *      properties:
 *        carousel_image:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Carousel:
 *      properties:
 *        carousel_image:
 *          type: string
 *        carousel_text:
 *          type: string
 *        carousel_link:
 *          type: string
 *        carousel_type:
 *          type: string
 *        status:
 *          type: string
 */
let CarouselSchema = new Schema({
  carousel_image: String,
  carousel_text: String,
  carousel_link: String,
  carousel_type: String,
  status: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "update_at"
  }
});
CarouselSchema.plugin(_normalizeMongoose.default);
module.exports = _mongoose.default.model("Carousel", CarouselSchema);