const express = require("express");
const router = express.Router();
const controller = require("./controller");

// Obtener todas las monedas
router.get("/", controller.getAll);
// Obtener todas las monedas
router.get("/:id", controller.getOne);

module.exports = router;
