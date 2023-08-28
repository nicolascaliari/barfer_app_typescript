const express = require("express");
const router = express.Router();
const productoController = require('../controllers/productController');

router.post("/create", productoController.create);
router.put("/update", productoController.update);
router.get("/", productoController.getAll);
router.get("/:id", productoController.getById);
router.delete("/delete/:id", productoController.delete);

module.exports = router;
