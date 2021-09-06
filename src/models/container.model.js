import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *  schemas:
 *    Container:
 *      properties:
 *        name:
 *          type: string
 *        size:
 *          type: number
 *        atime:
 *          type: string
 *        mtime:
 *          type: string
 *        ctime:
 *          type: string
 */


/**
 * @swagger
 * components:
 *  schemas:
 *    NewContainer:
 *      properties:
 *        name:
 *          type: string
 */


/**
 * @swagger
 * components:
 *  schemas:
 *    ContainerWithFile:
 *      properties:
 *        container:
 *          type: string
 *        name:
 *          type: string
 *        size:
 *          type: number
 *        atime:
 *          type: string
 *        mtime:
 *          type: string
 *        ctime:
 *          type: string
 */


 