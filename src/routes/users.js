import express from "express";
const router = express.Router();
import Users from "../models/users.model";
import Tokens from "../models/token.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import checkAuth from "../middlewares/checkauth";

/**
 * @swagger
 * /users/count:
 *   get:
 *     tags:
 *       - Users
 *     operationId: count
 *     parameters:
 *     - name: where
 *       in: query
 *       content:
 *        application/json:
 *         schema:
 *           type: object
 *           additionalProperties: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Users model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/Users.Count'
 */
router.get("/count", async (req, res, next) => {
  const filterBy = req.query.where;

  await Users.count(
    JSON.parse(filterBy).additionalProp1 ? {} : JSON.parse(filterBy),
    function (error, count) {
      if (error) {
        res.status(500).send({
          error: {
            statusCode: 500,
            name: "Server Error",
            message:
              error.message || "Some error occurred while getting Users count.",
            code: "SOMETHING_WENT_WRONG",
          },
        });
      } else {
        res.status(200).json({ count: count });
      }
    }
  );
});

/**
 * @swagger
 * /users/me:
 *   get:
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     operationId: user_me
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                    description: "User Me success"
 */
router.get("/me", checkAuth("users"), (req, res, next) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (error) {}
});

/**
 * @swagger
 * /users/{id}/accessTokens:
 *   get:
 *     tags:
 *       - Users
 *     operationId: get_user_accessTokens
 *     parameters:
 *     - name: id
 *       in: path
 *       schema:
 *          type: string
 *       required: true
 *     - name: filter
 *       in: query
 *       content:
 *        application/json:
 *         schema:
 *           type: object
 *           additionalProperties: true
 *           uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/UserAccessTokens'
 */
router.get("/:id/accessTokens", function (req, res, next) {
  try {
    return res.status(200).json({ success: ":id/accessTokens!" });
  } catch (error) {}
});

/**
 * @swagger
 * /users/{id}/accessTokens/count:
 *   get:
 *     tags:
 *       - Users
 *     operationId: get_user_accessTokens_count
 *     parameters:
 *     - name: id
 *       in: path
 *       schema:
 *          type: string
 *       required: true
 *     - name: where
 *       in: query
 *       content:
 *        application/json:
 *         schema:
 *           type: object
 *           additionalProperties: true
 *           uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/Users.Count'
 */
router.get("/:id/accessTokens/count", function (req, res, next) {
  return res.status(200).json({ success: "/:id/accessTokens/count" });
});

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     operationId: find
 *     parameters:
 *     - name: filter
 *       in: query
 *       content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *             offset:
 *               type: integer
 *               minimum: 0
 *             limit:
 *               type: integer
 *               minimum: 1
 *               example: 100
 *             skip:
 *              type: integer
 *              minimum: 0
 *             order:
 *               oneOf:
 *               - type: string
 *               - type: array
 *                 items:
 *                  type: string
 *             where:
 *              type: object
 *              additionalProperties: true
 *             fields:
 *               oneOf:
 *               - type: object
 *                 properties:
 *                   provider:
 *                     type: boolean
 *                   realm:
 *                     type: boolean
 *                   email:
 *                     type: boolean
 *                   email_verified:
 *                     type: boolean
 *                   full_name:
 *                     type: boolean
 *                   mobile_number:
 *                     type: boolean
 *                   mobile_number_verified:
 *                     type: boolean
 *                   salt:
 *                     type: string
 *                   referal_code_used:
 *                     type: boolean
 *                   refered_by_id:
 *                     type: boolean
 *                   user_referal_code:
 *                     type: boolean
 *                   otp_retries:
 *                     type: boolean
 *                   referral_code:
 *                     type: boolean
 *                   referred_from_id:
 *                     type: boolean
 *                   source:
 *                     type: boolean
 *                   gender:
 *                     type: boolean
 *                   city:
 *                     type: boolean
 *                   pan_number:
 *                     type: boolean
 *                   aadhar_number:
 *                     type: boolean
 *                   passport_number:
 *                     type: boolean
 *                   company:
 *                     type: boolean
 *                   bank_cards:
 *                     type: boolean
 *                   relationship_status:
 *                      type: boolean
 *                   anniversary_date:
 *                     type: boolean
 *                   date_of_birth:
 *                     type: boolean
 *                   user_name:
 *                     type: boolean
 *                   verification_status:
 *                     type: boolean
 *                   verification_token:
 *                     type: boolean
 *                   status:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - provider
 *                   - realm
 *                   - email
 *                   - email_verified
 *                   - full_name
 *                   - mobile_number
 *                   - mobile_number_verified
 *                   - salt
 *                   - referal_code_used
 *                   - refered_by_id
 *                   - user_referal_code
 *                   - otp_retries
 *                   - referral_code
 *                   - referred_from_id
 *                   - source
 *                   - gender
 *                   - city
 *                   - pan_number
 *                   - aadhar_number
 *                   - passport_number
 *                   - company
 *                   - bank_cards
 *                   - relationship_status
 *                   - anniversary_date
 *                   - date_of_birth
 *                   - user_name
 *                   - verification_status
 *                   - verification_token
 *                   - status
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of User model instances
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/NewUserRequest'
 */
