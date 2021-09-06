import express from "express";
const router = express.Router();
import MissingCashbackClaims from "../models/missingcashbackclaims.model";

/**
 * @swagger
 * /missingcashbackclaims/count:
 *   get:
 *     tags:
 *       - MissingCashbackClaims
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
 *         description: MissingCashbackClaims model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/MissingCashbackClaim.Count'
 */
router.get("/count", function (req, res, next) {
  const filterBy = req.query.where;

  MissingCashbackClaims.count(
    JSON.parse(filterBy).additionalProp1 ? {} : JSON.parse(filterBy),
    function (error, count) {
      if (error) {
        res.status(500).send({
          error : {
            statusCode: 500,
            name: "Server Error",
            message: error.message || "Some error occurred while getting MissingCashbackClaims count.",
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
 * /missingcashbackclaims/{id}:
 *   put:
 *     tags:
 *       - MissingCashbackClaims
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
 *                    $ref: '#/components/schemas/MissingCashbackClaim'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                     description: MissingCashbackClaim PUT success
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
        message: "Entity body missing: MissingCashbackClaim body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      },
    });
  }
  MissingCashbackClaims.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((missingcashbackclaim) => {
      if (!missingcashbackclaim) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: MissingCashbackClaim with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      res.status(200).send(missingcashbackclaim);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: MissingCashbackClaim with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error : {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating MissingCashbackClaim with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG"
        }
      });
    });
});

/**
 * @swagger
 * /missingcashbackclaims/{id}:
 *   patch:
 *     tags:
 *       - MissingCashbackClaims
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
 *            $ref: '#/components/schemas/MissingCashbackClaim'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                      description: "MissingCashbackClaim PATCH success"
 */
router.patch("/:id", function (req, res, next) {
  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: "Bad Request",
        message: "Entity body missing: MissingCashbackClaim body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      }
    });
  }
  MissingCashbackClaims.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((MissingCashbackClaims) => {
      if (!missingcashbackclaim) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: MissingCashbackClaim with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND"
          }
        });
      }
      res.status(200).send(missingcashbackclaim);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: MissingCashbackClaim with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND"
          }
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating MissingCashbackClaim with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG"
        }
      });
    });
});

/**
 * @swagger
 * /missingcashbackclaims/{id}:
 *   get:
 *     tags:
 *       - MissingCashbackClaims
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
 *                   ticket_id:
 *                     type: boolean
 *                   full_name:
 *                     type: boolean
 *                   order_id:
 *                     type: boolean
 *                   transaction_amount:
 *                     type: boolean
 *                   store_name:
 *                     type: boolean
 *                   click_id:
 *                     type: boolean
 *                   click_time:
 *                     type: boolean
 *                   description:
 *                     type: boolean
 *                   status:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - ticket_id
 *                   - full_name
 *                   - order_id
 *                   - transaction_amount
 *                   - store_name
 *                   - click_id
 *                   - click_time
 *                   - description
 *                   - status
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: MissingCashbackClaim model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/MissingCashbackClaim'
 */
