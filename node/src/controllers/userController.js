// Archivo: src/controllers/usuariosController.js
const db = require('../config/datebase');

const usuariosController = {
    getAll: (req, res) => {
        db.query("SELECT * FROM usuarios",
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
        const nombre = req.body.nombre;
        const apellido = req.body.apellido;
        const email = req.body.email;
        const password = req.body.password;
        const direccion = req.body.direccion;
        const telefono = req.body.telefono;


        db.query("INSERT INTO usuarios(nombre,apellido, email, password,direccion,telefono) VALUES(?,?,?,?,?,?)", [nombre, apellido, email, password, direccion, telefono],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send("usuario registrado con exito");
                }
            }
        );
    },

    update: (req, res) => {
        const idusuarios = req.body.idusuarios;
        const nombre = req.body.nombre;
        const apellido = req.body.apellido;
        const email = req.body.email;
        const password = req.body.password
        const direccion = req.body.direccion;
        const telefono = req.body.telefono;

        db.query("UPDATE usuarios SET nombre=?, apellido=? ,email=?, password=? , direccion=?,telefono=?  WHERE idusuarios=?", [nombre, apellido, email, password, idusuarios, direccion, telefono],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send("usuario actualizado");
                }
            }
        );
    },

    delete: (req, res) => {
        // Lógica para eliminar un usuario
    }
};

module.exports = usuariosController;
