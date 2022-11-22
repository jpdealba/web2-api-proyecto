const express = require("express");
const router = express.Router();
const controller = require("./controller");

// Envia los datos de inicio de sesion (usuario contrasena) y regresa un token
router.post("/", controller.postOne);

router.get("/:token", controller.getOne);

module.exports = router;
