import express from "express";
const router = express.Router();
import ProfitSummary from "../models/profitsummary.model";

/**
 * @swagger
 * /profitsummary/count:
 *   get:
 *     tags:
 *       - ProfitSummary
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
 *         description: ProfitSummary model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/ProfitSummary.Count'
 */
router.get("/count", function (req, res, next) {
  const filterBy = req.query.where;

  ProfitSummary.count(
    JSON.parse(filterBy).additionalProp1 ? {} : JSON.parse(filterBy),
    function (error, count) {
      if (error) {
        res.status(500).send({
          error : {
            statusCode: 500,
            name: "Server Error",
            message: error.message || "Some error occurred while getting ProfitSummary count.",
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
 * /profitsummary/{id}:
 *   put:
 *     tags:
 *       - ProfitSummary
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
 *                    $ref: '#/components/schemas/ProfitSummary'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                     description: ProfitSummary PUT success
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
        message: "Entity body missing: ProfitSummary body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      },
    });
  }
  ProfitSummary.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((profitsummary) => {
      if (!profitsummary) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: ProfitSummary with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      res.status(200).send(profitsummary);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: ProfitSummary with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error : {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating ProfitSummary with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG"
        }
      });
    });
});

/**
 * @swagger
 * /profitsummary/{id}:
 *   patch:
 *     tags:
 *       - ProfitSummary
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
 *            $ref: '#/components/schemas/ProfitSummary'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                      description: "ProfitSummary PATCH success"
 */
router.patch("/:id", function (req, res, next) {
  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: "Bad Request",
        message: "Entity body missing: ProfitSummary body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      }
    });
  }
  ProfitSummary.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((profitsummary) => {
      if (!profitsummary) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: ProfitSummary with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND"
          }
        });
      }
      res.status(200).send(profitsummary);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: ProfitSummary with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND"
          }
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating ProfitSummary with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG"
        }
      });
    });
});

/**
 * @swagger
 * /profitsummary/{id}:
 *   get:
 *     tags:
 *       - ProfitSummary
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
 *                   total:
 *                     type: boolean
 *                   tracked_cashback:
 *                     type: boolean
 *                   validated_cashback:
 *                     type: boolean
 *                   payable_cashback:
 *                     type: boolean
 *                   claimed_cashback:
 *                     type: boolean
 *                   rejected_cashback:
 *                     type: boolean
 *                   total_earned_cashback:
 *                     type: boolean
 *                   user_id:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - total
 *                   - tracked_cashback
 *                   - validated_cashback
 *                   - payable_cashback
 *                   - claimed_cashback
 *                   - rejected_cashback
 *                   - total_earned_cashback
 *                   - user_id
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: ProfitSummary model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/ProfitSummary'
 */
