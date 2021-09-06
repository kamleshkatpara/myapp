"use strict";

var _express = _interopRequireDefault(require("express"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

/**
 * @swagger
 * /containers:
 *   get:
 *     tags:
 *       - Containers
 *     operationId: getContainers
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Request was successful
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/Container'
 */
router.get("/", function (req, res, next) {
  try {
    const files = _fsExtra.default.readdirSync(process.env.UPLOADS_DIR);

    const filelist = [];
    files.forEach(folder => {
      const data = _fsExtra.default.statSync(process.env.UPLOADS_DIR + folder);

      filelist.push({
        name: folder,
        size: data.size,
        attime: data.atime,
        mtime: data.mtime,
        ctime: data.birthtime
      });
    });
    res.status(200).send(filelist);
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error retreiving containers`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  }
});
/**
 * @swagger
 * /containers:
 *   post:
 *     tags:
 *       - Containers
 *     operationId: createContainer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/NewContainer'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Request was successful
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/Container'
 */

router.post("/", function (req, res, next) {
  try {
    if (Object.keys(req.body).length == 0) {
      return res.status(400).send({
        error: {
          statusCode: 400,
          name: "Bad Request",
          message: "Entity body property missing: Container body data can not be empty",
          code: "ENTITY_BODY_PROPERTY_MISSING"
        }
      });
    }

    if (!req.body.hasOwnProperty("name")) {
      return res.status(400).send({
        error: {
          statusCode: 400,
          name: "Bad Request",
          message: "Entity body property missing: Container body data property can not be empty",
          code: "ENTITY_BODY_MISSING"
        }
      });
    }

    if (_fsExtra.default.existsSync(process.env.UPLOADS_DIR + req.body.name)) {
      res.status(409).send({
        error: {
          statusCode: 409,
          name: "Error",
          message: `EXIST: folder already exists, mkdir ${process.cwd()}\\${process.env.UPLOADS_DIR}\\${req.body.name}`,
          errno: -4075,
          code: "EXIST",
          syscall: "mkdir",
          path: `${process.cwd()}\\${process.env.UPLOADS_DIR}\\${req.body.name}`,
          stack: `Error: EXIST: folder already exists, mkdir ${process.cwd()}\\${process.env.UPLOADS_DIR}\\${req.body.name}`
        }
      });
    } else {
      _fsExtra.default.mkdirSync(process.env.UPLOADS_DIR + req.body.name);

      const data = _fsExtra.default.statSync(process.env.UPLOADS_DIR + req.body.name);

      res.status(200).send({
        name: req.body.name,
        size: data.size,
        attime: data.atime,
        mtime: data.mtime,
        ctime: data.birthtime
      });
    }
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error creating container`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  }
});
/**
 * @swagger
 * /containers/{container}:
 *   get:
 *     tags:
 *       - Containers
 *     operationId: getContainer
 *     parameters:
 *     - name: container
 *       in: path
 *       schema:
 *          type: string
 *       required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Request was successful
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/Container'
 */

router.get("/:container", function (req, res, next) {
  try {
    if (_fsExtra.default.existsSync(process.env.UPLOADS_DIR + req.params.container)) {
      const data = _fsExtra.default.statSync(process.env.UPLOADS_DIR + req.params.container);

      res.status(200).send({
        name: req.params.container,
        size: data.size,
        attime: data.atime,
        mtime: data.mtime,
        ctime: data.birthtime
      });
    } else {
      res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `ENOENT: no such file or directory, stat ${process.cwd()}\\${process.env.UPLOADS_DIR}\\${req.params.container}`,
          errno: -4058,
          code: "ENOENT",
          syscall: "stat",
          path: `${process.cwd()}\\${process.env.UPLOADS_DIR}\\${req.params.container}`,
          status: 404,
          stack: `Error: ENOENT: no such file or directory, stat ${process.cwd()}\\${process.env.UPLOADS_DIR}\\${req.params.container}`
        }
      });
    }
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error retreiving container`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  }
});
/**
 * @swagger
 * /containers/{container}:
 *   delete:
 *     tags:
 *       - Containers
 *     operationId: destroyContainer
 *     parameters:
 *     - name: container
 *       in: path
 *       schema:
 *          type: string
 *       required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Request was successful
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 */

router.delete("/:container", function (req, res, next) {
  try {
    if (_fsExtra.default.existsSync(process.env.UPLOADS_DIR + req.params.container)) {
      const data = _fsExtra.default.rmdirSync(process.env.UPLOADS_DIR + req.params.container);

      res.status(200).send({
        statusCode: 200,
        message: `Container named as ${req.params.container} has been deleted`
      });
    } else {
      res.status(404).send({
        error: {
          statusCode: 404,
          name: "Error",
          message: `ENOENT: no such file or directory, stat ${process.cwd()}\\${process.env.UPLOADS_DIR}\\${req.params.container}`,
          errno: -4058,
          code: "ENOENT",
          syscall: "stat",
          path: `${process.cwd()}\\${process.env.UPLOADS_DIR}\\${req.params.container}`,
          status: 404,
          stack: `Error: ENOENT: no such file or directory, stat ${process.cwd()}\\${process.env.UPLOADS_DIR}\\${req.params.container}`
        }
      });
    }
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error deleting container`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  }
});
/**
 * @swagger
 * /containers/{container}/download/{file}:
 *   get:
 *     tags:
 *       - Containers
 *     operationId: containers_download
 *     parameters:
 *       - name: container
 *         in: path
 *         required: true
 *         schema:
 *            type: string
 *       - name: file
 *         in: path
 *         required: true
 *         schema:
 *            type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Request was successful
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/Container'
 */

