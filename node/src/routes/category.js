// Archivo: src/routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get("/", categoryController.getAll);
router.post("/create", categoryController.create);
router.put("/update", categoryController.update);
router.delete("/delete/:id", categoryController.delete);

module.exports = router;
