const express = require("express");
const router = express.Router();
const controller = require("./controller");

// Obtener todas las monedas
/**
 * @swagger
 * /api/coins:
 *  get:
 *    description: Obtener todas las monedas
 *    responses:
 *      200:
 *        description: Obtiene todas las monedas
 *      404:
 *        description: Not found
 */
router.get("/", controller.getAll);
// Obtener una moneda
/**
 * @swagger
 * /api/coins/{:id}:
 *  get:
 *    description: Obtener una moneda segun su id
 *    parameters:
 *      - in: path
 *        name: :id
 *        description: Coin ID
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Obtiene una moneda
 *      404:
 *        description: Not found
 */
router.get("/:id", controller.getOne);

module.exports = router;
