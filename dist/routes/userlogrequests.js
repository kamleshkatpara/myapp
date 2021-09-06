"use strict";

var _express = _interopRequireDefault(require("express"));

var _userlogrequest = _interopRequireDefault(require("../models/userlogrequest.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

/**
 * @swagger
 * /userlogrequests/count:
 *   get:
 *     tags:
 *       - UserLogRequests
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
 *         description: UserLogRequest model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/UserLogRequest.Count'
 */
router.get("/count", function (req, res, next) {
  const filterBy = req.query.where;

  _userlogrequest.default.count(JSON.parse(filterBy).additionalProp1 ? {} : JSON.parse(filterBy), function (error, count) {
    if (error) {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || "Some error occurred while getting UserLogRequests count.",
          code: "SOMETHING_WENT_WRONG"
        }
      });
    } else {
      res.status(200).json({
        count: count
      });
    }
  });
});
/**
 * @swagger
 * /userlogrequests/{id}:
 *   put:
 *     tags:
 *       - UserLogRequests
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
 *                    $ref: '#/components/schemas/UserLogRequest'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                     description: UserLogRequest PUT success
 */

router.put("/:id", function (req, res, next) {
  if (typeof req.params.id !== "string") {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: "Error",
        message: `id property (id) cannot be updated from ${req.params.id} to ${typeof req.params.id}`,
        code: "ENTITY_ID_NOT_FOUND"
      }
    });
  }

  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: "Bad Request",
        message: "Entity body missing: UserLogRequest body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      }
    });
  }

  _userlogrequest.default.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }).then(userlogrequests => {
    if (!userlogrequests) {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: UserLogRequest with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    res.status(200).send(userlogrequests);
  }).catch(error => {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: UserLogRequest with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error updating UserLogRequest with id ${req.params.id}`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  });
});
/**
 * @swagger
 * /userlogrequests/{id}:
 *   patch:
 *     tags:
 *       - UserLogRequests
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
 *            $ref: '#/components/schemas/UserLogRequest'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                      description: "UserLogRequest PATCH success"
 */

router.patch("/:id", function (req, res, next) {
  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: "Bad Request",
        message: "Entity body missing: UserLogRequest body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      }
    });
  }

  _userlogrequest.default.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, {
    new: true
  }).then(userlogrequests => {
    if (!userlogrequests) {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: UserLogRequest with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    res.status(200).send(userlogrequests);
  }).catch(error => {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: UserLogRequest with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error updating UserLogRequest with id ${req.params.id}`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  });
});
/**
 * @swagger
 * /userlogrequests/{id}:
 *   get:
 *     tags:
 *       - UserLogRequests
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
 *                   user_id:
 *                     type: boolean
 *                   user_name:
 *                     type: boolean
 *                   login_time:
 *                     type: boolean
 *                   ip:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - user_id
 *                   - user_name
 *                   - login_time
 *                   - ip
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: UserLogRequest model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/UserLogRequest'
 */

