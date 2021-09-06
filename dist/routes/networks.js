"use strict";

var _express = _interopRequireDefault(require("express"));

var _networks = _interopRequireDefault(require("../models/networks.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

/**
 * @swagger
 * /networks/count:
 *   get:
 *     tags:
 *       - Networks
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
 *         description: Network model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/Network.Count'
 */
router.get("/count", function (req, res, next) {
  const filterBy = req.query.where;

  _networks.default.count(JSON.parse(filterBy).additionalProp1 ? {} : JSON.parse(filterBy), function (error, count) {
    if (error) {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || "Some error occurred while getting Networks count.",
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
 * /networks/{id}:
 *   put:
 *     tags:
 *       - Networks
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
 *                    $ref: '#/components/schemas/Network'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                     description: Network PUT success
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
        message: "Entity body missing: Network body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      }
    });
  }

  _networks.default.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }).then(network => {
    if (!network) {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: Network with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    res.status(200).send(network);
  }).catch(error => {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: Network with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error updating Network with id ${req.params.id}`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  });
});
/**
 * @swagger
 * /networks/{id}:
 *   patch:
 *     tags:
 *       - Networks
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
 *            $ref: '#/components/schemas/Network'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                      description: "Network PATCH success"
 */

router.patch("/:id", function (req, res, next) {
  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: "Bad Request",
        message: "Entity body missing: Network body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      }
    });
  }

  _networks.default.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, {
    new: true
  }).then(network => {
    if (!network) {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: Network with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    res.status(200).send(network);
  }).catch(error => {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: Network with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error updating Network with id ${req.params.id}`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  });
});
/**
 * @swagger
 * /networks/{id}:
 *   get:
 *     tags:
 *       - Networks
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
 *                   network_id:
 *                     type: boolean
 *                   network_name:
 *                     type: boolean
 *                   affiliate_id:
 *                     type: boolean
 *                   api_key:
 *                     type: boolean
 *                   private_key:
 *                     type: boolean
 *                   transaction_conversion_duration:
 *                     type: boolean
 *                   direct_store_id:
 *                     type: boolean
 *                   login_link:
 *                     type: boolean
 *                   api_url:
 *                     type: boolean
 *                   network_status:
 *                     type: boolean
 *                   network_username:
 *                     type: boolean
 *                   network_password:
 *                     type: boolean
 *                   status:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - network_id
 *                   - network_name
 *                   - affiliate_id
 *                   - api_key
 *                   - private_key
 *                   - transaction_conversion_duration
 *                   - direct_store_id
 *                   - login_link
 *                   - api_url
 *                   - network_status
 *                   - network_username
 *                   - network_password
 *                   - status
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Network model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/Network'
 */

router.get("/:id", function (req, res, next) {
  const filterBy = req.query.filter;
  const allFields = JSON.parse(filterBy).fields;

  for (const networkKey in allFields) {
    if (allFields[networkKey] == false) {
      delete allFields[networkKey];
    }
  }

  Network.findById(req.params.id, allFields).then(network => {
    if (!network) {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: Network with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    res.status(200).send(network);
  }).catch(error => {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: Network with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error retrieving Network with id ${req.params.id}`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  });
});
/**
 * @swagger
 * /networks/{id}:
 *   delete:
 *     tags:
 *       - Networks
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
 *                    description: Network DELETE success
 */

router.delete("/:id", function (req, res, next) {
  _networks.default.findByIdAndRemove(req.params.id).then(network => {
    if (!network) return res.status(404).send({
      error: {
        statusCode: 404,
        name: "Error",
        message: `Entity not found: Network with id ${req.params.id}`,
        code: "ENTITY_NOT_FOUND"
      }
    });
    res.status(200).send({
      message: "Network deleted successfully"
    });
  }).catch(error => {
    if (error.kind === "ObjectId" || error.name === "NotFound") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: Network with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error deleting Network with id ${req.params.id}`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  });
});
/**
 * @swagger
 * /networks:
 *   post:
 *     tags:
 *       - Networks
 *     operationId: create
 *     consumes:
 *        - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Network'
 *     responses:
 *      200:
 *         description: Network model instance
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/Network'
 */

router.post("/", function (req, res, next) {
  try {
    if (Object.keys(req.body).length == 0) {
      return res.status(400).send({
        error: {
          statusCode: 400,
          name: "Bad Request",
          message: "Entity body missing: Network body data can not be empty",
          code: "ENTITY_BODY_MISSING"
        }
      });
    }

    const network = new _networks.default({
      network_id: req.body.network_id,
      network_name: req.body.network_name,
      affiliate_id: req.body.affiliate_id,
      api_key: req.body.api_key,
      private_key: req.body.private_key,
      transaction_conversion_duration: req.body.transaction_conversion_duration,
      direct_store_id: req.body.direct_store_id,
      login_link: req.body.login_link,
      api_url: req.body.api_url,
      network_status: req.body.network_status,
      network_username: req.body.network_username,
      network_password: req.body.network_password,
      status: req.body.status
    });
    network.save().then(network => {
      res.status(200).send(network);
    }).catch(error => {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error creating Network`,
          code: "SOMETHING_WENT_WRONG"
        }
      });
    });
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error creating Network`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  }
});
/**
 * @swagger
 * /networks:
 *   patch:
 *     tags:
 *       - Networks
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
 *            $ref: '#/components/schemas/Network'
 *     responses:
 *       200:
 *         description: Network PATCH success count
 *         content:
 *             application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/Network.Count'
 */

router.patch("/", function (req, res, next) {
  const filterBy = req.query.where;

  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        message: "Network body can not be empty"
      }
    });
  }

  _networks.default.findOneAndUpdate(filterBy, {
    $set: req.body
  }, {
    new: true
  }).then(network => {
    if (!network) {
      return res.status(404).send({
        message: "Network not found with id " + req.params.id
      });
    }

    res.status(200).send(network);
  }).catch(error => {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: Network with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error updating Network with id ${req.params.id}`,
        code: 'SOMETHING_WENT_WRONG'
      }
    });
  });
});
/**
 * @swagger
 * /networks:
 *   get:
 *     tags:
 *       - Networks
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
 *                   network_id:
 *                     type: boolean
 *                   network_name:
 *                     type: boolean
 *                   affiliate_id:
 *                     type: boolean
 *                   api_key:
 *                     type: boolean
 *                   private_key:
 *                     type: boolean
 *                   transaction_conversion_duration:
 *                     type: boolean
 *                   direct_store_id:
 *                     type: boolean
 *                   login_link:
 *                     type: boolean
 *                   api_url:
 *                     type: boolean
 *                   network_status:
 *                     type: boolean
 *                   network_username:
 *                     type: boolean
 *                   network_password:
 *                     type: boolean
 *                   status:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - network_id
 *                   - network_name
 *                   - affiliate_id
 *                   - api_key
 *                   - private_key
 *                   - transaction_conversion_duration
 *                   - direct_store_id
 *                   - login_link
 *                   - api_url
 *                   - network_status
 *                   - network_username
 *                   - network_password
 *                   - status
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of Network model instances
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/Network'
 */

router.get("/", function (req, res, next) {
  const filterBy = req.query.filter;
  const allFields = JSON.parse(filterBy).fields;

  for (const networkKey in allFields) {
    if (allFields[networkKey] == false) {
      delete allFields[networkKey];
    }
  }

  _networks.default.find(JSON.parse(filterBy).where.additionalProp1 ? {} : JSON.parse(filterBy).where, allFields).skip(JSON.parse(filterBy).offset || JSON.parse(filterBy).skip).limit(JSON.parse(filterBy).limit).sort(JSON.parse(filterBy).order).then(networks => {
    res.status(200).send(networks);
  }).catch(error => {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || "Some error occurred while retrieving Networks.",
        code: 'SOMETHING_WENT_WRONG'
      }
    });
  });
});
module.exports = router;