"use strict";

var _express = _interopRequireDefault(require("express"));

var _usertransaction = _interopRequireDefault(require("../models/usertransaction.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

/**
 * @swagger
 * /usertransactions/count:
 *   get:
 *     tags:
 *       - UserTransactions
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
 *         description: UserTransactions model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/UserTransaction.Count'
 */
router.get("/count", function (req, res, next) {
  const filterBy = req.query.where;

  _usertransaction.default.count(JSON.parse(filterBy).additionalProp1 ? {} : JSON.parse(filterBy), function (error, count) {
    if (error) {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || "Some error occurred while getting UserTransactions count.",
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
 * /usertransactions/{id}:
 *   put:
 *     tags:
 *       - UserTransactions
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
 *                    $ref: '#/components/schemas/UserTransaction'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                     description: UserTransaction PUT success
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
        message: "Entity body missing: UserTransaction body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      }
    });
  }

  _usertransaction.default.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }).then(usertransaction => {
    if (!usertransaction) {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: UserTransaction with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    res.status(200).send(usertransaction);
  }).catch(error => {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: UserTransaction with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error updating UserTransaction with id ${req.params.id}`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  });
});
/**
 * @swagger
 * /usertransactions/{id}:
 *   patch:
 *     tags:
 *       - UserTransactions
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
 *            $ref: '#/components/schemas/UserTransaction'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                      description: "UserTransaction PATCH success"
 */

router.patch("/:id", function (req, res, next) {
  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: "Bad Request",
        message: "Entity body missing: UserTransaction body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      }
    });
  }

  _usertransaction.default.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, {
    new: true
  }).then(usertransaction => {
    if (!usertransaction) {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: UserTransaction with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    res.status(200).send(usertransaction);
  }).catch(error => {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: UserTransaction with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error updating UserTransaction with id ${req.params.id}`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  });
});
/**
 * @swagger
 * /usertransactions/{id}:
 *   get:
 *     tags:
 *       - UserTransactions
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
 *                   store_name:
 *                     type: boolean
 *                   network:
 *                     type: boolean
 *                   user_id:
 *                     type: boolean
 *                   click_time:
 *                     type: boolean
 *                   status:
 *                     type: boolean
 *                   payout:
 *                     type: boolean
 *                   payout_type:
 *                     type: boolean
 *                   type:
 *                     type: boolean
 *                   sale_amount:
 *                     type: boolean
 *                   transaction_time:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - store_name
 *                   - network
 *                   - user_id
 *                   - click_time
 *                   - status
 *                   - payout
 *                   - payout_type
 *                   - type
 *                   - sale_amount
 *                   - transaction_time
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: UserTransaction model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/UserTransaction'
 */

router.get("/:id", function (req, res, next) {
  const filterBy = req.query.filter;
  const allFields = JSON.parse(filterBy).fields;

  for (const userTransactionKey in allFields) {
    if (allFields[userTransactionKey] == false) {
      delete allFields[userTransactionKey];
    }
  }

  _usertransaction.default.findById(req.params.id, allFields).then(usertransaction => {
    if (!usertransaction) {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: UserTransaction with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    res.status(200).send(usertransaction);
  }).catch(error => {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: UserTransaction with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error retrieving UserTransaction with id ${req.params.id}`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  });
});
/**
 * @swagger
 * /usertransactions/{id}:
 *   delete:
 *     tags:
 *       - UserTransactions
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
 *                    description: UserTransaction DELETE success
 */

router.delete("/:id", function (req, res, next) {
  _usertransaction.default.findByIdAndRemove(req.params.id).then(usertransaction => {
    if (!usertransaction) return res.status(404).send({
      error: {
        statusCode: 404,
        name: "Error",
        message: `Entity not found: UserTransaction with id ${req.params.id}`,
        code: "ENTITY_NOT_FOUND"
      }
    });
    res.status(200).send({
      message: "UserTransaction deleted successfully"
    });
  }).catch(error => {
    if (error.kind === "ObjectId" || error.name === "NotFound") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: UserTransaction with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error deleting UserTransaction with id ${req.params.id}`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  });
});
/**
 * @swagger
 * /usertransactions:
 *   post:
 *     tags:
 *       - UserTransactions
 *     operationId: create
 *     consumes:
 *        - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/UserTransaction'
 *     responses:
 *      200:
 *         description: UserTransaction model instance
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserTransaction'
 */

router.post("/", function (req, res, next) {
  try {
    if (Object.keys(req.body).length == 0) {
      return res.status(400).send({
        error: {
          statusCode: 400,
          name: "Bad Request",
          message: "Entity body missing: UserTransaction body data can not be empty",
          code: "ENTITY_BODY_MISSING"
        }
      });
    }

    const usertransaction = new _usertransaction.default({
      store_name: req.body.store_name,
      network: req.body.network,
      user_id: req.body.user_id,
      click_time: req.body.click_time,
      status: req.body.status,
      payout: req.body.payout,
      payout_type: req.body.payout_type,
      type: req.body.type,
      sale_amount: req.body.sale_amount,
      transaction_time: req.body.transaction_time
    });
    usertransaction.save().then(usertransaction => {
      res.status(200).send(usertransaction);
    }).catch(error => {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error creating UserTransaction`,
          code: "SOMETHING_WENT_WRONG"
        }
      });
    });
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error creating UserTransaction`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  }
});
/**
 * @swagger
 * /usertransactions:
 *   patch:
 *     tags:
 *       - UserTransactions
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
 *            $ref: '#/components/schemas/UserTransaction'
 *     responses:
 *       200:
 *         description: UserTransaction PATCH success count
 *         content:
 *             application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/UserTransaction.Count'
 */

router.patch("/", function (req, res, next) {
  const filterBy = req.query.where;

  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        message: "UserTransaction body can not be empty"
      }
    });
  }

  _usertransaction.default.findOneAndUpdate(filterBy, {
    $set: req.body
  }, {
    new: true
  }).then(usertransaction => {
    if (!usertransaction) {
      return res.status(404).send({
        message: "UserTransaction not found with id " + req.params.id
      });
    }

    res.status(200).send(usertransaction);
  }).catch(error => {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: UserTransaction with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error updating UserTransaction with id ${req.params.id}`,
        code: 'SOMETHING_WENT_WRONG'
      }
    });
  });
});
/**
 * @swagger
 * /usertransactions:
 *   get:
 *     tags:
 *       - UserTransactions
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
 *                   store_name:
 *                     type: boolean
 *                   network:
 *                     type: boolean
 *                   user_id:
 *                     type: boolean
 *                   click_time:
 *                     type: boolean
 *                   status:
 *                     type: boolean
 *                   payout:
 *                     type: boolean
 *                   payout_type:
 *                     type: boolean
 *                   type:
 *                     type: boolean
 *                   sale_amount:
 *                     type: boolean
 *                   transaction_time:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - store_name
 *                   - network
 *                   - user_id
 *                   - click_time
 *                   - status
 *                   - payout
 *                   - payout_type
 *                   - type
 *                   - sale_amount
 *                   - transaction_time
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of UserTransaction model instances
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/UserTransaction'
 */

router.get("/", function (req, res, next) {
  const filterBy = req.query.filter;
  const allFields = JSON.parse(filterBy).fields;

  for (const userTransactionKey in allFields) {
    if (allFields[userTransactionKey] == false) {
      delete allFields[userTransactionKey];
    }
  }

  _usertransaction.default.find(JSON.parse(filterBy).where.additionalProp1 ? {} : JSON.parse(filterBy).where, allFields).skip(JSON.parse(filterBy).offset || JSON.parse(filterBy).skip).limit(JSON.parse(filterBy).limit).sort(JSON.parse(filterBy).order).then(usertransactions => {
    res.status(200).send(usertransactions);
  }).catch(error => {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || "Some error occurred while retrieving UserTransactions.",
        code: 'SOMETHING_WENT_WRONG'
      }
    });
  });
});
module.exports = router;