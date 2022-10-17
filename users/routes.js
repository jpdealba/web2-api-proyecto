const express = require("express");
const router = express.Router();

// Obtiene el usuario
router.get("/:id", (req, res) => {
  res.send("Get user works with id: " + req.params.id).status(200);
});

// Crea un nuevo usuario -. {name, email, photo, password}
router.post("/", (req, res) => {
  res.send("Post new user works").status(201);
});

// Actualiza un usuario - Actualiza un nuevo usuario - {name?, email?, photo?, password?}
router.put("/:user_id", (req, res) => {
  res
    .send("Put update user works with user_id: " + req.params.user_id)
    .status(201);
});

module.exports = router;