router.get("/", async (req, res, next) => {
  const filterBy = req.query.filter;

  const allFields = JSON.parse(filterBy).fields;

  for (const userKey in allFields) {
    if (allFields[userKey] == false) {
      delete allFields[userKey];
    }
  }

  await Users.find(
    JSON.parse(filterBy).where.additionalProp1
      ? {}
      : JSON.parse(filterBy).where,
    allFields
  )
    .skip(JSON.parse(filterBy).offset || JSON.parse(filterBy).skip)
    .limit(JSON.parse(filterBy).limit)
    .sort(JSON.parse(filterBy).order)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message:
            error.message || "Some error occurred while retrieving Users.",
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /users/findOne:
 *   get:
 *     tags:
 *       - Users
 *     operationId: user_findOne
 *     parameters:
 *     - name: filter
 *       in: query
 *       schema:
 *          type: string
 *       required: true
 *     produces:
 *       - application/json
 *     responses:
 *      200:
 *         description: User model instance
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 */
router.get("/findOne", function (req, res, next) {
  try {
    return res.status(200).json({ success: "findOne" });
  } catch (error) {}
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     operationId: findById
 *     parameters:
 *     - name: id
 *       in: path
 *       schema:
 *          type: string
 *       required: true
 *     - name: filter
 *       in: query
 *       content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *             fields:
 *               oneOf:
 *               - type: object
 *                 properties:
 *                   provider:
 *                     type: boolean
 *                   realm:
 *                     type: boolean
 *                   email:
 *                     type: boolean
 *                   email_verified:
 *                     type: boolean
 *                   full_name:
 *                     type: boolean
 *                   mobile_number:
 *                     type: boolean
 *                   mobile_number_verified:
 *                     type: boolean
 *                   salt:
 *                     type: string
 *                   referal_code_used:
 *                     type: boolean
 *                   refered_by_id:
 *                     type: boolean
 *                   user_referal_code:
 *                     type: boolean
 *                   otp_retries:
 *                     type: boolean
 *                   referral_code:
 *                     type: boolean
 *                   referred_from_id:
 *                     type: boolean
 *                   source:
 *                     type: boolean
 *                   gender:
 *                     type: boolean
 *                   city:
 *                     type: boolean
 *                   pan_number:
 *                     type: boolean
 *                   aadhar_number:
 *                     type: boolean
 *                   passport_number:
 *                     type: boolean
 *                   company:
 *                     type: boolean
 *                   bank_cards:
 *                     type: boolean
 *                   relationship_status:
 *                      type: boolean
 *                   anniversary_date:
 *                     type: boolean
 *                   date_of_birth:
 *                     type: boolean
 *                   user_name:
 *                     type: boolean
 *                   verification_status:
 *                     type: boolean
 *                   verification_token:
 *                     type: boolean
 *                   status:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - provider
 *                   - realm
 *                   - email
 *                   - email_verified
 *                   - full_name
 *                   - mobile_number
 *                   - mobile_number_verified
 *                   - salt
 *                   - referal_code_used
 *                   - refered_by_id
 *                   - user_referal_code
 *                   - otp_retries
 *                   - referral_code
 *                   - referred_from_id
 *                   - source
 *                   - gender
 *                   - city
 *                   - pan_number
 *                   - aadhar_number
 *                   - passport_number
 *                   - company
 *                   - bank_cards
 *                   - relationship_status
 *                   - anniversary_date
 *                   - date_of_birth
 *                   - user_name
 *                   - verification_status
 *                   - verification_token
 *                   - status
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/NewUserRequest'
 */
router.get("/:id", async (req, res, next) => {
  const filterBy = req.query.filter;

  const allFields = filterBy ? JSON.parse(filterBy).fields : {};

  for (const userKey in allFields) {
    if (allFields[userKey] == false) {
      delete allFields[userKey];
    }
  }

  await Users.findById(req.params.id, allFields)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: User with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: User with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message:
            error.message || `Error retrieving User with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     operationId: create
 *     consumes:
 *        - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/NewUserRequest'
 *     responses:
 *      200:
 *         description: User model instance
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/NewUserResponse'
 */
router.post("/", async (req, res, next) => {
  try {
    if (Object.keys(req.body).length == 0) {
      return res.status(400).send({
        error: {
          statusCode: 400,
          name: "Bad Request",
          message: "Entity body missing: User body data can not be empty",
          code: "ENTITY_BODY_MISSING",
        },
      });
    }

    let user = await Users.findOne({ username: req.body.user_name });

    if (user) {
      return res
        .status(400)
        .json({ error: "Account with this mobile number already exists!" });
    } else {
      user = await new Users(req.body).save();

      let accessToken = await user.createAccessToken();
      let refreshToken = await user.createRefreshToken();

      const addGeneratedTokens = await new Tokens({
        access_token: accessToken,
        access_token_expires_at: process.env.ACCESS_TOKEN_EXPIRES_IN,
        refresh_token: refreshToken,
        refresh_token_expires_at: process.env.REFRESH_TOKEN_EXPIRES_IN,
        mobile_number: req.body.mobile_number,
        user_id: user.id,
      }).save();

      return res.status(201).json({
        success: true,
        accessToken: {
          id: addGeneratedTokens.access_token,
          ttl: addGeneratedTokens.access_token_expires_at,
          created: addGeneratedTokens.created_at,
          user_id: addGeneratedTokens.user_id,
        },
        refreshToken: {
          id: addGeneratedTokens.refresh_token,
          ttl: addGeneratedTokens.refresh_token_expires_at,
          created: addGeneratedTokens.created_at,
          user_id: addGeneratedTokens.user_id,
        },
        user: {
          id: user.id,
          provider: user.provider,
          realm: user.realm,
          email: user.email,
          email_verified: user.email_verified,
          full_name: user.full_name,
          mobile_number: user.mobile_number,
          mobile_number_verified: user.mobile_number_verified,
          referal_code_used: user.referal_code_used,
          refered_by_id: user.refered_by_id,
          user_referal_code: user.user_referal_code,
          otp_retries: user.otp_retries,
          referral_code: user.referral_code,
          referred_from_id: user.referred_from_id,
          source: user.source,
          gender: user.gender,
          city: user.city,
          pan_number: user.pan_number,
          aadhar_number: user.aadhar_number,
          passport_number: user.passport_number,
          company: user.company,
          bank_cards: user.bank_cards,
          relationship_status: user.relationship_status,
          anniversary_date: user.anniversary_date,
          date_of_birth: user.date_of_birth,
          user_name: user.user_name,
          status: user.status,
        },
      });
    }
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error creating User`,
        code: "SOMETHING_WENT_WRONG",
      },
    });
  }
});

