import express from "express";
const router = express.Router();
import PartnerWithUs from "../models/partnerwithus.model";

/**
 * @swagger
 * /partnerwithus/count:
 *   get:
 *     tags:
 *       - PartnerWithUs
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
 *         description: PartnerWithUs model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/PartnerWithUs.Count'
 */
router.get("/count", function (req, res, next) {
  const filterBy = req.query.where;

  PartnerWithUs.count(
    JSON.parse(filterBy).additionalProp1 ? {} : JSON.parse(filterBy),
    function (error, count) {
      if (error) {
        res.status(500).send({
          error : {
            statusCode: 500,
            name: "Server Error",
            message: error.message || "Some error occurred while getting PartnerWithUs count.",
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
 * /partnerwithus/{id}:
 *   put:
 *     tags:
 *       - PartnerWithUs
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
 *                    $ref: '#/components/schemas/PartnerWithUs'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                     description: PartnerWithUs PUT success
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
        message: "Entity body missing: PartnerWithUs body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      },
    });
  }
  PartnerWithUs.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((partnerwithus) => {
      if (!partnerwithus) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: PartnerWithUs with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      res.status(200).send(partnerwithus);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: PartnerWithUs with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error : {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating PartnerWithUs with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG"
        }
      });
    });
});

/**
 * @swagger
 * /partnerwithus/{id}:
 *   patch:
 *     tags:
 *       - PartnerWithUs
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
 *            $ref: '#/components/schemas/PartnerWithUs'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                      description: "PartnerWithUs PATCH success"
 */
router.patch("/:id", function (req, res, next) {
  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: "Bad Request",
        message: "Entity body missing: PartnerWithUs body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      }
    });
  }
  PartnerWithUs.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((partnerwithus) => {
      if (!partnerwithus) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: PartnerWithUs with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND"
          }
        });
      }
      res.status(200).send(partnerwithus);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: PartnerWithUs with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND"
          }
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating PartnerWithUs with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG"
        }
      });
    });
});

/**
 * @swagger
 * /partnerwithus/{id}:
 *   get:
 *     tags:
 *       - PartnerWithUs
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
 *                   website_name:
 *                     type: boolean
 *                   website_url:
 *                     type: boolean
 *                   contact_name:
 *                     type: boolean
 *                   contact_email_address:
 *                     type: boolean
 *                   contact_number:
 *                     type: boolean
 *                   logo_url:
 *                     type: boolean
 *                   description:
 *                     type: boolean
 *                   provide_affiliate:
 *                     type: boolean
 *                   all_over_india:
 *                     type: boolean
 *                   read:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - website_name
 *                   - website_url
 *                   - contact_name
 *                   - contact_email_address
 *                   - contact_number
 *                   - logo_url
 *                   - description
 *                   - provide_affiliate
 *                   - all_over_india
 *                   - read
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: PartnerWithUs model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/PartnerWithUs'
 */
