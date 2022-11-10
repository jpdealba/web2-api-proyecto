const express = require("express");
const router = express.Router();
const controller = require("./controller");
// Crear una nueva transaccion
/**
 * @swagger
 * /api/transactions:
 *  post:
 *    description: Crear una nueva transaccion
 *    responses:
 *      201:
 *        description: Transaccion creada
 *      500:
 *        description: Server error
 */
router.post("/", controller.postTransaction);

// Obtener todas las transacciones de ese usuario
/**
 * @swagger
 * /api/transactions/user/{:user_id}:
 *  get:
 *    description: Obtener todas las transacciones de un usuario según su id
 *    parameters:
 *      - in: path
 *        name: :user_id
 *        description: User ID
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Obtiene todas las transacciones de un usuario
 *      404:
 *        description: Not found
 */
router.get("/user/:user_id", controller.getUserTransactions);

// Obtener todas las transacciones de una moneda
/**
 * @swagger
 * /api/transactions/{:coin_id}:
 *  get:
 *    description: Obtener todas las transacciones de una moneda según su id
 *    parameters:
 *      - in: path
 *        name: :coin_id
 *        description: Coin ID
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Obtiene todas las transacciones de una moneda
 *      404:
 *        description: Not found
 */
router.get("/:coin_id", controller.getCoinTransactions);

module.exports = router;
