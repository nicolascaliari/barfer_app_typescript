// Archivo: src/controllers/categoryController.js
const db = require('../config/datebase');

const categoryController = {
    getAll: (req, res) => {
        db.query("SELECT * FROM category",
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(result);
                }
            }
        );
    },

    create: (req, res) => {
        // Lógica para crear una nueva categoría
    },

    update: (req, res) => {
        // Lógica para actualizar una categoría
    },

    delete: (req, res) => {
        // Lógica para eliminar una categoría
    },

    getById: (req, res) => {
        const id = req.params.id;

        db.query("SELECT * FROM category WHERE id = ?", [id],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error al obtener los productos.");
                } else {
                    console.log(result); // Imprimir los datos recibidos por ID en la consola
                    res.send(result);
                }
            }
        );
    },
};

module.exports = categoryController;
