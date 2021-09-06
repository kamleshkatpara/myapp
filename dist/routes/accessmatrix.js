"use strict";

var _express = _interopRequireDefault(require("express"));

var _accesses = _interopRequireDefault(require("../models/accesses.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

/**
 * @swagger
 * /accesses/count:
 *   get:
 *     tags:
 *       - Accesses
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
 *         description: Access model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/Accesses.Count'
 */
router.get("/count", function (req, res, next) {
  const filterBy = req.query.where;

  _accesses.default.count(JSON.parse(filterBy).additionalProp1 ? {} : JSON.parse(filterBy), function (error, count) {
    if (error) {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || "Some error occurred while getting Accesses count.",
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
 * /accesses/{id}:
 *   put:
 *     tags:
 *       - Accesses
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
 *                    $ref: '#/components/schemas/NewAccess'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                     description: Access PUT success
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
        message: "Entity body missing: Access body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      }
    });
  }

  _accesses.default.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }).then(access => {
    if (!access) {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: Access with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    res.status(200).send(access);
  }).catch(error => {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: Access with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error updating Access with id ${req.params.id}`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  });
});
/**
 * @swagger
 * /accesses/{id}:
 *   patch:
 *     tags:
 *       - Accesses
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
 *            $ref: '#/components/schemas/NewAccess'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                      description: "Access PATCH success"
 */

router.patch("/:id", function (req, res, next) {
  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: "Bad Request",
        message: "Entity body missing: Access body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      }
    });
  }

  _accesses.default.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, {
    new: true
  }).then(access => {
    if (!access) {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: Access with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    res.status(200).send(access);
  }).catch(error => {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: Access with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error updating Access with id ${req.params.id}`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  });
});
/**
 * @swagger
 * /accesses/{id}:
 *   get:
 *     tags:
 *       - Accesses
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
 *                   role:
 *                     type: boolean
 *                   resource:
 *                     type: boolean
 *                   permissions:
 *                     type: boolean
 *                   status:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - role
 *                   - resource
 *                   - permissions
 *                   - status
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Access model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/NewAccess'
 */

router.get("/:id", function (req, res, next) {
  const filterBy = req.query.filter;
  const allFields = JSON.parse(filterBy).fields;

  for (const accessKey in allFields) {
    if (allFields[accessKey] == false) {
      delete allFields[accessKey];
    }
  }

  _accesses.default.findById(req.params.id, allFields).then(access => {
    if (!access) {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: Access with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    res.status(200).send(access);
  }).catch(error => {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: Access with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error retrieving Access with id ${req.params.id}`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  });
});
/**
 * @swagger
 * /accesses/{id}:
 *   delete:
 *     tags:
 *       - Accesses
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
 *                    description: Access DELETE success
 */

router.delete("/:id", function (req, res, next) {
  _accesses.default.findByIdAndRemove(req.params.id).then(access => {
    if (!access) return res.status(404).send({
      error: {
        statusCode: 404,
        name: "Error",
        message: `Entity not found: Access with id ${req.params.id}`,
        code: "ENTITY_NOT_FOUND"
      }
    });
    res.status(200).send({
      message: "Access deleted successfully"
    });
  }).catch(error => {
    if (error.kind === "ObjectId" || error.name === "NotFound") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: Access with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error deleting Access with id ${req.params.id}`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  });
});
/**
 * @swagger
 * /accesses:
 *   post:
 *     tags:
 *       - Accesses
 *     operationId: create
 *     consumes:
 *        - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/NewAccess'
 *     responses:
 *      200:
 *         description: Access model instance
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/NewAccess'
 */

router.post("/", function (req, res, next) {
  try {
    if (Object.keys(req.body).length == 0) {
      return res.status(400).send({
        error: {
          statusCode: 400,
          name: "Bad Request",
          message: "Entity body missing: Access body data can not be empty",
          code: "ENTITY_BODY_MISSING"
        }
      });
    }

    const access = new _accesses.default({
      role: req.body.role,
      resource: req.body.resource,
      permission: req.body.permission,
      status: req.body.status
    });
    access.save().then(access => {
      res.status(200).send(access);
    }).catch(error => {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error creating Access`,
          code: "SOMETHING_WENT_WRONG"
        }
      });
    });
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error creating Access`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  }
});
/**
 * @swagger
 * /accesses:
 *   patch:
 *     tags:
 *       - Accesses
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
 *            $ref: '#/components/schemas/NewAccess'
 *     responses:
 *       200:
 *         description: Access PATCH success count
 *         content:
 *             application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/Accesses.Count'
 */

router.patch("/", function (req, res, next) {
  const filterBy = req.query.where;

  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        message: "Access body can not be empty"
      }
    });
  }

  _accesses.default.findOneAndUpdate(filterBy, {
    $set: req.body
  }, {
    new: true
  }).then(access => {
    if (!access) {
      return res.status(404).send({
        message: "Access not found with id " + req.params.id
      });
    }

    res.status(200).send(access);
  }).catch(error => {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: Access with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error updating Access with id ${req.params.id}`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  });
});
/**
 * @swagger
 * /accesses:
 *   get:
 *     tags:
 *       - Accesses
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
 *                   role:
 *                     type: boolean
 *                   resource:
 *                     type: boolean
 *                   permissions:
 *                     type: boolean
 *                   status:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - role
 *                   - resource
 *                   - permissions
 *                   - status
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of Access model instances
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/NewAccess'
 */

router.get("/", function (req, res, next) {
  const filterBy = req.query.filter;
  const allFields = JSON.parse(filterBy).fields;

  for (const accessKey in allFields) {
    if (allFields[accessKey] == false) {
      delete allFields[accessKey];
    }
  }

  _accesses.default.find(JSON.parse(filterBy).where.additionalProp1 ? {} : JSON.parse(filterBy).where, allFields).skip(JSON.parse(filterBy).offset || JSON.parse(filterBy).skip).limit(JSON.parse(filterBy).limit).sort(JSON.parse(filterBy).order).then(accesses => {
    res.status(200).send(accesses);
  }).catch(error => {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || "Some error occurred while retrieving accesses.",
        code: "SOMETHING_WENT_WRONG"
      }
    });
  });
});
module.exports = router;