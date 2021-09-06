"use strict";

var _express = _interopRequireDefault(require("express"));

var _usertracking = _interopRequireDefault(require("../models/usertracking.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

/**
 * @swagger
 * /usertracking/count:
 *   get:
 *     tags:
 *       - UserTracking
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
 *         description: UserTracking model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/UserTracking.Count'
 */
router.get("/count", function (req, res, next) {
  const filterBy = req.query.where;

  _usertracking.default.count(JSON.parse(filterBy).additionalProp1 ? {} : JSON.parse(filterBy), function (error, count) {
    if (error) {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || "Some error occurred while getting UserTracking count.",
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
 * /usertracking/{id}:
 *   put:
 *     tags:
 *       - UserTracking
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
 *                    $ref: '#/components/schemas/UserTracking'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                     description: UserTracking PUT success
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
        message: "Entity body missing: UserTracking body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      }
    });
  }

  _usertracking.default.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }).then(usertracking => {
    if (!usertracking) {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: UserTracking with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    res.status(200).send(usertracking);
  }).catch(error => {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: UserTracking with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error updating UserTracking with id ${req.params.id}`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  });
});
/**
 * @swagger
 * /usertracking/{id}:
 *   patch:
 *     tags:
 *       - UserTracking
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
 *            $ref: '#/components/schemas/UserTracking'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                      description: "UserTracking PATCH success"
 */

router.patch("/:id", function (req, res, next) {
  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: "Bad Request",
        message: "Entity body missing: UserTracking body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      }
    });
  }

  _usertracking.default.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, {
    new: true
  }).then(usertracking => {
    if (!usertracking) {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: UserTracking with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    res.status(200).send(usertracking);
  }).catch(error => {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: UserTracking with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error updating UserTracking with id ${req.params.id}`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  });
});
/**
 * @swagger
 * /usertracking/{id}:
 *   get:
 *     tags:
 *       - UserTracking
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
 *                   browser:
 *                     type: boolean
 *                   operating_system:
 *                     type: boolean
 *                   device:
 *                     type: boolean
 *                   ip_address:
 *                     type: boolean
 *                   country:
 *                     type: boolean
 *                   city:
 *                     type: boolean
 *                   region:
 *                     type: boolean
 *                   user_id:
 *                     type: boolean
 *                   url:
 *                     type: boolean
 *                   og_url:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - browser
 *                   - operating_system
 *                   - device
 *                   - ip_address
 *                   - country
 *                   - city
 *                   - region
 *                   - user_id
 *                   - url
 *                   - og_url
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: UserTracking model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/UserTracking'
 */

router.get("/:id", function (req, res, next) {
  const filterBy = req.query.filter;
  const allFields = JSON.parse(filterBy).fields;

  for (const userTrackingKey in allFields) {
    if (allFields[userTrackingKey] == false) {
      delete allFields[userTrackingKey];
    }
  }

  _usertracking.default.findById(req.params.id, allFields).then(usertracking => {
    if (!usertracking) {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: UserTracking with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    res.status(200).send(usertracking);
  }).catch(error => {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: UserTracking with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error retrieving UserTracking with id ${req.params.id}`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  });
});
/**
 * @swagger
 * /usertracking/{id}:
 *   delete:
 *     tags:
 *       - UserTracking
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
 *                    description: UserTracking DELETE success
 */

router.delete("/:id", function (req, res, next) {
  _usertracking.default.findByIdAndRemove(req.params.id).then(usertracking => {
    if (!usertracking) return res.status(404).send({
      error: {
        statusCode: 404,
        name: "Error",
        message: `Entity not found: UserTracking with id ${req.params.id}`,
        code: "ENTITY_NOT_FOUND"
      }
    });
    res.status(200).send({
      message: "UserTracking deleted successfully"
    });
  }).catch(error => {
    if (error.kind === "ObjectId" || error.name === "NotFound") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: UserTracking with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error deleting UserTracking with id ${req.params.id}`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  });
});
/**
 * @swagger
 * /usertracking:
 *   post:
 *     tags:
 *       - UserTracking
 *     operationId: create
 *     consumes:
 *        - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/UserTracking'
 *     responses:
 *      200:
 *         description: UserTracking model instance
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserTracking'
 */

router.post("/", function (req, res, next) {
  try {
    if (Object.keys(req.body).length == 0) {
      return res.status(400).send({
        error: {
          statusCode: 400,
          name: "Bad Request",
          message: "Entity body missing: UserTracking body data can not be empty",
          code: "ENTITY_BODY_MISSING"
        }
      });
    }

    const usertracking = new _usertracking.default({
      browser: req.body.browser,
      operating_system: req.body.operating_system,
      device: req.body.device,
      ip_address: req.body.ip_address,
      country: req.body.country,
      city: req.body.city,
      region: req.body.region,
      user_id: req.body.user_id,
      url: req.body.url,
      og_url: req.body.og_url
    });
    usertracking.save().then(usertracking => {
      res.status(200).send(usertracking);
    }).catch(error => {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error creating UserTracking`,
          code: "SOMETHING_WENT_WRONG"
        }
      });
    });
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error creating UserTracking`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  }
});
/**
 * @swagger
 * /usertracking:
 *   patch:
 *     tags:
 *       - UserTracking
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
 *            $ref: '#/components/schemas/UserTracking'
 *     responses:
 *       200:
 *         description: UserTracking PATCH success count
 *         content:
 *             application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/UserTracking.Count'
 */

router.patch("/", function (req, res, next) {
  const filterBy = req.query.where;

  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        message: "UserTracking body can not be empty"
      }
    });
  }

  _usertracking.default.findOneAndUpdate(filterBy, {
    $set: req.body
  }, {
    new: true
  }).then(usertracking => {
    if (!usertracking) {
      return res.status(404).send({
        message: "UserTracking not found with id " + req.params.id
      });
    }

    res.status(200).send(usertracking);
  }).catch(error => {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: UserTracking with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error updating UserTracking with id ${req.params.id}`,
        code: 'SOMETHING_WENT_WRONG'
      }
    });
  });
});
/**
 * @swagger
 * /usertracking:
 *   get:
 *     tags:
 *       - UserTracking
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
 *                   browser:
 *                     type: boolean
 *                   operating_system:
 *                     type: boolean
 *                   device:
 *                     type: boolean
 *                   ip_address:
 *                     type: boolean
 *                   country:
 *                     type: boolean
 *                   city:
 *                     type: boolean
 *                   region:
 *                     type: boolean
 *                   user_id:
 *                     type: boolean
 *                   url:
 *                     type: boolean
 *                   og_url:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - browser
 *                   - operating_system
 *                   - device
 *                   - ip_address
 *                   - country
 *                   - city
 *                   - region
 *                   - user_id
 *                   - url
 *                   - og_url
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of UserTracking model instances
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/UserTracking'
 */

router.get("/", function (req, res, next) {
  const filterBy = req.query.filter;
  const allFields = JSON.parse(filterBy).fields;

  for (const userTrackingKey in allFields) {
    if (allFields[userTrackingKey] == false) {
      delete allFields[userTrackingKey];
    }
  }

  _usertracking.default.find(JSON.parse(filterBy).where.additionalProp1 ? {} : JSON.parse(filterBy).where, allFields).skip(JSON.parse(filterBy).offset || JSON.parse(filterBy).skip).limit(JSON.parse(filterBy).limit).sort(JSON.parse(filterBy).order).then(usertracking => {
    res.status(200).send(usertracking);
  }).catch(error => {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || "Some error occurred while retrieving UserTracking.",
        code: 'SOMETHING_WENT_WRONG'
      }
    });
  });
});
module.exports = router;