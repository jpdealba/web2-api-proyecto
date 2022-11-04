const express = require("express");
const router = express.Router();
const controller = require("./controller");
// Crear una nueva transaccion
router.post("/", controller.postTransaction);

// Obtener todas las transacciones de ese usuario
router.get("/user/:user_id", controller.getUserTransactions);

// traer todas las transacciones de una moneda
router.get("/:coin_id", controller.getCoinTransactions);

module.exports = router;