router.get("/:container/download/:file", function (req, res, next) {
  try {
    if (_fsExtra.default.existsSync(process.env.UPLOADS_DIR + req.params.container + "/" + req.params.file)) {
      res.header("Content-disposition", "attachment; filename=" + process.env.UPLOADS_DIR + req.params.container + "/" + req.params.file);
      res.download(process.env.UPLOADS_DIR + req.params.container + "/" + req.params.file);
    } else {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Error",
          message: `ENOENT: no such file or directory, rmdir stat ${process.cwd()}\\${process.env.UPLOADS_DIR}\\${req.params.container}`,
          errno: -4058,
          code: "ENOENT",
          syscall: "rmdir",
          path: `${process.cwd()}\\${process.env.UPLOADS_DIR}\\${req.params.container}`,
          stack: `Error: ENOENT: no such file or directory, rmdir  stat ${process.cwd()}\\${process.env.UPLOADS_DIR}\\${req.params.container}`
        }
      });
    }
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error downloading container file`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  }
});
/**
 * @swagger
 * /containers/{container}/files:
 *   get:
 *     tags:
 *       - Containers
 *     operationId: containers_getFiles
 *     parameters:
 *        - name: container
 *          in: path
 *          schema:
 *             type: string
 *          required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Request was successful
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/Container'
 */

router.get("/:container/files", function (req, res, next) {
  try {
    if (_fsExtra.default.existsSync(process.env.UPLOADS_DIR + req.params.container + "/")) {
      const files = _fsExtra.default.readdirSync(process.env.UPLOADS_DIR + req.params.container + "/");

      const filelist = [];
      files.forEach(file => {
        const data = _fsExtra.default.statSync(process.env.UPLOADS_DIR + req.params.container + "/" + file);

        filelist.push({
          name: file,
          path: `${process.env.UPLOADS_DIR}${req.params.container}/${file}`,
          size: data.size,
          attime: data.atime,
          mtime: data.mtime,
          ctime: data.birthtime
        });
      });
      res.status(200).send(filelist);
    } else {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Error",
          message: `ENOENT: no such file or directory, rmdir stat ${process.cwd()}\\${process.env.UPLOADS_DIR}\\${req.params.container}`,
          errno: -4058,
          code: "ENOENT",
          syscall: "rmdir",
          path: `${process.cwd()}\\${process.env.UPLOADS_DIR}\\${req.params.container}`,
          stack: `Error: ENOENT: no such file or directory, rmdir  stat ${process.cwd()}\\${process.env.UPLOADS_DIR}\\${req.params.container}`
        }
      });
    }
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error retrieving container files`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  }
});
/**
 * @swagger
 * /containers/{container}/files/{file}:
 *   get:
 *     tags:
 *       - Containers
 *     operationId: containers_getFile
 *     parameters:
 *       - name: container
 *         in: path
 *         required: true
 *         schema:
 *            type: string
 *       - name: file
 *         in: path
 *         required: true
 *         schema:
 *            type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Request was successful
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     items:
 *                        $ref: '#/components/schemas/ContainerWithFile'
 */

