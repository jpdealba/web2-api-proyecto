const express = require("express");
const router = express.Router();
const controller = require("./controller");

// Obtiene el usuario
/**
 * @swagger
 * /api/users/:id:
 *  get:
 *    description: Obtiene el usuario según su id
 *    parameters:
 *      - in: query|path
 *        name: id
 *        description: put id
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
 * /api/users/:id:
 *  post:
 *    description: Obtiene el usuario según su id
 *    parameters:
 *      - in: query|path
 *        name: id
 *        description: put id
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Obtiene el usuario
 *      404:
 *        description: Not found
 */
router.post("/", controller.postOne);

// Actualiza un usuario - Actualiza un nuevo usuario - {name?, email?, photo?, password?}
router.put("/:id", controller.putOne);

router.delete("/:id", controller.deleteOne);

module.exports = router;
