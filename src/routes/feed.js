import express from "express";
const router = express.Router();
import Feed from "../models/feed.model";

/**
 * @swagger
 * /feeds/count:
 *   get:
 *     tags:
 *       - Feeds
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
 *         description: Feed model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/Feed.Count'
 */
router.get("/count", function (req, res, next) {
  const filterBy = req.query.where;

  Feed.count(
    JSON.parse(filterBy).additionalProp1 ? {} : JSON.parse(filterBy),
    function (error, count) {
      if (error) {
        res.status(500).send({
          error : {
            statusCode: 500,
            name: "Server Error",
            message: error.message || "Some error occurred while getting feeds count.",
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
 * /feeds/{id}:
 *   put:
 *     tags:
 *       - Feeds
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
 *                    $ref: '#/components/schemas/Feed'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                     description: Feed PUT success
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
        message: "Entity body missing: Feed body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      },
    });
  }
  Feed.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((feed) => {
      if (!feed) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Feed with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      res.status(200).send(feed);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Feed with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error : {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating feed with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG"
        }
      });
    });
});

/**
 * @swagger
 * /feeds/{id}:
 *   patch:
 *     tags:
 *       - Feeds
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
 *            $ref: '#/components/schemas/Feed'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                      description: "Feed PATCH success"
 */
router.patch("/:id", function (req, res, next) {
  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: "Bad Request",
        message: "Entity body missing: Feed body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      }
    });
  }
  Feed.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((feed) => {
      if (!feed) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Feed with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND"
          }
        });
      }
      res.status(200).send(feed);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Feed with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND"
          }
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating feed with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG"
        }
      });
    });
});

/**
 * @swagger
 * /feeds/{id}:
 *   get:
 *     tags:
 *       - Feeds
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
 *                   feed_store:
 *                     type: boolean
 *                   feed_category:
 *                     type: boolean
 *                   feed_click_count:
 *                     type: boolean
 *                   feed_title:
 *                     type: boolean
 *                   feed_description:
 *                     type: boolean
 *                   feed_terms:
 *                     type: boolean
 *                   feed_coupon:
 *                     type: boolean
 *                   feed_type:
 *                     type: boolean
 *                   feed_link:
 *                     type: boolean
 *                   feed_aff_link:
 *                     type: boolean
 *                   feed_network:
 *                     type: boolean
 *                   feed_validity_date:
 *                     type: boolean
 *                   feed_discount:
 *                     type: boolean
 *                   feed_applicable_on:
 *                     type: boolean
 *                   feed_not_applicable_on:
 *                     type: boolean
 *                   feed_user_type:
 *                     type: boolean
 *                   feed_payment_mode:
 *                     type: boolean
 *                   feed_brands:
 *                     type: boolean
 *                   feed_min_purchase:
 *                     type: boolean
 *                   feed_max_discount:
 *                     type: boolean
 *                   feed_featured:
 *                     type: boolean
 *                   feed_store_image:
 *                     type: boolean
 *                   feed_status:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - feed_store
 *                   - feed_category
 *                   - feed_click_count
 *                   - feed_title
 *                   - feed_description
 *                   - feed_terms
 *                   - feed_coupon
 *                   - feed_type
 *                   - feed_link
 *                   - feed_aff_link
 *                   - feed_network
 *                   - feed_validity_date
 *                   - feed_discount
 *                   - feed_applicable_on
 *                   - feed_not_applicable_on
 *                   - feed_user_type
 *                   - feed_payment_mode
 *                   - feed_brands
 *                   - feed_min_purchase
 *                   - feed_max_discount
 *                   - feed_featured
 *                   - feed_store_image
 *                   - feed_status
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Feed model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/Feed'
 */
