import express from "express";
const router = express.Router();
import PayoutSetting from "../models/PayoutSetting.model";

/**
 * @swagger
 * /payoutsetting/count:
 *   get:
 *     tags:
 *       - PayoutSetting
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
 *         description: PayoutSetting model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/PayoutSetting.Count'
 */
router.get("/count", function (req, res, next) {
  const filterBy = req.query.where;

  PayoutSetting.count(
    JSON.parse(filterBy).additionalProp1 ? {} : JSON.parse(filterBy),
    function (error, count) {
      if (error) {
        res.status(500).send({
          error : {
            statusCode: 500,
            name: "Server Error",
            message: error.message || "Some error occurred while getting PayoutSetting count.",
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
 * /payoutsetting/{id}:
 *   put:
 *     tags:
 *       - PayoutSetting
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
 *                    $ref: '#/components/schemas/PayoutSetting'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                     description: PayoutSetting PUT success
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
        message: "Entity body missing: PayoutSetting body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      },
    });
  }
  PayoutSetting.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((payoutsetting) => {
      if (!payoutsetting) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: PayoutSetting with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      res.status(200).send(payoutsetting);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: PayoutSetting with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error : {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating PayoutSetting with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG"
        }
      });
    });
});

/**
 * @swagger
 * /payoutsetting/{id}:
 *   patch:
 *     tags:
 *       - PayoutSetting
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
 *            $ref: '#/components/schemas/PayoutSetting'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                      description: "PayoutSetting PATCH success"
 */
router.patch("/:id", function (req, res, next) {
  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: "Bad Request",
        message: "Entity body missing: PayoutSetting body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      }
    });
  }
  PayoutSetting.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((payoutsetting) => {
      if (!payoutsetting) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: PayoutSetting with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND"
          }
        });
      }
      res.status(200).send(payoutsetting);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: PayoutSetting with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND"
          }
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating PayoutSetting with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG"
        }
      });
    });
});

/**
 * @swagger
 * /payoutsetting/{id}:
 *   get:
 *     tags:
 *       - PayoutSetting
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
 *                   min_bank_transfer_amount:
 *                     type: boolean
 *                   wallet_redemption_amount:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - min_bank_transfer_amount
 *                   - wallet_redemption_amount
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: PayoutSetting model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/PayoutSetting'
 */
router.get("/:id", function (req, res, next) {
  const filterBy = req.query.filter;

  const allFields = JSON.parse(filterBy).fields;

  for (const payoutSettingKey in allFields) {
    if (allFields[payoutSettingKey] == false) {
      delete allFields[payoutSettingKey];
    }
  }

  PayoutSetting.findById(req.params.id, allFields)
    .then((payoutsetting) => {
      if (!payoutsetting) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: PayoutSetting with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      res.status(200).send(payoutsetting);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: PayoutSetting with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error retrieving PayoutSetting with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /payoutsetting/{id}:
 *   delete:
 *     tags:
 *       - PayoutSetting
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
 *                    description: PayoutSetting DELETE success
 */
router.delete("/:id", function (req, res, next) {
  PayoutSetting.findByIdAndRemove(req.params.id)
    .then((payoutsetting) => {
      if (!payoutsetting)
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: PayoutSetting with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      res.status(200).send({ message: "PayoutSetting deleted successfully" });
    })
    .catch((error) => {
      if (error.kind === "ObjectId" || error.name === "NotFound") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: PayoutSetting with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error deleting PayoutSetting with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /payoutsetting:
 *   post:
 *     tags:
 *       - PayoutSetting
 *     operationId: create
 *     consumes:
 *        - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/PayoutSetting'
 *     responses:
 *      200:
 *         description: PayoutSetting model instance
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/PayoutSetting'
 */
router.post("/", function (req, res, next) {
  try {
    if (Object.keys(req.body).length == 0) {
      return res.status(400).send({
        error: {
          statusCode: 400,
          name: "Bad Request",
          message: "Entity body missing: PayoutSetting body data can not be empty",
          code: "ENTITY_BODY_MISSING"
        }
      });
    }

    const payoutsetting = new PayoutSetting({
      min_bank_transfer_amount: req.body.min_bank_transfer_amount,
      wallet_redemption_amount: req.body.wallet_redemption_amount,
    });

    payoutsetting
      .save()
      .then((payoutsetting) => {
        res.status(200).send(payoutsetting);
      })
      .catch((error) => {
        res.status(500).send({
          error: {
            statusCode: 500,
            name: "Server Error",
            message: error.message || `Error creating PayoutSetting`,
            code: "SOMETHING_WENT_WRONG",
          },
        });
      });
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error creating PayoutSetting`,
        code: "SOMETHING_WENT_WRONG",
      },
    });
  }
});

/**
 * @swagger
 * /payoutsetting:
 *   patch:
 *     tags:
 *       - PayoutSetting
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
 *            $ref: '#/components/schemas/PayoutSetting'
 *     responses:
 *       200:
 *         description: PayoutSetting PATCH success count
 *         content:
 *             application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/PayoutSetting.Count'
 */
router.patch("/", function (req, res, next) {
  const filterBy = req.query.where;

  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        message: "PayoutSetting body can not be empty",
      },
    });
  }
  PayoutSetting.findOneAndUpdate(filterBy, { $set: req.body }, { new: true })
    .then((payoutsetting) => {
      if (!payoutsetting) {
        return res.status(404).send({
          message: "PayoutSetting not found with id " + req.params.id,
        });
      }
      res.status(200).send(payoutsetting);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: PayoutSetting with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating PayoutSetting with id ${req.params.id}`,
          code: 'SOMETHING_WENT_WRONG'
        },
      });
    });
});

/**
 * @swagger
 * /payoutsetting:
 *   get:
 *     tags:
 *       - PayoutSetting
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
 *                   min_bank_transfer_amount:
 *                     type: boolean
 *                   wallet_redemption_amount:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - min_bank_transfer_amount
 *                   - wallet_redemption_amount
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of PayoutSetting model instances
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/PayoutSetting'
 */
router.get("/", function (req, res, next) {
  const filterBy = req.query.filter;

  const allFields = JSON.parse(filterBy).fields;

  for (const payoutSettingKey in allFields) {
    if (allFields[payoutSettingKey] == false) {
      delete allFields[payoutSettingKey];
    }
  }

  PayoutSetting.find(
    JSON.parse(filterBy).where.additionalProp1
      ? {}
      : JSON.parse(filterBy).where,
    allFields
  )
    .skip(JSON.parse(filterBy).offset || JSON.parse(filterBy).skip)
    .limit(JSON.parse(filterBy).limit)
    .sort(JSON.parse(filterBy).order)
    .then((payoutsetting) => {
      res.status(200).send(payoutsetting);
    })
    .catch((error) => {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message:
            error.message || "Some error occurred while retrieving PayoutSetting.",
          code: 'SOMETHING_WENT_WRONG'

        },
      });
    });
});

module.exports = router;
