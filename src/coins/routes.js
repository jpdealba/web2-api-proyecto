const express = require("express");
const router = express.Router();
const controller = require("./controller");

// Obtener todas las monedas
router.get("/", controller.getAll);

// Obtener balance de un usuario
router.get("/:user_id", controller.getOne);

module.exports = router;