router.get("/:id", function (req, res, next) {
  const filterBy = req.query.filter;

  const allFields = JSON.parse(filterBy).fields;

  for (const feedKey in allFields) {
    if (allFields[feedKey] == false) {
      delete allFields[feedKey];
    }
  }

  Feed.findById(req.params.id, allFields)
    .then((feed) => {
      if (!feed) {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Feed with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      res.status(200).send(feed);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Feed with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error retrieving feed with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /feeds/{id}:
 *   delete:
 *     tags:
 *       - Feeds
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
 *                    description: Feed DELETE success
 */
router.delete("/:id", function (req, res, next) {
  Feed.findByIdAndRemove(req.params.id)
    .then((feed) => {
      if (!feed)
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Feed with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      res.status(200).send({ message: "Feed deleted successfully" });
    })
    .catch((error) => {
      if (error.kind === "ObjectId" || error.name === "NotFound") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Feed with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error deleting feed with id ${req.params.id}`,
          code: "SOMETHING_WENT_WRONG",
        },
      });
    });
});

/**
 * @swagger
 * /feeds:
 *   post:
 *     tags:
 *       - Feeds
 *     operationId: create
 *     consumes:
 *        - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Feed'
 *     responses:
 *      200:
 *         description: Feed model instance
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/Feed'
 */
router.post("/", function (req, res, next) {
  try {
    if (Object.keys(req.body).length == 0) {
      return res.status(400).send({
        error: {
          statusCode: 400,
          name: "Bad Request",
          message: "Entity body missing: Feed body data can not be empty",
          code: "ENTITY_BODY_MISSING"
        }
      });
    }

    const feed = new Feed({
      feed_store: req.body.feed_store,
      feed_category: req.body.feed_category,
      feed_click_count: req.body.feed_click_count,
      feed_title: req.body.feed_title,
      feed_description: req.body.feed_description,
      feed_terms: req.body.feed_terms,
      feed_coupon: req.body.feed_coupon,
      feed_type: req.body.feed_type,
      feed_link: req.body.feed_link,
      feed_aff_link: req.body.feed_aff_link,
      feed_network: req.body.feed_network,
      feed_validity_date: req.body.feed_validity_date,
      feed_discount: req.body.feed_discount,
      feed_applicable_on: req.body.feed_applicable_on,
      feed_not_applicable_on: req.body.feed_not_applicable_on,
      feed_user_type: req.body.feed_user_type,
      feed_payment_mode: req.body.feed_payment_mode,
      feed_brands: req.body.feed_brands,
      feed_min_purchase: req.body.feed_min_purchase,
      feed_max_discount: req.body.feed_max_discount,
      feed_featured: req.body.feed_featured,
      feed_store_image: req.body.feed_store_image,
      feed_status: req.body.feed_status,
    });

    feed
      .save()
      .then((feed) => {
        res.status(200).send(feed);
      })
      .catch((error) => {
        res.status(500).send({
          error: {
            statusCode: 500,
            name: "Server Error",
            message: error.message || `Error creating feed`,
            code: "SOMETHING_WENT_WRONG",
          },
        });
      });
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error creating feed`,
        code: "SOMETHING_WENT_WRONG",
      },
    });
  }
});

/**
 * @swagger
 * /feeds:
 *   patch:
 *     tags:
 *       - Feeds
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
 *            $ref: '#/components/schemas/Feed'
 *     responses:
 *       200:
 *         description: Feed PATCH success count
 *         content:
 *             application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/Feed.Count'
 */
router.patch("/", function (req, res, next) {
  const filterBy = req.query.where;

  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        message: "Feed body can not be empty",
      },
    });
  }
  Feed.findOneAndUpdate(filterBy, { $set: req.body }, { new: true })
    .then((feed) => {
      if (!feed) {
        return res.status(404).send({
          message: "Feed not found with id " + req.params.id,
        });
      }
      res.status(200).send(feed);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          error: {
            statusCode: 404,
            name: "Error",
            message: `Entity not found: Feed with id ${req.params.id}`,
            code: "ENTITY_NOT_FOUND",
          },
        });
      }
      return res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error updating feed with id ${req.params.id}`,
          code: 'SOMETHING_WENT_WRONG'
        },
      });
    });
});

/**
 * @swagger
 * /feeds:
 *   get:
 *     tags:
 *       - Feeds
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
 *                   feed_store:
 *                     type: boolean
 *                   feed_category:
 *                     type: boolean
 *                   feed_click_count:
 *                     type: boolean
 *                   feed_title:
 *                     type: boolean
 *                   feed_description:
 *                     type: boolean
 *                   feed_terms:
 *                     type: boolean
 *                   feed_coupon:
 *                     type: boolean
 *                   feed_type:
 *                     type: boolean
 *                   feed_link:
 *                     type: boolean
 *                   feed_aff_link:
 *                     type: boolean
 *                   feed_network:
 *                     type: boolean
 *                   feed_validity_date:
 *                     type: boolean
 *                   feed_discount:
 *                     type: boolean
 *                   feed_applicable_on:
 *                     type: boolean
 *                   feed_not_applicable_on:
 *                     type: boolean
 *                   feed_user_type:
 *                     type: boolean
 *                   feed_payment_mode:
 *                     type: boolean
 *                   feed_brands:
 *                     type: boolean
 *                   feed_min_purchase:
 *                     type: boolean
 *                   feed_max_discount:
 *                     type: boolean
 *                   feed_featured:
 *                     type: boolean
 *                   feed_store_image:
 *                     type: boolean
 *                   feed_status:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - feed_store
 *                   - feed_category
 *                   - feed_click_count
 *                   - feed_title
 *                   - feed_description
 *                   - feed_terms
 *                   - feed_coupon
 *                   - feed_type
 *                   - feed_link
 *                   - feed_aff_link
 *                   - feed_network
 *                   - feed_validity_date
 *                   - feed_discount
 *                   - feed_applicable_on
 *                   - feed_not_applicable_on
 *                   - feed_user_type
 *                   - feed_payment_mode
 *                   - feed_brands
 *                   - feed_min_purchase
 *                   - feed_max_discount
 *                   - feed_featured
 *                   - feed_store_image
 *                   - feed_status
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of Feed model instances
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/Feed'
 */
router.get("/", function (req, res, next) {
  const filterBy = req.query.filter;

  const allFields = JSON.parse(filterBy).fields;

  for (const feedKey in allFields) {
    if (allFields[feedKey] == false) {
      delete allFields[feedKey];
    }
  }

  Feed.find(
    JSON.parse(filterBy).where.additionalProp1
      ? {}
      : JSON.parse(filterBy).where,
    allFields
  )
    .skip(JSON.parse(filterBy).offset || JSON.parse(filterBy).skip)
    .limit(JSON.parse(filterBy).limit)
    .sort(JSON.parse(filterBy).order)
    .then((feeds) => {
      res.status(200).send(feeds);
    })
    .catch((error) => {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message:
            error.message || "Some error occurred while retrieving feeds.",
          code: 'SOMETHING_WENT_WRONG'

        },
      });
    });
});

module.exports = router;
