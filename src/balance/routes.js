const express = require("express");
const router = express.Router();
const controller = require("./controller");

// Obtener balance de usuario
/**
 * @swagger
 * /api/balance/{:id}:
 *  get:
 *    description: Obtiene el balance de un usuario según su id
 *    parameters:
 *      - in: path
 *        name: :id
 *        description: User ID
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Obtiene el balance de un usuario
 *      404:
 *        description: Not found
 */
router.get("/:id", controller.getAll);

module.exports = router;
