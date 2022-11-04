const express = require("express");
const router = express.Router();
const controller = require("./controller");
// Obtiene el usuario
router.get("/:id", controller.getOne);

// Crea un nuevo usuario -. {name, email, photo, password}
router.post("/", controller.postOne);

// Actualiza un usuario - Actualiza un nuevo usuario - {name?, email?, photo?, password?}
router.put("/:id", controller.putOne);

router.delete("/:id", controller.deleteOne);

module.exports = router;