/**
 * @swagger
 * /users/{id}/accessTokens:
 *   post:
 *     tags:
 *       - Users
 *     operationId: create_user_accessTokens
 *     parameters:
 *     - name: id
 *       in: path
 *       schema:
 *          type: string
 *       required: true
 *     - name: data
 *       in: query
 *       content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             ttl:
 *               type: number
 *               default: 1209600
 *             scopes:
 *               type: array
 *               default: ["string"]
 *             created:
 *               type: string
 *               format: date-time
 *             user_id:
 *               type: string
 *           additionalProperties: false
 *           uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/UserAccessTokens'
 */
router.post("/:id/accessTokens", function (req, res, next) {});

/**
 * @swagger
 * /users/changepassword:
 *   post:
 *     tags:
 *       - Users
 *     operationId: user_changePassword
 *     parameters:
 *     - name: oldPassword
 *       in: path
 *       schema:
 *          type: string
 *       required: true
 *     - name: newPassword
 *       in: path
 *       schema:
 *          type: string
 *       required: true
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                    description: "User Password Change success"
 */
router.post("/changepassword", function (req, res, next) {});

/**
 * @swagger
 * /users/resetpassword:
 *   post:
 *     tags:
 *       - Users
 *     operationId: user_setPassword
 *     parameters:
 *     - name: newPassword
 *       in: path
 *       schema:
 *          type: string
 *       required: true
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                    description: "User Password Reset success"
 */
