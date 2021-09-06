"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _normalizeMongoose = _interopRequireDefault(require("normalize-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;

/**
 * @swagger
 * components:
 *  schemas:
 *    Users.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    UserLoginRequest:
 *      properties:
 *        username:
 *          type: string
 *        password:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    RefreshTokenRequest:
 *      properties:
 *        refresh_token:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    RefreshTokenResponse:
 *      properties:
 *        success:
 *          type: boolean
 *          default: true
 *        accessToken:
 *          type: object
 *          default: {"id": "", "ttl": format-date, "created": "", "user_id": ""}
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    UserCheckRequest:
 *      properties:
 *        mobile_number:
 *          type: string
 *        email_address:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    UserCheckResponse:
 *      properties:
 *        exists:
 *          type: boolean
 *          default: null
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    UserAccessTokens:
 *      properties:
 *        id:
 *          type: string
 *        ttl:
 *          type: string
 *          default: 1209600
 *        scopes:
 *          type: array
 *          default: ["string"]
 *        created:
 *          type: string
 *          format: date-time
 *        user_id:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewUserRequest:
 *      properties:
 *        provider:
 *          type: string
 *          default: ''
 *        realm:
 *          type: string
 *          default: ''
 *        email:
 *          type: string
 *          default: ''
 *        email_verified:
 *          type: boolean
 *          default: false
 *        full_name:
 *          type: string
 *          default: ''
 *        mobile_number:
 *          type: string
 *          default: ''
 *        mobile_number_verified:
 *          type: boolean
 *          default: false
 *        password:
 *          type: string
 *          default: ''
 *        referal_code_used:
 *          type: string
 *          default: ''
 *        refered_by_id:
 *          type: string
 *          default: ''
 *        user_referal_code:
 *          type: string
 *          default: ''
 *        otp_retries:
 *          type: number
 *          default: 0
 *        referral_code:
 *          type: string
 *          default: ''
 *        referred_from_id:
 *          type: number
 *          default: ''
 *        source:
 *          type: string
 *          default: ''
 *        gender:
 *          type: string
 *          default: ''
 *        city:
 *          type: string
 *          default: ''
 *        pan_number:
 *          type: string
 *          default: ''
 *        aadhar_number:
 *          type: string
 *          default: ''
 *        passport_number:
 *          type: string
 *          default: ''
 *        company:
 *          type: string
 *          default: ''
 *        bank_cards:
 *          type: string
 *          default: ''
 *        relationship_status:
 *          type: string
 *          default: ''
 *        anniversary_date:
 *          type: string
 *          default: ''
 *        date_of_birth:
 *          type: string
 *          default: ''
 *        user_name:
 *          type: string
 *          default: ''
 *        role:
 *          type: string
 *          default: ''
 *        status:
 *          type: string
 *          default: 'active'
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewUserResponse:
 *      properties:
 *        success:
 *          type: boolean
 *          default: null
 *        access_token:
 *          type: object
 *          default:
 *            {
 *              "id": "",
 *              "ttl": "",
 *              "created": "",
 *              "user_id": ""
 *            }
 *        refresh_token:
 *          type: object
 *          default:
 *            {
 *              "id": "",
 *              "ttl": "",
 *              "created": "",
 *              "user_id": ""
 *            }
 *        user:
 *          type: object
 *          default:
 *            {
 *              "id": "",
 *              "provider": "",
 *              "realm": "",
 *              "email": "",
 *              "email_verified": false,
 *              "full_name": "",
 *              "mobile_number": null,
 *              "mobile_number_verified": false,
 *              "referal_code_used": "",
 *              "refered_by_id": "",
 *              "user_referal_code": "",
 *              "otp_retries": null,
 *              "referral_code": "",
 *              "referred_from_id": null,
 *              "source": "",
 *              "gender": "",
 *              "city": "",
 *              "pan_number": "",
 *              "aadhar_number": "",
 *              "passport_number": "",
 *              "company": "",
 *              "bank_cards": "",
 *              "relationship_status": "",
 *              "anniversary_date": "",
 *              "date_of_birth": "",
 *              "user_name": "",
 *              "status": ""
 *            }
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Users.Filter:
 *      properties:
 *        user_name:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Users:
 *      properties:
 *        id:
 *          type: string
 *        provider:
 *          type: string
 *        realm:
 *          type: string
 *        email:
 *          type: string
 *        email_verified:
 *          type: boolean
 *        full_name:
 *          type: string
 *        mobile_number:
 *          type: string
 *        mobile_number_verified:
 *          type: boolean
 *        referal_code_used:
 *          type: string
 *        refered_by_id:
 *          type: string
 *        user_referal_code:
 *          type: string
 *        otp_retries:
 *          type: number
 *        referral_code:
 *          type: string
 *        referred_from_id:
 *          type: number
 *        source:
 *          type: string
 *        gender:
 *          type: string
 *        city:
 *          type: string
 *        pan_number:
 *          type: string
 *        aadhar_number:
 *          type: string
 *        passport_number:
 *          type: string
 *        company:
 *          type: string
 *        bank_cards:
 *          type: string
 *        relationship_status:
 *          type: string
 *        anniversary_date:
 *          type: string
 *        date_of_birth:
 *          type: string
 *        user_name:
 *          type: string
 *        role:
 *          type: string
 *        status:
 *          type: string
 */
