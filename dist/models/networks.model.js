"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _normalizeMongoose = _interopRequireDefault(require("normalize-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;

/**
 * @swagger
 * components:
 *  schemas:
 *    Networks.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewNetwork:
 *      properties:
 *        network_id:
 *          type: string
 *        network_name:
 *          type: string
 *        affiliate_id:
 *          type: string
 *        api_key:
 *          type: string
 *        private_key:
 *          type: string
 *        transaction_conversion_duration:
 *          type: string
 *        direct_store_id:
 *          type: string
 *        login_link:
 *          type: string
 *        api_url:
 *          type: string
 *        network_status:
 *          type: string
 *        network_username:
 *          type: string
 *        network_password:
 *          type: string
 *        status:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Network.Filter:
 *      properties:
 *        network_name:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Network:
 *      properties:
 *        network_id:
 *          type: string
 *        network_name:
 *          type: string
 *        affiliate_id:
 *          type: string
 *        api_key:
 *          type: string
 *        private_key:
 *          type: string
 *        transaction_conversion_duration:
 *          type: string
 *        direct_store_id:
 *          type: string
 *        login_link:
 *          type: string
 *        api_url:
 *          type: string
 *        network_status:
 *          type: string
 *        network_username:
 *          type: string
 *        network_password:
 *          type: string
 *        status:
 *          type: string
 */
let NetworkSchema = new Schema({
  network_id: String,
  network_name: String,
  affiliate_id: String,
  api_key: String,
  private_key: String,
  transaction_conversion_duration: String,
  direct_store_id: String,
  login_link: String,
  api_url: String,
  network_status: String,
  network_username: String,
  network_password: String,
  status: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "update_at"
  }
});
NetworkSchema.plugin(_normalizeMongoose.default);
module.exports = _mongoose.default.model("Network", NetworkSchema);