router.post("/resetpassword", function (req, res, next) {});

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - Users
 *     operationId: login
 *     consumes:
 *        - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/UserLoginRequest'
 *     responses:
 *      200:
 *         description: APICronLog model instance
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/NewUserResponse'
 */

router.post("/login", async (req, res, next) => {
  try {
    if (Object.keys(req.body).length == 0) {
      return res.status(400).send({
        error: {
          statusCode: 400,
          name: "Bad Request",
          message: "Entity body missing: User body data can not be empty",
          code: "ENTITY_BODY_MISSING",
        },
      });
    } else {
      let user = await Users.findOne({ username: req.body.user_name });
      if (user.status === "inactive") {
        return res.status(403).json({ error: "Account Deactivated!" });
      }
      if (!user) {
        return res.status(404).json({ error: "Account does not exists!" });
      } else {
        let valid = await bcrypt.compare(req.body.password, user.password);
        if (valid) {
          let accessToken = await user.createAccessToken();
          let refreshToken = await user.createRefreshToken();

          return res.status(201).json({
            success: true,
            accessToken: {
              id: accessToken,
              ttl: process.env.ACCESS_TOKEN_EXPIRES_IN,
              created: new Date(),
              user_id: user.id,
            },
            refreshToken: {
              id: refreshToken,
              ttl: process.env.REFRESH_TOKEN_EXPIRES_IN,
              created: new Date(),
              user_id: user.id,
            },
            user: {
              id: user.id,
              provider: user.provider,
              realm: user.realm,
              email: user.email,
              email_verified: user.email_verified,
              full_name: user.full_name,
              mobile_number: user.mobile_number,
              mobile_number_verified: user.mobile_number_verified,
              referal_code_used: user.referal_code_used,
              refered_by_id: user.refered_by_id,
              user_referal_code: user.user_referal_code,
              otp_retries: user.otp_retries,
              referral_code: user.referral_code,
              referred_from_id: user.referred_from_id,
              source: user.source,
              gender: user.gender,
              city: user.city,
              pan_number: user.pan_number,
              aadhar_number: user.aadhar_number,
              passport_number: user.passport_number,
              company: user.company,
              bank_cards: user.bank_cards,
              relationship_status: user.relationship_status,
              anniversary_date: user.anniversary_date,
              date_of_birth: user.date_of_birth,
              user_name: user.user_name,
              status: user.status,
            },
          });
        } else {
          //send error if password is invalid
          return res.status(401).json({ error: "Invalid Credentials!" });
        }
      }
    }
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error`,
        code: "SOMETHING_WENT_WRONG",
      },
    });
  }
});

/**
 * @swagger
 * /users/refreshtoken:
 *   post:
 *     tags:
 *       - Users
 *     operationId: refreshToken
 *     consumes:
 *        - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/RefreshTokenRequest'
 *     responses:
 *      200:
 *         description: User model instance
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/RefreshTokenResponse'
 */

router.post("/refreshtoken", async (req, res, next) => {
  try {
    if (Object.keys(req.body).length == 0) {
      return res.status(400).send({
        error: {
          statusCode: 400,
          name: "Bad Request",
          message: "Entity body missing: Token body data can not be empty",
          code: "ENTITY_BODY_MISSING",
        },
      });
    } else {
      const { refresh_token } = req.body;
      if (!refresh_token) {
        return res.status(403).json({ error: "Access denied,token missing!" });
      } else {
        const tokenDoc = await Tokens.findOne({ refresh_token: refresh_token });
        if (!tokenDoc) {
          return res.status(401).json({ error: "RefreshToken has expired!" });
        } else {
          const payload = jwt.verify(
            tokenDoc.refresh_token,
            process.env.REFRESH_TOKEN_SECRET
          );
          const accessToken = jwt.sign(
            { user: payload },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
            }
          );
          return res.status(200).json({
            success: true,
            accessToken: {
              id: accessToken,
              ttl: process.env.ACCESS_TOKEN_EXPIRES_IN,
              created: new Date(),
              user_id: payload.user._id,
            },
          });
        }
      }
    }
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error creating User`,
        code: "SOMETHING_WENT_WRONG",
      },
    });
  }
});

