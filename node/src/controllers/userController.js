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
        const provincia = req.body.provincia;
        const localidad = req.body.localidad;
        const piso = req.body.piso;

        db.query("INSERT INTO usuarios(nombre,apellido, email, password,direccion,telefono,provincia,localidad,piso) VALUES(?,?,?,?,?,?,?,?,?)", [nombre, apellido, email, password, direccion, telefono, provincia, localidad, piso],
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
        const provincia = req.body.provincia;
        const localidad = req.body.localidad;
        const piso = req.body.piso;

        db.query("UPDATE usuarios SET nombre=?, apellido=? ,email=?, password=? , direccion=?,telefono=?, provincia=?,localidad=?,piso=?  WHERE idusuarios=?", [nombre, apellido, email, password, idusuarios, direccion, telefono, provincia, localidad, piso],
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