router.get("/:id", function (req, res, next) {
  const filterBy = req.query.filter;

  const allFields = JSON.parse(filterBy).fields;

  for (const partnerWithUsKey in allFields) {
    if (allFields[partnerWithUsKey] == false) {
      delete allFields[partnerWithUsKey];
    }
  }

  PartnerWithUs.findById(req.params.id, allFields)
    .then((partnerwithus) => {
      if (!partnerwithus) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: PartnerWithUs with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      res.status(200).send(partnerwithus);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: PartnerWithUs with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error retrieving PartnerWithUs with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /partnerwithus/{id}:
 *   delete:
 *     tags:
 *       - PartnerWithUs
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
 *                    description: PartnerWithUs DELETE success
 */
router.delete("/:id", function (req, res, next) {
  PartnerWithUs.findByIdAndRemove(req.params.id)
    .then((partnerwithus) => {
      if (!partnerwithus)
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: PartnerWithUs with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      res.status(200).send({ message: "PartnerWithUs deleted successfully" });
    })
    .catch((error) => {
      if (error.kind === "ObjectId" || error.name === "NotFound") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: PartnerWithUs with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error deleting PartnerWithUs with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /partnerwithus:
 *   post:
 *     tags:
 *       - PartnerWithUs
 *     operationId: create
 *     consumes:
 *        - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/PartnerWithUs'
 *     responses:
 *      200:
 *         description: PartnerWithUs model instance
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/PartnerWithUs'
 */
router.post("/", function (req, res, next) {
  try {
    if (Object.keys(req.body).length == 0) {
      return res.status(400).send({
        error: {
          statusCode: 400,
          name: "Bad Request",
          message: "Entity body missing: PartnerWithUs body data can not be empty",
          code: "ENTITY_BODY_MISSING"
        }
      });
    }

    const partnerwithus = new PartnerWithUs({
      website_name: req.body.website_name,
      website_url: req.body.website_url,
      contact_name: req.body.contact_name,
      contact_email_address: req.body.contact_email_address,
      contact_number: req.body.contact_number,
      logo_url: req.body.logo_url,
      description: req.body.description,
      provide_affiliate: req.body.provide_affiliate,
      all_over_india: req.body.all_over_india,
      read: req.body.read,
    });

    partnerwithus
      .save()
      .then((partnerwithus) => {
        res.status(200).send(partnerwithus);
      })
      .catch((error) => {
        res.status(500).send({
          error: {
            statusCode: 500,
            name: "Server Error",
            message: error.message || `Error creating PartnerWithUs`,
            code: "SOMETHING_WENT_WRONG",
          },
        });
      });
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error creating PartnerWithUs`,
        code: "SOMETHING_WENT_WRONG",
      },
    });
  }
});

/**
 * @swagger
 * /partnerwithus:
 *   patch:
 *     tags:
 *       - PartnerWithUs
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
 *            $ref: '#/components/schemas/PartnerWithUs'
 *     responses:
 *       200:
 *         description: PartnerWithUs PATCH success count
 *         content:
 *             application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/PartnerWithUs.Count'
 */
router.patch("/", function (req, res, next) {
  const filterBy = req.query.where;

  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        message: "PartnerWithUs body can not be empty",
      },
    });
  }
  PartnerWithUs.findOneAndUpdate(filterBy, { $set: req.body }, { new: true })
    .then((partnerwithus) => {
      if (!partnerwithus) {
        return res.status(404).send({
          message: "PartnerWithUs not found with id " + req.params.id,
        });
      }
      res.status(200).send(partnerwithus);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: PartnerWithUs with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating PartnerWithUs with id ${req.params.id}`,
          code: 'SOMETHING_WENT_WRONG'
        },
      });
    });
});

/**
 * @swagger
 * /partnerwithus:
 *   get:
 *     tags:
 *       - PartnerWithUs
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
 *                   website_name:
 *                     type: boolean
 *                   website_url:
 *                     type: boolean
 *                   contact_name:
 *                     type: boolean
 *                   contact_email_address:
 *                     type: boolean
 *                   contact_number:
 *                     type: boolean
 *                   logo_url:
 *                     type: boolean
 *                   description:
 *                     type: boolean
 *                   provide_affiliate:
 *                     type: boolean
 *                   all_over_india:
 *                     type: boolean
 *                   read:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - website_name
 *                   - website_url
 *                   - contact_name
 *                   - contact_email_address
 *                   - contact_number
 *                   - logo_url
 *                   - description
 *                   - provide_affiliate
 *                   - all_over_india
 *                   - read
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of PartnerWithUs model instances
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/PartnerWithUs'
 */
router.get("/", function (req, res, next) {
  const filterBy = req.query.filter;

  const allFields = JSON.parse(filterBy).fields;

  for (const partnerWithUsKey in allFields) {
    if (allFields[partnerWithUsKey] == false) {
      delete allFields[partnerWithUsKey];
    }
  }

  PartnerWithUs.find(
    JSON.parse(filterBy).where.additionalProp1
      ? {}
      : JSON.parse(filterBy).where,
    allFields
  )
    .skip(JSON.parse(filterBy).offset || JSON.parse(filterBy).skip)
    .limit(JSON.parse(filterBy).limit)
    .sort(JSON.parse(filterBy).order)
    .then((partnerwithus) => {
      res.status(200).send(partnerwithus);
    })
    .catch((error) => {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message:
            error.message || "Some error occurred while retrieving PartnerWithUs.",
          code: 'SOMETHING_WENT_WRONG'

        },
      });
    });
});

module.exports = router;