/**
 * @swagger
 * /users/check:
 *   post:
 *     tags:
 *       - Users
 *     operationId: check
 *     consumes:
 *        - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/UserCheckRequest'
 *     responses:
 *      200:
 *         description: User Check model instance
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserCheckResponse'
 */

router.post("/check", function (req, res, next) {
  res.send(req.body);
});

/**
 * @swagger
 * /users/logout:
 *   post:
 *     tags:
 *       - Users
 *     operationId: user_logout
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refresh_token:
 *                 type: string
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                    description: "User Logout success"
 */
router.post("/logout", async (req, res, next) => {
  try {
    const { refresh_token } = req.body;
    await Tokens.findOneAndDelete({ refresh_token: refresh_token });
    return res.status(200).json({ success: "User logged out!" });
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error creating User`,
        code: "SOMETHING_WENT_WRONG",
      },
    });
  }
});

/**
 * @swagger
 * /users/update:
 *   post:
 *     tags:
 *       - Users
 *     operationId: user_updateAll
 *     parameters:
 *     - name: where
 *       in: where
 *       content:
 *        application/json:
 *         schema:
 *           type: object
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/NewUserRequest'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/UserAccessTokens'
 */
router.post("/update", function (req, res, next) {});

/**
 * @swagger
 * /users:
 *   patch:
 *     tags:
 *       - Users
 *     operationId: updateAll
 *     parameters:
 *     - name: where
 *       in: query
 *       content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *             additionalProp1:
 *               type: object
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/NewUserRequest'
 *     responses:
 *       200:
 *         description: User PATCH success count
 *         content:
 *             application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/Users.Count'
 */
router.patch("/", function (req, res, next) {
  const filterBy = req.query.where;

  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        message: "User body can not be empty",
      },
    });
  }
  Users.findOneAndUpdate(filterBy, { $set: req.body }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: User with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message:
            error.message || `Error updating User with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     tags:
 *       - Users
 *     operationId: updateById
 *     parameters:
 *     - name: id
 *       in: path
 *       schema:
 *          type: string
 *       required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/NewUserRequest'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                      description: "User PATCH success"
 */
router.patch("/:id", function (req, res, next) {
  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: "Bad Request",
        message: "Entity body missing: User body data can not be empty",
        code: "ENTITY_BODY_MISSING",
      },
    });
  }
  Users.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: User with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: User with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message:
            error.message || `Error updating User with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /users/{id}/accessTokens:
 *   delete:
 *     tags:
 *       - Users
 *     operationId: delete_user_accessTokens
 *     parameters:
 *     - name: id
 *       in: path
 *       schema:
 *          type: string
 *       required: true
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                     description: User AccessToken Delete success
 */
router.delete("/:id/accessTokens", function (req, res, next) {});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     operationId: deleteById
 *     parameters:
 *     - name: id
 *       in: path
 *       schema:
 *          type: string
 *       required: true
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                 schema:
 *                    description: User DELETE success
 */
router.delete("/:id", function (req, res, next) {
  Users.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (!user)
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: User with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      res.status(200).send({ message: "User deleted successfully" });
    })
    .catch((error) => {
      if (error.kind === "ObjectId" || error.name === "NotFound") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: User with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message:
            error.message || `Error deleting User with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     operationId: replaceById
 *     parameters:
 *     - name: id
 *       in: path
 *       schema:
 *          type: string
 *       required: true
 *     requestBody:
 *        content:
 *            application/json:
 *                schema:
 *                    $ref: '#/components/schemas/NewUserRequest'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                     description: User PUT success
 */
router.put("/:id", function (req, res, next) {
  if (typeof req.params.id !== "string") {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: "Error",
        message: `id property (id) cannot be updated from ${
          req.params.id
        } to ${typeof req.params.id}`,
        code: "ENTITY_ID_NOT_FOUND",
      },
    });
  }
  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: "Bad Request",
        message: "Entity body missing: User body data can not be empty",
        code: "ENTITY_BODY_MISSING",
      },
    });
  }
  Users.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: User with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: User with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message:
            error.message || `Error updating User with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

module.exports = router;
