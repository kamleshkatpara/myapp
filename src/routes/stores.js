import express from "express";
const router = express.Router();
import Store from "../models/store.model";

/**
 * @swagger
 * /stores/count:
 *   get:
 *     tags:
 *       - Stores
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
 *         description: Store model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/Store.Count'
 */
router.get("/count", function (req, res, next) {
  const filterBy = req.query.where;

  Store.count(
    JSON.parse(filterBy).additionalProp1 ? {} : JSON.parse(filterBy),
    function (error, count) {
      if (error) {
        res.status(500).send({
          error : {
            statusCode: 500,
            name: "Server Error",
            message: error.message || "Some error occurred while getting stores count.",
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
 * /stores/{id}:
 *   put:
 *     tags:
 *       - Stores
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
 *                    $ref: '#/components/schemas/Store'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                     description: Store PUT success
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
        message: "Entity body missing: Store body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      },
    });
  }
  Store.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((store) => {
      if (!store) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Store with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      res.status(200).send(store);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Store with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error : {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating store with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG"
        }
      });
    });
});

/**
 * @swagger
 * /stores/{id}:
 *   patch:
 *     tags:
 *       - Stores
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
 *            $ref: '#/components/schemas/Store'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                      description: "Store PATCH success"
 */
router.patch("/:id", function (req, res, next) {
  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: "Bad Request",
        message: "Entity body missing: Store body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      }
    });
  }
  Store.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((store) => {
      if (!store) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Store with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND"
          }
        });
      }
      res.status(200).send(store);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Store with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND"
          }
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating store with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG"
        }
      });
    });
});

/**
 * @swagger
 * /stores/{id}:
 *   get:
 *     tags:
 *       - Stores
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
 *                   store_path:
 *                     type: boolean
 *                   store_description:
 *                     type: boolean
 *                   store_banner:
 *                     type: boolean
 *                   store_image:
 *                     type: boolean
 *                   store_icon:
 *                     type: boolean
 *                   store_banner_code:
 *                     type: boolean
 *                   store_contact_name:
 *                     type: boolean
 *                   store_contact_email:
 *                     type: boolean
 *                   store_contact_number:
 *                     type: boolean
 *                   store_url:
 *                     type: boolean
 *                   store_meta_title:
 *                     type: boolean
 *                   store_meta_description:
 *                     type: boolean
 *                   store_meta_keyword:
 *                     type: boolean
 *                   store_featured:
 *                     type: boolean
 *                   store_status:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - store_name
 *                   - store_path
 *                   - store_description
 *                   - store_banner
 *                   - store_image
 *                   - store_icon
 *                   - store_banner_code
 *                   - store_contact_name
 *                   - store_contact_email
 *                   - store_contact_number
 *                   - store_url
 *                   - store_meta_title
 *                   - store_meta_description
 *                   - store_meta_keyword
 *                   - store_featured
 *                   - store_status
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Store model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/Store'
 */
