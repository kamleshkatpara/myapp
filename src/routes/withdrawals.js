import express from "express";
const router = express.Router();
import WithDrawals from "../models/withdrawal.model";

/**
 * @swagger
 * /withdrawals/count:
 *   get:
 *     tags:
 *       - WithDrawals
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
 *         description: WithDrawal model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/WithDrawal.Count'
 */
router.get("/count", function (req, res, next) {
  const filterBy = req.query.where;

  WithDrawals.count(
    JSON.parse(filterBy).additionalProp1 ? {} : JSON.parse(filterBy),
    function (error, count) {
      if (error) {
        res.status(500).send({
          error : {
            statusCode: 500,
            name: "Server Error",
            message: error.message || "Some error occurred while getting WithDrawals count.",
            code: "SOMETHING_WENT_WRONG"
          }
        });
      } else {
        res.status(200).json({ count: count });
      }
    }
  );
});

/**
 * @swagger
 * /withdrawals/{id}:
 *   put:
 *     tags:
 *       - WithDrawals
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
 *                    $ref: '#/components/schemas/WithDrawal'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                     description: WithDrawal PUT success
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
        code: "ENTITY_ID_NOT_FOUND"
      },
    });
  }
  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: "Bad Request",
        message: "Entity body missing: WithDrawal body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      },
    });
  }
  WithDrawals.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((withdrawal) => {
      if (!withdrawal) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: WithDrawal with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      res.status(200).send(withdrawal);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: WithDrawal with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error : {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating WithDrawal with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG"
        }
      });
    });
});

/**
 * @swagger
 * /withdrawals/{id}:
 *   patch:
 *     tags:
 *       - WithDrawals
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
 *            $ref: '#/components/schemas/WithDrawal'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                      description: "WithDrawal PATCH success"
 */
router.patch("/:id", function (req, res, next) {
  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: "Bad Request",
        message: "Entity body missing: WithDrawal body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      }
    });
  }
  WithDrawals.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((withdrawal) => {
      if (!withdrawal) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: WithDrawal with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND"
          }
        });
      }
      res.status(200).send(withdrawal);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: WithDrawal with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND"
          }
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating WithDrawal with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG"
        }
      });
    });
});

/**
 * @swagger
 * /withdrawals/{id}:
 *   get:
 *     tags:
 *       - WithDrawals
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
 *                   redemption_id:
 *                     type: boolean
 *                   type:
 *                     type: boolean
 *                   amount:
 *                     type: boolean
 *                   status:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - user_id
 *                   - user_name
 *                   - redemption_id
 *                   - type
 *                   - amount
 *                   - status
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: WithDrawal model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/WithDrawal'
 */
router.get("/:id", function (req, res, next) {
  const filterBy = req.query.filter;

  const allFields = JSON.parse(filterBy).fields;

  for (const withDrawalKey in allFields) {
    if (allFields[withDrawalKey] == false) {
      delete allFields[withDrawalKey];
    }
  }

  WithDrawals.findById(req.params.id, allFields)
    .then((withdrawal) => {
      if (!withdrawal) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: withdrawal with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      res.status(200).send(withdrawal);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: WithDrawal with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error retrieving WithDrawal with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /withdrawals/{id}:
 *   delete:
 *     tags:
 *       - WithDrawals
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
 *                    description: WithDrawal DELETE success
 */
router.delete("/:id", function (req, res, next) {
  WithDrawals.findByIdAndRemove(req.params.id)
    .then((withdrawal) => {
      if (!withdrawal)
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: WithDrawal with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      res.status(200).send({ message: "WithDrawal deleted successfully" });
    })
    .catch((error) => {
      if (error.kind === "ObjectId" || error.name === "NotFound") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: WithDrawal with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error deleting WithDrawal with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /withdrawals:
 *   post:
 *     tags:
 *       - WithDrawals
 *     operationId: create
 *     consumes:
 *        - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/WithDrawal'
 *     responses:
 *      200:
 *         description: WithDrawal model instance
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/WithDrawal'
 */
router.post("/", function (req, res, next) {
  try {
    if (Object.keys(req.body).length == 0) {
      return res.status(400).send({
        error: {
          statusCode: 400,
          name: "Bad Request",
          message: "Entity body missing: WithDrawal body data can not be empty",
          code: "ENTITY_BODY_MISSING"
        }
      });
    }

    const withdrawal = new WithDrawals({
      user_id: req.body.user_id,
      user_name: req.body.user_name,
      redemption_id: req.body.redemption_id,
      type: req.body.type,
      amount: req.body.amount,
      status: req.body.status,
    });

    withdrawal
      .save()
      .then((withdrawal) => {
        res.status(200).send(withdrawal);
      })
      .catch((error) => {
        res.status(500).send({
          error: {
            statusCode: 500,
            name: "Server Error",
            message: error.message || `Error creating WithDrawal`,
            code: "SOMETHING_WENT_WRONG",
          },
        });
      });
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error creating WithDrawal`,
        code: "SOMETHING_WENT_WRONG",
      },
    });
  }
});

/**
 * @swagger
 * /withdrawals:
 *   patch:
 *     tags:
 *       - WithDrawals
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
 *            $ref: '#/components/schemas/WithDrawal'
 *     responses:
 *       200:
 *         description: WithDrawal PATCH success count
 *         content:
 *             application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/WithDrawal.Count'
 */
router.patch("/", function (req, res, next) {
  const filterBy = req.query.where;

  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        message: "WithDrawal body can not be empty",
      },
    });
  }
  WithDrawals.findOneAndUpdate(filterBy, { $set: req.body }, { new: true })
    .then((withdrawal) => {
      if (!withdrawal) {
        return res.status(404).send({
          message: "WithDrawal not found with id " + req.params.id,
        });
      }
      res.status(200).send(withdrawal);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: WithDrawal with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating WithDrawal with id ${req.params.id}`,
          code: 'SOMETHING_WENT_WRONG'
        },
      });
    });
});

/**
 * @swagger
 * /withdrawals:
 *   get:
 *     tags:
 *       - WithDrawals
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
 *                   redemption_id:
 *                     type: boolean
 *                   type:
 *                     type: boolean
 *                   amount:
 *                     type: boolean
 *                   status:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - user_id
 *                   - user_name
 *                   - redemption_id
 *                   - type
 *                   - amount
 *                   - status
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of WithDrawal model instances
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/WithDrawal'
 */
router.get("/", function (req, res, next) {
  const filterBy = req.query.filter;

  const allFields = JSON.parse(filterBy).fields;

  for (const withDrawalKey in allFields) {
    if (allFields[withDrawalKey] == false) {
      delete allFields[withDrawalKey];
    }
  }

  WithDrawals.find(
    JSON.parse(filterBy).where.additionalProp1
      ? {}
      : JSON.parse(filterBy).where,
    allFields
  )
    .skip(JSON.parse(filterBy).offset || JSON.parse(filterBy).skip)
    .limit(JSON.parse(filterBy).limit)
    .sort(JSON.parse(filterBy).order)
    .then((withdrawals) => {
      res.status(200).send(withdrawals);
    })
    .catch((error) => {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message:
            error.message || "Some error occurred while retrieving WithDrawals.",
          code: 'SOMETHING_WENT_WRONG'

        },
      });
    });
});

module.exports = router;