router.get("/:id", function (req, res, next) {
  const filterBy = req.query.filter;
  const allFields = JSON.parse(filterBy).fields;

  for (const userLogRequestsKey in allFields) {
    if (allFields[userLogRequestsKey] == false) {
      delete allFields[userLogRequestsKey];
    }
  }

  _userlogrequest.default.findById(req.params.id, allFields).then(userlogrequest => {
    if (!userlogrequest) {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: UserLogRequest with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    res.status(200).send(userlogrequest);
  }).catch(error => {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: UserLogRequest with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error retrieving UserLogRequest with id ${req.params.id}`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  });
});
/**
 * @swagger
 * /userlogrequests/{id}:
 *   delete:
 *     tags:
 *       - UserLogRequests
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
 *                    description: UserLogRequest DELETE success
 */

router.delete("/:id", function (req, res, next) {
  _userlogrequest.default.findByIdAndRemove(req.params.id).then(userlogrequest => {
    if (!userlogrequest) return res.status(404).send({
      error: {
        statusCode: 404,
        name: "Error",
        message: `Entity not found: UserLogRequest with id ${req.params.id}`,
        code: "ENTITY_NOT_FOUND"
      }
    });
    res.status(200).send({
      message: "UserLogRequest deleted successfully"
    });
  }).catch(error => {
    if (error.kind === "ObjectId" || error.name === "NotFound") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: UserLogRequest with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error deleting UserLogRequest with id ${req.params.id}`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  });
});
/**
 * @swagger
 * /userlogrequests:
 *   post:
 *     tags:
 *       - UserLogRequests
 *     operationId: create
 *     consumes:
 *        - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/UserLogRequest'
 *     responses:
 *      200:
 *         description: UserLogRequest model instance
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserLogRequest'
 */

router.post("/", function (req, res, next) {
  try {
    if (Object.keys(req.body).length == 0) {
      return res.status(400).send({
        error: {
          statusCode: 400,
          name: "Bad Request",
          message: "Entity body missing: UserLogRequest body data can not be empty",
          code: "ENTITY_BODY_MISSING"
        }
      });
    }

    const userlogrequest = new _userlogrequest.default({
      user_id: req.body.user_id,
      user_name: req.body.user_name,
      login_time: req.body.login_time,
      ip: req.body.ip
    });
    userlogrequest.save().then(userlogrequest => {
      res.status(200).send(userlogrequest);
    }).catch(error => {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error creating UserLogRequest`,
          code: "SOMETHING_WENT_WRONG"
        }
      });
    });
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error creating UserLogRequest`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  }
});
/**
 * @swagger
 * /userlogrequests:
 *   patch:
 *     tags:
 *       - UserLogRequests
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
 *            $ref: '#/components/schemas/UserLogRequest'
 *     responses:
 *       200:
 *         description: UserLogRequest PATCH success count
 *         content:
 *             application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/UserLogRequest.Count'
 */

router.patch("/", function (req, res, next) {
  const filterBy = req.query.where;

  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        message: "UserLogRequest body can not be empty"
      }
    });
  }

  _userlogrequest.default.findOneAndUpdate(filterBy, {
    $set: req.body
  }, {
    new: true
  }).then(userlogrequest => {
    if (!userlogrequest) {
      return res.status(404).send({
        message: "UserLogRequest not found with id " + req.params.id
      });
    }

    res.status(200).send(userlogrequest);
  }).catch(error => {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: UserLogRequest with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error updating UserLogRequest with id ${req.params.id}`,
        code: 'SOMETHING_WENT_WRONG'
      }
    });
  });
});
/**
 * @swagger
 * /userlogrequests:
 *   get:
 *     tags:
 *       - UserLogRequests
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
 *                   user_id:
 *                     type: boolean
 *                   user_name:
 *                     type: boolean
 *                   login_time:
 *                     type: boolean
 *                   ip:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - user_id
 *                   - user_name
 *                   - login_time
 *                   - ip
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of UserLogRequest model instances
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/UserLogRequest'
 */

router.get("/", function (req, res, next) {
  const filterBy = req.query.filter;
  const allFields = JSON.parse(filterBy).fields;

  for (const userLogRequestKey in allFields) {
    if (allFields[userLogRequestKey] == false) {
      delete allFields[userLogRequestKey];
    }
  }

  _userlogrequest.default.find(JSON.parse(filterBy).where.additionalProp1 ? {} : JSON.parse(filterBy).where, allFields).skip(JSON.parse(filterBy).offset || JSON.parse(filterBy).skip).limit(JSON.parse(filterBy).limit).sort(JSON.parse(filterBy).order).then(userlogrequests => {
    res.status(200).send(userlogrequests);
  }).catch(error => {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || "Some error occurred while retrieving UserLogRequests.",
        code: 'SOMETHING_WENT_WRONG'
      }
    });
  });
});
module.exports = router;