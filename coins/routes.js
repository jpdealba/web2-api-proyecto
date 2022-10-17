const express = require("express");
const router = express.Router();

// Obtener todas las monedas
router.get("/", (req, res) => {
  res.send("Get coins works").status(200);
});

// Crear una nueva transaccion
router.post("/transaction", (req, res) => {
  res.send("Post new user transaction works").status(201);
});

// Obtener todas las transacciones de ese usuario
router.get("/transactions/user/:user_id", (req, res) => {
  res
    .send("Get user transactions works with user_id: " + req.params.user_id)
    .status(200);
});

// Obtener balance de un usuario
router.get("/:user_id", (req, res) => {
  res
    .send("Get user balance works with user_id: " + req.params.user_id)
    .status(200);
});

// traer todas las transacciones de una moneda
router.get("/transactions/:coin_id", (req, res) => {
  res
    .send("Get coin transactions works with coin_id: " + req.params.coin_id)
    .status(200);
});

module.exports = router;
