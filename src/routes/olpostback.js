import express from "express";
const router = express.Router();
import OLPostBack from "../models/olpostback.model";

/**
 * @swagger
 * /olpostback/count:
 *   get:
 *     tags:
 *       - OLPostBack
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
 *         description: OLPostBack model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/OLPostBack.Count'
 */
router.get("/count", function (req, res, next) {
  const filterBy = req.query.where;

  OLPostBack.count(
    JSON.parse(filterBy).additionalProp1 ? {} : JSON.parse(filterBy),
    function (error, count) {
      if (error) {
        res.status(500).send({
          error : {
            statusCode: 500,
            name: "Server Error",
            message: error.message || "Some error occurred while getting OLPostBack count.",
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
 * /olpostback/{id}:
 *   put:
 *     tags:
 *       - OLPostBack
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
 *                    $ref: '#/components/schemas/OLPostBack'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                     description: OLPostBack PUT success
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
        message: "Entity body missing: OLPostBack body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      },
    });
  }
  OLPostBack.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((olpostback) => {
      if (!olpostback) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: OLPostBack with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      res.status(200).send(olpostback);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: OLPostBack with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error : {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating OLPostBack with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG"
        }
      });
    });
});

/**
 * @swagger
 * /olpostback/{id}:
 *   patch:
 *     tags:
 *       - OLPostBack
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
 *            $ref: '#/components/schemas/OLPostBack'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                      description: "OLPostBack PATCH success"
 */
router.patch("/:id", function (req, res, next) {
  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: "Bad Request",
        message: "Entity body missing: OLPostBack body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      }
    });
  }
  OLPostBack.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((olpostback) => {
      if (!olpostback) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: OLPostBack with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND"
          }
        });
      }
      res.status(200).send(olpostback);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: OLPostBack with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND"
          }
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating OLPostBack with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG"
        }
      });
    });
});

/**
 * @swagger
 * /olpostback/{id}:
 *   get:
 *     tags:
 *       - OLPostBack
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
 *                   ol_id:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - ol_id
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OLPostBack model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/OLPostBack'
 */
router.get("/:id", function (req, res, next) {
  const filterBy = req.query.filter;

  const allFields = JSON.parse(filterBy).fields;

  for (const oLPostBackKey in allFields) {
    if (allFields[oLPostBackKey] == false) {
      delete allFields[oLPostBackKey];
    }
  }

  OLPostBack.findById(req.params.id, allFields)
    .then((olpostback) => {
      if (!olpostback) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: OLPostBack with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      res.status(200).send(olpostback);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: OLPostBack with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error retrieving OLPostBack with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /olpostback/{id}:
 *   delete:
 *     tags:
 *       - OLPostBack
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
 *                    description: OLPostBack DELETE success
 */
router.delete("/:id", function (req, res, next) {
  OLPostBack.findByIdAndRemove(req.params.id)
    .then((olpostback) => {
      if (!olpostback)
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: OLPostBack with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      res.status(200).send({ message: "OLPostBack deleted successfully" });
    })
    .catch((error) => {
      if (error.kind === "ObjectId" || error.name === "NotFound") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: OLPostBack with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error deleting OLPostBack with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /olpostback:
 *   post:
 *     tags:
 *       - OLPostBack
 *     operationId: create
 *     consumes:
 *        - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/OLPostBack'
 *     responses:
 *      200:
 *         description: OLPostBack model instance
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/OLPostBack'
 */
router.post("/", function (req, res, next) {
  try {
    if (Object.keys(req.body).length == 0) {
      return res.status(400).send({
        error: {
          statusCode: 400,
          name: "Bad Request",
          message: "Entity body missing: OLPostBack body data can not be empty",
          code: "ENTITY_BODY_MISSING"
        }
      });
    }

    const olpostback = new OLPostBack({data: req.body});

    olpostback
      .save()
      .then((olpostback) => {
        res.status(200).send(olpostback);
      })
      .catch((error) => {
        res.status(500).send({
          error: {
            statusCode: 500,
            name: "Server Error",
            message: error.message || `Error creating OLPostBack`,
            code: "SOMETHING_WENT_WRONG",
          },
        });
      });
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error creating OLPostBack`,
        code: "SOMETHING_WENT_WRONG",
      },
    });
  }
});

/**
 * @swagger
 * /olpostback:
 *   patch:
 *     tags:
 *       - OLPostBack
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
 *            $ref: '#/components/schemas/OLPostBack'
 *     responses:
 *       200:
 *         description: OLPostBack PATCH success count
 *         content:
 *             application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/OLPostBack.Count'
 */
router.patch("/", function (req, res, next) {
  const filterBy = req.query.where;

  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        message: "OLPostBack body can not be empty",
      },
    });
  }
  OLPostBack.findOneAndUpdate(filterBy, { $set: req.body }, { new: true })
    .then((olpostback) => {
      if (!olpostback) {
        return res.status(404).send({
          message: "OLPostBack not found with id " + req.params.id,
        });
      }
      res.status(200).send(olpostback);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: OLPostBack with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating OLPostBack with id ${req.params.id}`,
          code: 'SOMETHING_WENT_WRONG'
        },
      });
    });
});

/**
 * @swagger
 * /olpostback:
 *   get:
 *     tags:
 *       - OLPostBack
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
 *                   ol_id:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - ol_id
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of OLPostBack model instances
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/OLPostBack'
 */
router.get("/", function (req, res, next) {
  const filterBy = req.query.filter;

  const allFields = JSON.parse(filterBy).fields;

  for (const oLPostBackKey in allFields) {
    if (allFields[oLPostBackKey] == false) {
      delete allFields[oLPostBackKey];
    }
  }

  OLPostBack.find(
    JSON.parse(filterBy).where.additionalProp1
      ? {}
      : JSON.parse(filterBy).where,
    allFields
  )
    .skip(JSON.parse(filterBy).offset || JSON.parse(filterBy).skip)
    .limit(JSON.parse(filterBy).limit)
    .sort(JSON.parse(filterBy).order)
    .then((olpostbacks) => {
      res.status(200).send(olpostbacks);
    })
    .catch((error) => {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message:
            error.message || "Some error occurred while retrieving OLPostBacks.",
          code: 'SOMETHING_WENT_WRONG'

        },
      });
    });
});

module.exports = router;
