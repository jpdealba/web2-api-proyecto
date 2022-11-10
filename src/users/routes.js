const express = require("express");
const router = express.Router();
const controller = require("./controller");

// Obtiene el usuario
/**
 * @swagger
 * /api/users/{:id}:
 *  get:
 *    description: Obtiene el usuario según su id
 *    parameters:
 *      - in: path
 *        name: :id
 *        description: User ID
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Obtiene el usuario
 *      404:
 *        description: Not found
 */
router.get("/:id", controller.getOne);

// Crea un nuevo usuario -. {name, email, photo, password}
/**
 * @swagger
 * /api/users/:
 *  post:
 *    description: Crea un nuevo usuario
 *    parameters:
 *      - in: body
 *        name: User JSON
 *        description: {name, email, photo, password}
 *        schema:
 *          type: object
 *    responses:
 *      201:
 *        description: Usuario creado
 *      500:
 *        description: Server error
 */
router.post("/", controller.postOne);

// Actualiza un usuario - Actualiza un nuevo usuario - {name?, email?, photo?, password?}
/**
 * @swagger
 * /api/users/{:id}:
 *  put:
 *    description: Actualiza el usuario según su id
 *    parameters:
 *      - in: path
 *        name: :id
 *        description: User ID
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Actualiza el usuario
 *      404:
 *        description: Not found
 */
router.put("/:id", controller.putOne);
/**
 * @swagger
 * /api/users/{:id}:
 *  delete:
 *    description: Elimina el usuario según su id
 *    parameters:
 *      - in: path
 *        name: :id
 *        description: User ID
 *        schema:
 *          type: string
 *    responses:
 *      204:
 *        description: Elimina el usuario
 *      404:
 *        description: Not found
 */
router.delete("/:id", controller.deleteOne);

module.exports = router;