router.get("/:id", function (req, res, next) {
  const filterBy = req.query.filter;

  const allFields = JSON.parse(filterBy).fields;

  for (const storeKey in allFields) {
    if (allFields[storeKey] == false) {
      delete allFields[storeKey];
    }
  }

  Store.findById(req.params.id, allFields)
    .then((store) => {
      if (!store) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Store with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      res.status(200).send(store);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Store with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error retrieving store with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /stores/{id}:
 *   delete:
 *     tags:
 *       - Stores
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
 *                    description: Store DELETE success
 */
router.delete("/:id", function (req, res, next) {
  Store.findByIdAndRemove(req.params.id)
    .then((store) => {
      if (!store)
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Store with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      res.status(200).send({ message: "Store deleted successfully" });
    })
    .catch((error) => {
      if (error.kind === "ObjectId" || error.name === "NotFound") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Store with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error deleting store with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /stores:
 *   post:
 *     tags:
 *       - Stores
 *     operationId: create
 *     consumes:
 *        - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Store'
 *     responses:
 *      200:
 *         description: Store model instance
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/Store'
 */
router.post("/", function (req, res, next) {
  try {
    if (Object.keys(req.body).length == 0) {
      return res.status(400).send({
        error: {
          statusCode: 400,
          name: "Bad Request",
          message: "Entity body missing: Store body data can not be empty",
          code: "ENTITY_BODY_MISSING"
        }
      });
    }

    const store = new Store({
      store_name: req.body.store_name,
      store_path: req.body.store_path,
      store_description: req.body.store_description,
      store_banner: req.body.store_banner,
      store_image: req.body.store_image,
      store_icon: req.body.store_icon,
      store_banner_code: req.body.store_banner_code,
      store_contact_name: req.body.store_contact_name,
      store_contact_email: req.body.store_contact_email,
      store_contact_number: req.body.store_contact_number,
      store_url: req.body.store_url,
      store_meta_title: req.body.store_meta_title,
      store_meta_description: req.body.store_meta_description,
      store_meta_keyword: req.body.store_meta_keyword,
      store_featured: req.body.store_featured,
      store_status: req.body.store_status,
    });

    store
      .save()
      .then((store) => {
        res.status(200).send(store);
      })
      .catch((error) => {
        res.status(500).send({
          error: {
            statusCode: 500,
            name: "Server Error",
            message: error.message || `Error creating store`,
            code: "SOMETHING_WENT_WRONG",
          },
        });
      });
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error creating store`,
        code: "SOMETHING_WENT_WRONG",
      },
    });
  }
});

/**
 * @swagger
 * /stores:
 *   patch:
 *     tags:
 *       - Stores
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
 *            $ref: '#/components/schemas/Store'
 *     responses:
 *       200:
 *         description: Store PATCH success count
 *         content:
 *             application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/Store.Count'
 */
router.patch("/", function (req, res, next) {
  const filterBy = req.query.where;

  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        message: "Store body can not be empty",
      },
    });
  }
  Store.findOneAndUpdate(filterBy, { $set: req.body }, { new: true })
    .then((store) => {
      if (!store) {
        return res.status(404).send({
          message: "Store not found with id " + req.params.id,
        });
      }
      res.status(200).send(store);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Store with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating store with id ${req.params.id}`,
          code: 'SOMETHING_WENT_WRONG'
        },
      });
    });
});

/**
 * @swagger
 * /stores:
 *   get:
 *     tags:
 *       - Stores
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
 *                   store_path:
 *                     type: boolean
 *                   store_description:
 *                     type: boolean
 *                   store_banner:
 *                     type: boolean
 *                   store_image:
 *                     type: boolean
 *                   store_icon:
 *                     type: boolean
 *                   store_banner_code:
 *                     type: boolean
 *                   store_contact_name:
 *                     type: boolean
 *                   store_contact_email:
 *                     type: boolean
 *                   store_contact_number:
 *                     type: boolean
 *                   store_url:
 *                     type: boolean
 *                   store_meta_title:
 *                     type: boolean
 *                   store_meta_description:
 *                     type: boolean
 *                   store_meta_keyword:
 *                     type: boolean
 *                   store_featured:
 *                     type: boolean
 *                   store_status:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - store_name
 *                   - store_path
 *                   - store_description
 *                   - store_banner
 *                   - store_image
 *                   - store_icon
 *                   - store_banner_code
 *                   - store_contact_name
 *                   - store_contact_email
 *                   - store_contact_number
 *                   - store_url
 *                   - store_meta_title
 *                   - store_meta_description
 *                   - store_meta_keyword
 *                   - store_featured
 *                   - store_status
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of Store model instances
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/Store'
 */
router.get("/", function (req, res, next) {
  const filterBy = req.query.filter;

  const allFields = JSON.parse(filterBy).fields;

  for (const storeKey in allFields) {
    if (allFields[storeKey] == false) {
      delete allFields[storeKey];
    }
  }

  Store.find(
    JSON.parse(filterBy).where.additionalProp1
      ? {}
      : JSON.parse(filterBy).where,
    allFields
  )
    .skip(JSON.parse(filterBy).offset || JSON.parse(filterBy).skip)
    .limit(JSON.parse(filterBy).limit)
    .sort(JSON.parse(filterBy).order)
    .then((stores) => {
      res.status(200).send(stores);
    })
    .catch((error) => {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message:
            error.message || "Some error occurred while retrieving stores.",
          code: 'SOMETHING_WENT_WRONG'

        },
      });
    });
});

module.exports = router;