router.get("/:container/files/:file", function (req, res, next) {
  try {
    if (_fsExtra.default.existsSync(process.env.UPLOADS_DIR + req.params.container + "/" + req.params.file)) {
      const file = _fsExtra.default.statSync(process.env.UPLOADS_DIR + req.params.container + "/" + req.params.file);

      res.status(200).send({
        container: req.params.container,
        name: req.params.file,
        size: file.size,
        atime: file.atime,
        mtime: file.mtime,
        ctime: file.ctime
      });
    } else {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Error",
          message: `ENOENT: no such file or directory, rmdir stat ${process.cwd()}\\${process.env.UPLOADS_DIR}\\${req.params.container}\\${req.params.file}`,
          errno: -4058,
          code: "ENOENT",
          syscall: "unlink",
          path: `${process.cwd()}\\${process.env.UPLOADS_DIR}\\${req.params.file}`,
          stack: `Error: ENOENT: no such file or directory, rmdir  stat ${process.cwd()}\\${process.env.UPLOADS_DIR}\\${req.params.file}`
        }
      });
    }
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error retrieving container with file information`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  }
});
/**
 * @swagger
 * /containers/{container}/files/{file}:
 *   delete:
 *     tags:
 *       - Containers
 *     operationId: containers_removeFile
 *     parameters:
 *       - name: container
 *         in: path
 *         required: true
 *         schema:
 *            type: string
 *       - name: file
 *         in: path
 *         required: true
 *         schema:
 *            type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Request was successful
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     items:
 *                        $ref: '#/components/schemas/ContainerWithFile'
 */

router.delete("/:container/files/:file", function (req, res, next) {
  try {
    if (_fsExtra.default.existsSync(process.env.UPLOADS_DIR + req.params.container + "/" + req.params.file)) {
      _fsExtra.default.unlinkSync(process.env.UPLOADS_DIR + req.params.container + "/" + req.params.file);

      res.status(200).send({
        statusCode: 200,
        message: `Container file named as ${req.params.file} has been deleted`
      });
    } else {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: "Error",
          message: `ENOENT: no such file or directory, rmdir stat ${process.cwd()}\\${process.env.UPLOADS_DIR}\\${req.params.container}\\${req.params.file}`,
          errno: -4058,
          code: "ENOENT",
          syscall: "unlink",
          path: `${process.cwd()}\\${process.env.UPLOADS_DIR}\\${req.params.container}\\${req.params.file}`,
          stack: `Error: ENOENT: no such file or directory, rmdir  stat ${process.cwd()}\\process.env.UPLOADS_DIR\\${req.params.container}\\${req.params.file}`
        }
      });
    }
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error deleting file from container`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  }
});
/**
 * @swagger
 * /containers/{container}/singleupload:
 *   post:
 *     tags:
 *       - Containers
 *     operationId: containers_singleupload
 *     parameters:
 *     - name: container
 *       in: path
 *       schema:
 *          type: string
 *       required: true
 *     requestBody:
 *        content:
 *           multipart/form-data:
 *              schema:
 *                 type: object
 *                 properties:
 *                     file:
 *                        type: string
 *                        description: ""
 *                        format: binary
 *                        nullable: true
 *           encoding:
 *              file:
 *                 style: form
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Request was successful
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/Container'
 *       400:
 *         description: Bad Request
 */