let UsersSchema = new Schema({
  provider: {
    type: String,
    required: false,
    default: ""
  },
  realm: {
    type: String,
    required: false,
    default: ""
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    default: ""
  },
  email_verified: {
    type: Boolean,
    required: false,
    default: false
  },
  full_name: {
    type: String,
    required: true,
    default: ""
  },
  mobile_number: {
    type: String,
    required: true,
    unique: true,
    default: null
  },
  mobile_number_verified: {
    type: Boolean,
    required: false,
    default: false
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: false,
    default: ""
  },
  referal_code_used: {
    type: String,
    required: false,
    default: ""
  },
  refered_by_id: {
    type: Number,
    required: false,
    default: ""
  },
  user_referal_code: {
    type: String,
    required: false,
    default: ""
  },
  otp_retries: {
    type: Number,
    required: false,
    default: 0
  },
  referral_code: {
    type: String,
    required: false,
    default: ""
  },
  referred_from_id: {
    type: Number,
    required: false,
    default: ""
  },
  source: {
    type: String,
    required: false,
    default: ""
  },
  gender: {
    type: String,
    required: false,
    default: ""
  },
  city: {
    type: String,
    required: false,
    default: ""
  },
  pan_number: {
    type: String,
    required: false,
    // unique: true,
    default: ""
  },
  aadhar_number: {
    type: String,
    required: false,
    // unique: true,
    default: ""
  },
  passport_number: {
    type: String,
    required: false,
    // unique: true,
    default: ""
  },
  company: {
    type: String,
    required: false,
    default: ""
  },
  bank_cards: {
    type: Array,
    required: false,
    default: []
  },
  relationship_status: {
    type: String,
    required: false,
    default: ""
  },
  anniversary_date: {
    type: String,
    required: false,
    default: ""
  },
  date_of_birth: {
    type: String,
    required: false,
    default: ""
  },
  user_name: {
    type: String,
    required: true,
    unique: true,
    default: ""
  },
  role: {
    type: String,
    required: true,
    default: ""
  },
  status: {
    type: String,
    required: true,
    default: "active"
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "update_at"
  }
});
UsersSchema.plugin(_normalizeMongoose.default);
UsersSchema.methods = {
  createAccessToken: function () {
    try {
      let {
        id,
        provider,
        realm,
        email,
        email_verified,
        full_name,
        mobile_number,
        mobile_number_verified,
        referal_code_used,
        refered_by_id,
        user_referal_code,
        otp_retries,
        referral_code,
        referred_from_id,
        source,
        gender,
        city,
        pan_number,
        aadhar_number,
        passport_number,
        company,
        bank_cards,
        relationship_status,
        anniversary_date,
        date_of_birth,
        user_name,
        role
      } = this;

      let accessToken = _jsonwebtoken.default.sign({
        user: {
          id,
          provider,
          realm,
          email,
          email_verified,
          full_name,
          mobile_number,
          mobile_number_verified,
          referal_code_used,
          refered_by_id,
          user_referal_code,
          otp_retries,
          referral_code,
          referred_from_id,
          source,
          gender,
          city,
          pan_number,
          aadhar_number,
          passport_number,
          company,
          bank_cards,
          relationship_status,
          anniversary_date,
          date_of_birth,
          user_name,
          role
        }
      }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      });

      return accessToken;
    } catch (error) {
      console.error(error);
      return;
    }
  },
  createRefreshToken: function () {
    try {
      let {
        id,
        provider,
        realm,
        email,
        email_verified,
        full_name,
        mobile_number,
        mobile_number_verified,
        referal_code_used,
        refered_by_id,
        user_referal_code,
        otp_retries,
        referral_code,
        referred_from_id,
        source,
        gender,
        city,
        pan_number,
        aadhar_number,
        passport_number,
        company,
        bank_cards,
        relationship_status,
        anniversary_date,
        date_of_birth,
        user_name,
        role
      } = this;

      let refreshToken = _jsonwebtoken.default.sign({
        user: {
          id,
          provider,
          realm,
          email,
          email_verified,
          full_name,
          mobile_number,
          mobile_number_verified,
          referal_code_used,
          refered_by_id,
          user_referal_code,
          otp_retries,
          referral_code,
          referred_from_id,
          source,
          gender,
          city,
          pan_number,
          aadhar_number,
          passport_number,
          company,
          bank_cards,
          relationship_status,
          anniversary_date,
          date_of_birth,
          user_name,
          role
        }
      }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      });

      return refreshToken;
    } catch (error) {
      console.error(error);
      return;
    }
  }
};
UsersSchema.pre("save", async function (next) {
  try {
    let salt = await _bcrypt.default.genSalt(12);
    this.salt = salt;
    let hashedPassword = await _bcrypt.default.hash(this.password, salt);
    this.password = hashedPassword;
  } catch (error) {
    console.error(error);
  }

  return next();
});
module.exports = _mongoose.default.model("Users", UsersSchema);