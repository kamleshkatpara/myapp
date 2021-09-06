import express from "express";
const router = express.Router();
import Roles from "../models/roles.model";

/**
 * @swagger
 * /roles/count:
 *   get:
 *     tags:
 *       - Roles
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
 *         description: Role model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/Roles.Count'
 */
router.get("/count", function (req, res, next) {
  const filterBy = req.query.where;

  Roles.count(
    JSON.parse(filterBy).additionalProp1 ? {} : JSON.parse(filterBy),
    function (error, count) {
      if (error) {
        res.status(500).send({
          error: {
            statusCode: 500,
            name: "Server Error",
            message:
              error.message || "Some error occurred while getting roles count.",
            code: "SOMETHING_WENT_WRONG",
          },
        });
      } else {
        res.status(200).json({ count: count });
      }
    }
  );
});

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     tags:
 *       - Roles
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
 *                    $ref: '#/components/schemas/NewRole'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                     description: Role PUT success
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
        code: "ENTITY_ID_NOT_FOUND",
      },
    });
  }
  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: "Bad Request",
        message: "Entity body missing: Role body data can not be empty",
        code: "ENTITY_BODY_MISSING",
      },
    });
  }
  Roles.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((role) => {
      if (!role) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Role with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      res.status(200).send(role);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Role with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message:
            error.message || `Error updating role with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /roles/{id}:
 *   patch:
 *     tags:
 *       - Roles
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
 *            $ref: '#/components/schemas/Role'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                      description: "Role PATCH success"
 */
router.patch("/:id", function (req, res, next) {
  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: "Bad Request",
        message: "Entity body missing: Role body data can not be empty",
        code: "ENTITY_BODY_MISSING",
      },
    });
  }
  Roles.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((role) => {
      if (!role) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Role with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      res.status(200).send(role);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Role with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message:
            error.message || `Error updating role with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     tags:
 *       - Roles
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
 *                   name:
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
 *                   - name
 *                   - description
 *                   - status
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Role model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/NewRole'
 */
router.get("/:id", function (req, res, next) {
  const filterBy = req.query.filter;

  const allFields = JSON.parse(filterBy).fields;

  for (const roleKey in allFields) {
    if (allFields[roleKey] == false) {
      delete allFields[roleKey];
    }
  }

  Roles.findById(req.params.id, allFields)
    .then((role) => {
      if (!role) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Role with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      res.status(200).send(role);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Role with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message:
            error.message || `Error retrieving role with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     tags:
 *       - Roles
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
 *                    description: Role DELETE success
 */
router.delete("/:id", function (req, res, next) {
  Roles.findByIdAndRemove(req.params.id)
    .then((role) => {
      if (!role)
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Role with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      res.status(200).send({ message: "Role deleted successfully" });
    })
    .catch((error) => {
      if (error.kind === "ObjectId" || error.name === "NotFound") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Role with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message:
            error.message || `Error deleting role with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /roles:
 *   post:
 *     tags:
 *       - Roles
 *     operationId: create
 *     consumes:
 *        - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/NewRole'
 *     responses:
 *      200:
 *         description: Role model instance
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/NewRole'
 */
router.post("/", function (req, res, next) {
  try {
    if (Object.keys(req.body).length == 0) {
      return res.status(400).send({
        error: {
          statusCode: 400,
          name: "Bad Request",
          message: "Entity body missing: Role body data can not be empty",
          code: "ENTITY_BODY_MISSING",
        },
      });
    }

    const role = new Roles({
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
    });

    role
      .save()
      .then((role) => {
        res.status(200).send(role);
      })
      .catch((error) => {
        res.status(500).send({
          error: {
            statusCode: 500,
            name: "Server Error",
            message: error.message || `Error creating role`,
            code: "SOMETHING_WENT_WRONG",
          },
        });
      });
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error creating role`,
        code: "SOMETHING_WENT_WRONG",
      },
    });
  }
});

/**
 * @swagger
 * /roles:
 *   patch:
 *     tags:
 *       - Roles
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
 *            $ref: '#/components/schemas/NewRole'
 *     responses:
 *       200:
 *         description: Role PATCH success count
 *         content:
 *             application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/Roles.Count'
 */
router.patch("/", function (req, res, next) {
  const filterBy = req.query.where;

  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        message: "Role body can not be empty",
      },
    });
  }
  Roles.findOneAndUpdate(filterBy, { $set: req.body }, { new: true })
    .then((role) => {
      if (!role) {
        return res.status(404).send({
          message: "Role not found with id " + req.params.id,
        });
      }
      res.status(200).send(role);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Role with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message:
            error.message || `Error updating role with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /roles:
 *   get:
 *     tags:
 *       - Roles
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
 *                   name:
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
 *                   - name
 *                   - description
 *                   - status
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of Role model instances
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/NewRole'
 */
router.get("/", function (req, res, next) {
  const filterBy = req.query.filter;

  const allFields = JSON.parse(filterBy).fields;

  for (const roleKey in allFields) {
    if (allFields[roleKey] == false) {
      delete allFields[roleKey];
    }
  }

  Roles.find(
    JSON.parse(filterBy).where.additionalProp1
      ? {}
      : JSON.parse(filterBy).where,
    allFields
  )
    .skip(JSON.parse(filterBy).offset || JSON.parse(filterBy).skip)
    .limit(JSON.parse(filterBy).limit)
    .sort(JSON.parse(filterBy).order)
    .then((roles) => {
      res.status(200).send(roles);
    })
    .catch((error) => {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message:
            error.message || "Some error occurred while retrieving roles.",
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

module.exports = router;
