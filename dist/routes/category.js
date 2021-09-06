"use strict";

var _express = _interopRequireDefault(require("express"));

var _category = _interopRequireDefault(require("../models/category.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

/**
 * @swagger
 * /categories/count:
 *   get:
 *     tags:
 *       - Categories
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
 *         description: Category model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/Category.Count'
 */
router.get("/count", function (req, res, next) {
  const filterBy = req.query.where;

  _category.default.count(JSON.parse(filterBy).additionalProp1 ? {} : JSON.parse(filterBy), function (error, count) {
    if (error) {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || "Some error occurred while getting categories count.",
          code: "SOMETHING_WENT_WRONG"
        }
      });
    } else {
      res.status(200).json({
        count: count
      });
    }
  });
});
/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     tags:
 *       - Categories
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
 *                    $ref: '#/components/schemas/Category'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                     description: Category PUT success
 */

router.put("/:id", function (req, res, next) {
  if (typeof req.params.id !== "string") {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: "Error",
        message: `id property (id) cannot be updated from ${req.params.id} to ${typeof req.params.id}`,
        code: "ENTITY_ID_NOT_FOUND"
      }
    });
  }

  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: "Bad Request",
        message: "Entity body missing: Category body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      }
    });
  }

  _category.default.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }).then(category => {
    if (!category) {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: Category with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    res.status(200).send(category);
  }).catch(error => {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: Category with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error updating category with id ${req.params.id}`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  });
});
/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     tags:
 *       - Categories
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
 *            $ref: '#/components/schemas/Category'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                      description: "Category PATCH success"
 */

router.patch("/:id", function (req, res, next) {
  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: "Bad Request",
        message: "Entity body missing: Category body data can not be empty",
        code: "ENTITY_BODY_MISSING"
      }
    });
  }

  _category.default.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, {
    new: true
  }).then(category => {
    if (!category) {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: Category with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    res.status(200).send(category);
  }).catch(error => {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: Category with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error updating category with id ${req.params.id}`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  });
});
/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     tags:
 *       - Categories
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
 *                   category_name:
 *                     type: boolean
 *                   category_path:
 *                     type: boolean
 *                   category_description:
 *                     type: boolean
 *                   category_banner:
 *                     type: boolean
 *                   category_banner_code:
 *                     type: boolean
 *                   category_image:
 *                     type: boolean
 *                   category_icon:
 *                     type: boolean
 *                   category_meta_title:
 *                     type: boolean
 *                   category_meta_description:
 *                     type: boolean
 *                   category_meta_keyword:
 *                     type: boolean
 *                   category_featured:
 *                     type: boolean
 *                   category_status:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - category_name
 *                   - category_path
 *                   - category_description
 *                   - category_banner
 *                   - category_banner_code
 *                   - category_image
 *                   - category_icon
 *                   - category_meta_title
 *                   - category_meta_description
 *                   - category_meta_keyword
 *                   - category_featured
 *                   - category_status
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Category model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/Category'
 */