router.post("/:container/singleupload", (req, res, next) => {
  try {
    const currentDateNow = new Date();
    const isoDate = currentDateNow.toISOString();

    const storage = _multer.default.diskStorage({
      destination: function (req, file, cb) {
        cb(null, `${process.env.UPLOADS_DIR}${req.params.container}`);
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname.substr(0, file.originalname.indexOf(".")) + "-" + Date.now() + _path.default.extname(file.originalname));
      }
    });

    const imageFilter = function (req, file, cb) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = "Only image files are allowed!";
        return cb(new Error("Only image files are allowed!"), false);
      }

      cb(null, true);
    };

    let upload = (0, _multer.default)({
      storage: storage,
      fileFilter: imageFilter,
      limits: {
        fileSize: process.env.UPLOADS_SIZE_LIMIT
      }
    }).single("file");
    upload(req, res, function (error) {
      if (req.fileValidationError) {
        return res.status(400).send({
          error: {
            statusCode: 400,
            name: "Error",
            message: req.fileValidationError || "Upload Validation Error",
            code: "ENTITY_MISSING"
          }
        });
      } else if (!req.file) {
        return res.status(400).send({
          error: {
            statusCode: 400,
            name: "Error",
            message: "Please select an image to upload",
            code: "ENTITY_MISSING"
          }
        });
      } else if (error instanceof _multer.default.MulterError) {
        return res.status(500).send({
          error: {
            statusCode: 500,
            name: "Server Error",
            message: error.message || `Error uploading file`,
            code: "SOMETHING_WENT_WRONG"
          }
        });
      } else if (error) {
        return res.status(500).send({
          error: {
            statusCode: 500,
            name: "Server Error",
            message: error.message || `Error uploading file`,
            code: "SOMETHING_WENT_WRONG"
          }
        });
      }

      res.status(200).send({
        name: req.file.path,
        size: req.file.size,
        atime: isoDate,
        mtime: isoDate,
        ctime: isoDate
      });
    });
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error uploading file`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  }
});
/**
 * @swagger
 * /containers/{container}/multiupload:
 *   post:
 *     tags:
 *       - Containers
 *     operationId: containers_multiupload
 *     description: MULTIPLE_UPLOAD_LIMIT = 5
 *     parameters:
 *     - name: container
 *       in: path
 *       schema:
 *          type: string
 *       required: true
 *     requestBody:
 *        content:
 *           multipart/form-data:
 *              schema:
 *                 type: object
 *                 properties:
 *                     file:
 *                        type: array
 *                        items:
 *                           type: string
 *                           format: binary
 *                        description: ""
 *                        nullable: true
 *           encoding:
 *              file:
 *                 style: form
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Request was successful
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/Container'
 */

router.post("/:container/multiupload", (req, res, next) => {
  try {
    const currentDateNow = new Date();
    const isoDate = currentDateNow.toISOString();

    const storage = _multer.default.diskStorage({
      destination: function (req, file, cb) {
        cb(null, `${process.env.UPLOADS_DIR}${req.params.container}`);
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname.substr(0, file.originalname.indexOf(".")) + "-" + Date.now() + _path.default.extname(file.originalname));
      }
    });

    const imageFilter = function (req, file, cb) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = "Only image files are allowed!";
        return cb(new Error("Only image files are allowed!"), false);
      }

      cb(null, true);
    };

    let upload = (0, _multer.default)({
      storage: storage,
      fileFilter: imageFilter,
      limits: {
        fileSize: process.env.UPLOADS_SIZE_LIMIT
      }
    }).array("file", process.env.MULTIPLE_UPLOAD_LIMIT);
    upload(req, res, function (error) {
      if (req.fileValidationError) {
        return res.status(400).send({
          error: {
            statusCode: 400,
            name: "Error",
            message: req.fileValidationError || "Upload Validation Error",
            code: "ENTITY_MISSING"
          }
        });
      } else if (!req.files) {
        return res.status(400).send({
          error: {
            statusCode: 400,
            name: "Error",
            message: "Please select an image to upload",
            code: "ENTITY_MISSING"
          }
        });
      } else if (error instanceof _multer.default.MulterError) {
        return res.status(500).send({
          error: {
            statusCode: 500,
            name: "Server Error",
            message: error.message || `Error uploading files`,
            code: "SOMETHING_WENT_WRONG"
          }
        });
      } else if (error) {
        return res.status(500).send({
          error: {
            statusCode: 500,
            name: "Server Error",
            message: error.message || `Error uploading files`,
            code: "SOMETHING_WENT_WRONG"
          }
        });
      }

      const files = req.files;
      let index, len;
      const filesArray = [];

      for (index = 0, len = files.length; index < len; ++index) {
        filesArray.push({
          name: files[index].path,
          size: files[index].size,
          atime: isoDate,
          mtime: isoDate,
          ctime: isoDate
        });
      }

      res.status(200).send(filesArray);
    });
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: "Server Error",
        message: error.message || `Error uploading files`,
        code: "SOMETHING_WENT_WRONG"
      }
    });
  }
});
module.exports = router;