const express = require("express");
const router = express.Router();

// Obtiene todos los usuarios
router.get("/:id", (req, res) => {
  res.send("Get user works with id: " + req.params.id).status(200);
});

// Crea un nuevo usuario
router.post("/", (req, res) => {
  res.send("Post new user works").status(201);
});

// Actualiza un usuario
router.put("/", (req, res) => {
  res.send("Put update user image works").status(201);
});

module.exports = router;