router.get("/:id", function (req, res, next) {
  const filterBy = req.query.filter;
  const allFields = JSON.parse(filterBy).fields;

  for (const categoryKey in allFields) {
    if (allFields[categoryKey] == false) {
      delete allFields[categoryKey];
    }
  }

  _category.default.findById(req.params.id, allFields).then(category => {
    if (!category) {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: Category with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    res.status(200).send(category);
  }).catch(error => {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: Category with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error retrieving category with id ${req.params.id}`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  });
});
/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     tags:
 *       - Categories
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
 *                    description: Category DELETE success
 */

router.delete("/:id", function (req, res, next) {
  _category.default.findByIdAndRemove(req.params.id).then(category => {
    if (!category) return res.status(404).send({
      error: {
        statusCode: 404,
        name: "Error",
        message: `Entity not found: Category with id ${req.params.id}`,
        code: "ENTITY_NOT_FOUND"
      }
    });
    res.status(200).send({
      message: "Category deleted successfully"
    });
  }).catch(error => {
    if (error.kind === "ObjectId" || error.name === "NotFound") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: Category with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error deleting category with id ${req.params.id}`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  });
});
/**
 * @swagger
 * /categories:
 *   post:
 *     tags:
 *       - Categories
 *     operationId: create
 *     consumes:
 *        - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Category'
 *     responses:
 *      200:
 *         description: Category model instance
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 */

router.post("/", function (req, res, next) {
  try {
    if (Object.keys(req.body).length == 0) {
      return res.status(400).send({
        error: {
          statusCode: 400,
          name: "Bad Request",
          message: "Entity body missing: Category body data can not be empty",
          code: "ENTITY_BODY_MISSING"
        }
      });
    }

    const category = new _category.default({
      category_name: req.body.category_name,
      category_path: req.body.category_path,
      category_description: req.body.category_description,
      category_banner: req.body.category_banner,
      category_banner_code: req.body.category_banner_code,
      category_image: req.body.category_image,
      category_icon: req.body.category_icon,
      category_meta_title: req.body.category_meta_title,
      category_meta_description: req.body.category_meta_description,
      category_meta_keyword: req.body.category_meta_keyword,
      category_featured: req.body.category_featured,
      category_status: req.body.category_status
    });
    category.save().then(category => {
      res.status(200).send(category);
    }).catch(error => {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Server Error",
          message: error.message || `Error creating category`,
          code: "SOMETHING_WENT_WRONG"
        }
      });
    });
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error creating category`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  }
});
/**
 * @swagger
 * /categories:
 *   patch:
 *     tags:
 *       - Categories
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
 *            $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category PATCH success count
 *         content:
 *             application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/Category.Count'
 */

router.patch("/", function (req, res, next) {
  const filterBy = req.query.where;

  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        message: "Category body can not be empty"
      }
    });
  }

  _category.default.findOneAndUpdate(filterBy, {
    $set: req.body
  }, {
    new: true
  }).then(category => {
    if (!category) {
      return res.status(404).send({
        message: "Category not found with id " + req.params.id
      });
    }

    res.status(200).send(category);
  }).catch(error => {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `Entity not found: Category with id ${req.params.id}`,
          code: "ENTITY_NOT_FOUND"
        }
      });
    }

    return res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error updating category with id ${req.params.id}`,
        code: 'SOMETHING_WENT_WRONG'
      }
    });
  });
});
/**
 * @swagger
 * /categories:
 *   get:
 *     tags:
 *       - Categories
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
 *                   category_name:
 *                     type: boolean
 *                   category_path:
 *                     type: boolean
 *                   category_description:
 *                     type: boolean
 *                   category_banner:
 *                     type: boolean
 *                   category_banner_code:
 *                     type: boolean
 *                   category_image:
 *                     type: boolean
 *                   category_icon:
 *                     type: boolean
 *                   category_meta_title:
 *                     type: boolean
 *                   category_meta_description:
 *                     type: boolean
 *                   category_meta_keyword:
 *                     type: boolean
 *                   category_featured:
 *                     type: boolean
 *                   category_status:
 *                     type: boolean
 *                   additionalProperties: false
 *               - type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                   - category_name
 *                   - category_path
 *                   - category_description
 *                   - category_banner
 *                   - category_banner_code
 *                   - category_image
 *                   - category_icon
 *                   - category_meta_title
 *                   - category_meta_description
 *                   - category_meta_keyword
 *                   - category_featured
 *                   - category_status
 *                 uniqueItems: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of Category model instances
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/Category'
 */

router.get("/", function (req, res, next) {
  const filterBy = req.query.filter;
  const allFields = JSON.parse(filterBy).fields;

  for (const cateogoryKey in allFields) {
    if (allFields[categoryKey] == false) {
      delete allFields[categoryKey];
    }
  }

  _category.default.find(JSON.parse(filterBy).where.additionalProp1 ? {} : JSON.parse(filterBy).where, allFields).skip(JSON.parse(filterBy).offset || JSON.parse(filterBy).skip).limit(JSON.parse(filterBy).limit).sort(JSON.parse(filterBy).order).then(categories => {
    res.status(200).send(categories);
  }).catch(error => {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || "Some error occurred while retrieving categories.",
        code: 'SOMETHING_WENT_WRONG'
      }
    });
  });
});
module.exports = router;