router.get("/:id", function (req, res, next) {
  const filterBy = req.query.filter;

  const allFields = JSON.parse(filterBy).fields;

  for (const missingCashbackClaimKey in allFields) {
    if (allFields[missingCashbackClaimKey] == false) {
      delete allFields[missingCashbackClaimKey];
    }
  }

  MissingCashbackClaims.findById(req.params.id, allFields)
    .then((missingcashbackclaim) => {
      if (!missingcashbackclaim) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: MissingCashbackClaim with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      res.status(200).send(missingcashbackclaim);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: MissingCashbackClaim with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error retrieving MissingCashbackClaim with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /missingcashbackclaims/{id}:
 *   delete:
 *     tags:
 *       - MissingCashbackClaims
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
 *                    description: MissingCashbackClaim DELETE success
 */
router.delete("/:id", function (req, res, next) {
  MissingCashbackClaims.findByIdAndRemove(req.params.id)
    .then((missingcashbackclaim) => {
      if (!missingcashbackclaim)
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: MissingCashbackClaim with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      res.status(200).send({ message: "MissingCashbackClaim deleted successfully" });
    })
    .catch((error) => {
      if (error.kind === "ObjectId" || error.name === "NotFound") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: MissingCashbackClaim with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error deleting MissingCashbackClaim with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /missingcashbackclaims:
 *   post:
 *     tags:
 *       - MissingCashbackClaims
 *     operationId: create
 *     consumes:
 *        - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/MissingCashbackClaim'
 *     responses:
 *      200:
 *         description: MissingCashbackClaim model instance
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/MissingCashbackClaim'
 */
router.post("/", function (req, res, next) {
  try {
    if (Object.keys(req.body).length == 0) {
      return res.status(400).send({
        error: {
          statusCode: 400,
          name: "Bad Request",
          message: "Entity body missing: MissingCashbackClaim body data can not be empty",
          code: "ENTITY_BODY_MISSING"
        }
      });
    }

    const missingcashbackclaim = new MissingCashbackClaims({
      ticket_id: req.body.ticket_id,
      full_name: req.body.full_name,
      order_id: req.body.order_id,
      transaction_amount: req.body.transaction_amount,
      store_name: req.body.store_name,
      click_id: req.body.click_id,
      click_time: req.body.click_time,
      description: req.body.description,
      status: req.body.status,
    });

    missingcashbackclaim
      .save()
      .then((missingcashbackclaim) => {
        res.status(200).send(missingcashbackclaim);
      })
      .catch((error) => {
        res.status(500).send({
          error: {
            statusCode: 500,
            name: "Server Error",
            message: error.message || `Error creating MissingCashbackClaim`,
            code: "SOMETHING_WENT_WRONG",
          },
        });
      });
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error creating MissingCashbackClaim`,
        code: "SOMETHING_WENT_WRONG",
      },
    });
  }
});

/**
 * @swagger
 * /missingcashbackclaims:
 *   patch:
 *     tags:
 *       - MissingCashbackClaims
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
 *            $ref: '#/components/schemas/MissingCashbackClaim'
 *     responses:
 *       200:
 *         description: MissingCashbackClaim PATCH success count
 *         content:
 *             application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/MissingCashbackClaims.Count'
 */
router.patch("/", function (req, res, next) {
  const filterBy = req.query.where;

  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        message: "MissingCashbackClaim body can not be empty",
      },
    });
  }
  MissingCashbackClaims.findOneAndUpdate(filterBy, { $set: req.body }, { new: true })
    .then((missingcashbackclaim) => {
      if (!missingcashbackclaim) {
        return res.status(404).send({
          message: "MissingCashbackClaim not found with id " + req.params.id,
        });
      }
      res.status(200).send(missingcashbackclaim);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: MissingCashbackClaim with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating MissingCashbackClaim with id ${req.params.id}`,
          code: 'SOMETHING_WENT_WRONG'
        },
      });
    });
});

/**
 * @swagger
 * /missingcashbackclaims:
 *   get:
 *     tags:
 *       - MissingCashbackClaims
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
 *                   ticket_id:
 *                     type: boolean
 *                   full_name:
 *                     type: boolean
 *                   order_id:
 *                     type: boolean
 *                   transaction_amount:
 *                     type: boolean
 *                   store_name:
 *                     type: boolean
 *                   click_id:
 *                     type: boolean
 *                   click_time:
 *                     type: boolean
 *                   description:
 *                     type: boolean
 *                   status:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - ticket_id
 *                   - full_name
 *                   - order_id
 *                   - transaction_amount
 *                   - store_name
 *                   - click_id
 *                   - click_time
 *                   - description
 *                   - status
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of MissingCashbackClaim model instances
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/MissingCashbackClaim'
 */
router.get("/", function (req, res, next) {
  const filterBy = req.query.filter;

  const allFields = JSON.parse(filterBy).fields;

  for (const missingCashbackClaimKey in allFields) {
    if (allFields[missingCashbackClaimKey] == false) {
      delete allFields[missingCashbackClaimKey];
    }
  }

  MissingCashbackClaims.find(
    JSON.parse(filterBy).where.additionalProp1
      ? {}
      : JSON.parse(filterBy).where,
    allFields
  )
    .skip(JSON.parse(filterBy).offset || JSON.parse(filterBy).skip)
    .limit(JSON.parse(filterBy).limit)
    .sort(JSON.parse(filterBy).order)
    .then((missingcashbackclaim) => {
      res.status(200).send(missingcashbackclaim);
    })
    .catch((error) => {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message:
            error.message || "Some error occurred while retrieving MissingCashbackClaim.",
          code: 'SOMETHING_WENT_WRONG'

        },
      });
    });
});

module.exports = router;
