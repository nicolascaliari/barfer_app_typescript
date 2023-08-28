// Archivo: src/routes/usuariosRoutes.js
const express = require("express");
const router = express.Router();
const usuariosController = require('../controllers/userController');

router.get("/", usuariosController.getAll);
router.post("/create", usuariosController.create);
router.put("/update", usuariosController.update);
router.delete("/delete/:id", usuariosController.delete);

module.exports = router;
