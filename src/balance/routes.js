const express = require("express");
const router = express.Router();
const controller = require("./controller");

// Obtener balance de usuario
router.get("/:id", controller.getAll);

module.exports = router;
