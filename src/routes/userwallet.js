import express from "express";
const router = express.Router();
import UserWallet from "../models/userwallet.model";

/**
 * @swagger
 * /userwallet/count:
 *   get:
 *     tags:
 *       - UserWallet
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
 *         description: UserWallet model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/UserWallet.Count'
 */
router.get("/count", function (req, res, next) {
  const filterBy = req.query.where;

  UserWallet.count(
    JSON.parse(filterBy).additionalProp1 ? {} : JSON.parse(filterBy),
    function (error, count) {
      if (error) {
        res.status(500).send({
          error : {
            statusCode: 500,
            name: "Server Error",
            message: error.message || "Some error occurred while getting UserWallet count.",
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
 * /userwallet/{id}:
 *   put:
 *     tags:
 *       - UserWallet
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
 *                    $ref: '#/components/schemas/UserWallet'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                     description: UserWallet PUT success
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
        message: "Entity body missing: UserWallet body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      },
    });
  }
  UserWallet.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((userwallet) => {
      if (!userwallet) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: UserWallet with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      res.status(200).send(userwallet);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: UserWallet with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error : {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating UserWallet with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG"
        }
      });
    });
});

/**
 * @swagger
 * /userwallet/{id}:
 *   patch:
 *     tags:
 *       - UserWallet
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
 *            $ref: '#/components/schemas/UserWallet'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                      description: "UserWallet PATCH success"
 */
router.patch("/:id", function (req, res, next) {
  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: "Bad Request",
        message: "Entity body missing: UserWallet body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      }
    });
  }
  UserWallet.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((userwallet) => {
      if (!userwallet) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: UserWallet with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND"
          }
        });
      }
      res.status(200).send(userwallet);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: UserWallet with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND"
          }
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating UserWallet with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG"
        }
      });
    });
});

/**
 * @swagger
 * /userwallet/{id}:
 *   get:
 *     tags:
 *       - UserWallet
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
 *                   transaction_id:
 *                     type: boolean
 *                   click_time:
 *                     type: boolean
 *                   status:
 *                     type: boolean
 *                   payout:
 *                     type: boolean
 *                   type:
 *                     type: boolean
 *                   sale_amount:
 *                     type: boolean
 *                   transaction_time:
 *                     type: boolean
 *                   transaction_type:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - store_name
 *                   - network
 *                   - user_id
 *                   - transaction_id
 *                   - click_time
 *                   - status
 *                   - payout
 *                   - type
 *                   - sale_amount
 *                   - transaction_time
 *                   - transaction_type
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: UserWallet model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/UserWallet'
 */
router.get("/:id", function (req, res, next) {
  const filterBy = req.query.filter;

  const allFields = JSON.parse(filterBy).fields;

  for (const userWalletKey in allFields) {
    if (allFields[userWalletKey] == false) {
      delete allFields[userWalletKey];
    }
  }

  UserWallet.findById(req.params.id, allFields)
    .then((userwallet) => {
      if (!userwallet) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: UserWallet with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      res.status(200).send(userwallet);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: UserWallet with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error retrieving UserWallet with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /userwallet/{id}:
 *   delete:
 *     tags:
 *       - UserWallet
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
 *                    description: UserWallet DELETE success
 */
router.delete("/:id", function (req, res, next) {
  UserWallet.findByIdAndRemove(req.params.id)
    .then((userwallet) => {
      if (!userwallet)
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: UserWallet with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      res.status(200).send({ message: "UserWallet deleted successfully" });
    })
    .catch((error) => {
      if (error.kind === "ObjectId" || error.name === "NotFound") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: UserWallet with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error deleting UserWallet with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /userwallet:
 *   post:
 *     tags:
 *       - UserWallet
 *     operationId: create
 *     consumes:
 *        - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/UserWallet'
 *     responses:
 *      200:
 *         description: UserWallet model instance
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserWallet'
 */
router.post("/", function (req, res, next) {
  try {
    if (Object.keys(req.body).length == 0) {
      return res.status(400).send({
        error: {
          statusCode: 400,
          name: "Bad Request",
          message: "Entity body missing: UserWallet body data can not be empty",
          code: "ENTITY_BODY_MISSING"
        }
      });
    }

    const userwallet = new UserWallet({
      store_name: req.body.store_name,
      network: req.body.network,
      user_id: req.body.user_id,
      transaction_id: req.body.transaction_id,
      click_time: req.body.click_time,
      status: req.body.status,
      payout: req.body.payout,
      type: req.body.type,
      sale_amount: req.body.sale_amount,
      transaction_time: req.body.transaction_time,
      transaction_type: req.body.transaction_type,
    });

    userwallet
      .save()
      .then((userwallet) => {
        res.status(200).send(userwallet);
      })
      .catch((error) => {
        res.status(500).send({
          error: {
            statusCode: 500,
            name: "Server Error",
            message: error.message || `Error creating UserWallet`,
            code: "SOMETHING_WENT_WRONG",
          },
        });
      });
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error creating UserWallet`,
        code: "SOMETHING_WENT_WRONG",
      },
    });
  }
});

/**
 * @swagger
 * /userwallet:
 *   patch:
 *     tags:
 *       - UserWallet
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
 *            $ref: '#/components/schemas/UserWallet'
 *     responses:
 *       200:
 *         description: UserWallet PATCH success count
 *         content:
 *             application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/UserWallet.Count'
 */
router.patch("/", function (req, res, next) {
  const filterBy = req.query.where;

  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        message: "UserWallet body can not be empty",
      },
    });
  }
  UserWallet.findOneAndUpdate(filterBy, { $set: req.body }, { new: true })
    .then((userwallet) => {
      if (!userwallet) {
        return res.status(404).send({
          message: "UserWallet not found with id " + req.params.id,
        });
      }
      res.status(200).send(userwallet);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: UserWallet with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating UserWallet with id ${req.params.id}`,
          code: 'SOMETHING_WENT_WRONG'
        },
      });
    });
});

/**
 * @swagger
 * /userwallet:
 *   get:
 *     tags:
 *       - UserWallet
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
 *                   transaction_id:
 *                     type: boolean
 *                   click_time:
 *                     type: boolean
 *                   status:
 *                     type: boolean
 *                   payout:
 *                     type: boolean
 *                   type:
 *                     type: boolean
 *                   sale_amount:
 *                     type: boolean
 *                   transaction_time:
 *                     type: boolean
 *                   transaction_type:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - store_name
 *                   - network
 *                   - user_id
 *                   - transaction_id
 *                   - click_time
 *                   - status
 *                   - payout
 *                   - type
 *                   - sale_amount
 *                   - transaction_time
 *                   - transaction_type
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of UserWallet model instances
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/UserWallet'
 */
router.get("/", function (req, res, next) {
  const filterBy = req.query.filter;

  const allFields = JSON.parse(filterBy).fields;

  for (const userWalletKey in allFields) {
    if (allFields[userWalletKey] == false) {
      delete allFields[userWalletKey];
    }
  }

  UserWallet.find(
    JSON.parse(filterBy).where.additionalProp1
      ? {}
      : JSON.parse(filterBy).where,
    allFields
  )
    .skip(JSON.parse(filterBy).offset || JSON.parse(filterBy).skip)
    .limit(JSON.parse(filterBy).limit)
    .sort(JSON.parse(filterBy).order)
    .then((userwallet) => {
      res.status(200).send(userwallet);
    })
    .catch((error) => {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message:
            error.message || "Some error occurred while retrieving UserWallet.",
          code: 'SOMETHING_WENT_WRONG'

        },
      });
    });
});

module.exports = router;