router.get("/:id", function (req, res, next) {
  const filterBy = req.query.filter;

  const allFields = JSON.parse(filterBy).fields;

  for (const profitSummaryKey in allFields) {
    if (allFields[profitSummaryKey] == false) {
      delete allFields[profitSummaryKey];
    }
  }

  ProfitSummary.findById(req.params.id, allFields)
    .then((profitsummary) => {
      if (!profitsummary) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: ProfitSummary with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      res.status(200).send(profitsummary);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: ProfitSummary with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error retrieving ProfitSummary with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /profitsummary/{id}:
 *   delete:
 *     tags:
 *       - ProfitSummary
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
 *                    description: ProfitSummary DELETE success
 */
router.delete("/:id", function (req, res, next) {
  ProfitSummary.findByIdAndRemove(req.params.id)
    .then((profitsummary) => {
      if (!profitsummary)
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: ProfitSummary with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      res.status(200).send({ message: "ProfitSummary deleted successfully" });
    })
    .catch((error) => {
      if (error.kind === "ObjectId" || error.name === "NotFound") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: ProfitSummary with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error deleting ProfitSummary with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /profitsummary:
 *   post:
 *     tags:
 *       - ProfitSummary
 *     operationId: create
 *     consumes:
 *        - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/ProfitSummary'
 *     responses:
 *      200:
 *         description: ProfitSummary model instance
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProfitSummary'
 */
router.post("/", function (req, res, next) {
  try {
    if (Object.keys(req.body).length == 0) {
      return res.status(400).send({
        error: {
          statusCode: 400,
          name: "Bad Request",
          message: "Entity body missing: ProfitSummary body data can not be empty",
          code: "ENTITY_BODY_MISSING"
        }
      });
    }

    const profitsummary = new ProfitSummary({
      total: req.body.total,
      tracked_cashback: req.body.tracked_cashback,
      validated_cashback: req.body.validated_cashback,
      payable_cashback: req.body.payable_cashback,
      claimed_cashback: req.body.claimed_cashback,
      rejected_cashback: req.body.rejected_cashback,
      total_earned_cashback: req.body.total_earned_cashback,
      user_id: req.body.user_id,
    });

    profitsummary
      .save()
      .then((profitsummary) => {
        res.status(200).send(profitsummary);
      })
      .catch((error) => {
        res.status(500).send({
          error: {
            statusCode: 500,
            name: "Server Error",
            message: error.message || `Error creating ProfitSummary`,
            code: "SOMETHING_WENT_WRONG",
          },
        });
      });
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error creating ProfitSummary`,
        code: "SOMETHING_WENT_WRONG",
      },
    });
  }
});

/**
 * @swagger
 * /profitsummary:
 *   patch:
 *     tags:
 *       - ProfitSummary
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
 *            $ref: '#/components/schemas/ProfitSummary'
 *     responses:
 *       200:
 *         description: ProfitSummary PATCH success count
 *         content:
 *             application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/ProfitSummary.Count'
 */
router.patch("/", function (req, res, next) {
  const filterBy = req.query.where;

  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        message: "ProfitSummary body can not be empty",
      },
    });
  }
  ProfitSummary.findOneAndUpdate(filterBy, { $set: req.body }, { new: true })
    .then((profitsummary) => {
      if (!profitsummary) {
        return res.status(404).send({
          message: "ProfitSummary not found with id " + req.params.id,
        });
      }
      res.status(200).send(profitsummary);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: ProfitSummary with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating ProfitSummary with id ${req.params.id}`,
          code: 'SOMETHING_WENT_WRONG'
        },
      });
    });
});

/**
 * @swagger
 * /profitsummary:
 *   get:
 *     tags:
 *       - ProfitSummary
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
 *                   total:
 *                     type: boolean
 *                   tracked_cashback:
 *                     type: boolean
 *                   validated_cashback:
 *                     type: boolean
 *                   payable_cashback:
 *                     type: boolean
 *                   claimed_cashback:
 *                     type: boolean
 *                   rejected_cashback:
 *                     type: boolean
 *                   total_earned_cashback:
 *                     type: boolean
 *                   user_id:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - total
 *                   - tracked_cashback
 *                   - validated_cashback
 *                   - payable_cashback
 *                   - claimed_cashback
 *                   - rejected_cashback
 *                   - total_earned_cashback
 *                   - user_id
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of ProfitSummary model instances
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/ProfitSummary'
 */
router.get("/", function (req, res, next) {
  const filterBy = req.query.filter;

  const allFields = JSON.parse(filterBy).fields;

  for (const profitSummaryKey in allFields) {
    if (allFields[profitSummaryKey] == false) {
      delete allFields[profitSummaryKey];
    }
  }

  ProfitSummary.find(
    JSON.parse(filterBy).where.additionalProp1
      ? {}
      : JSON.parse(filterBy).where,
    allFields
  )
    .skip(JSON.parse(filterBy).offset || JSON.parse(filterBy).skip)
    .limit(JSON.parse(filterBy).limit)
    .sort(JSON.parse(filterBy).order)
    .then((profitsummary) => {
      res.status(200).send(profitsummary);
    })
    .catch((error) => {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message:
            error.message || "Some error occurred while retrieving ProfitSummary.",
          code: 'SOMETHING_WENT_WRONG'

        },
      });
    });
});

module.exports = router;
