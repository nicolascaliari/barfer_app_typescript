const db = require('../config/datebase');
// const imageUtils = require('../utils/imageUtils');




const productoController = {
    create: (req, res) => {
        const nombre = req.body.nombre;
        const descripcion = req.body.descripcion;
        const precio_cincokg = req.body.precio_cincokg;
        const precio_diezkg = req.body.precio_diezkg
        const img = req.body.img;
        const idCategory = req.body.idCategory;



        var _path = path.join(__dirname, "public/images/iphones");
        var base64Data = img.replace("data:image/png;base64,", "");

        let pathParcial = '';

        var _nombre = nombre.replace(' ', '_');
        console.log(_nombre)
        console.log(pathParcial)
        pathParcial = `/${_nombre}/${_nombre}.png`;
        fs.mkdir(_path + '\\' + _nombre, (err) => {
            console.log('error al crear directorio', err)
        })

        _path = path.join(_path, pathParcial);

        fs.writeFile(_path, base64Data, 'base64', function (err) {
            console.log(err);
        });

        db.query("INSERT INTO producto(nombre,descripcion, precio_cincokg, precio_diezkg ,img,idCategory) VALUES(?,?,?,?,?,?)", [nombre, descripcion, precio_cincokg, precio_diezkg, pathParcial, idCategory],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send("dispositivo registrado con exito");
                }
            }
        );
    },

    update: (req, res) => {
        const id = req.body.id;
        const nombre = req.body.nombre;
        const descripcion = req.body.descripcion;
        const precio_cincokg = req.body.precio_cincokg;
        const precio_diezkg = req.body.precio_diezkg
        const img = req.body.img;
        const idCategory = req.body.idCategory;




        var _path = path.join(__dirname, "public/images/iphones");
        var base64Data = img.replace("data:image/png;base64,", "");

        let pathParcial = '';

        var _nombre = nombre.replace(' ', '_');
        console.log(_nombre)
        console.log(pathParcial)
        pathParcial = `/${_nombre}/${_nombre}.png`;
        fs.mkdir(_path + '\\' + _nombre, (err) => {
            console.log('error al crear directorio', err)
        })

        _path = path.join(_path, pathParcial);

        fs.writeFile(_path, base64Data, 'base64', function (err) {
            console.log(err);
        });

        db.query("UPDATE producto SET nombre=?, descripcion=? ,precio_cincokg=?, precio_diezkg=? ,img=?, idCategory=? WHERE id=?", [nombre, descripcion, precio_cincokg, precio_diezkg, pathParcial, idCategory, id],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send("Dispositivo actualizado");
                }
            }
        );
    },

    getAll: (req, res) => {
        db.query("SELECT * FROM producto",
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(result);
                }
            }
        );
    },

    getById: (req, res) => {
        const idCategory =  req.params.id;

        db.query("SELECT * FROM producto WHERE idCategory = ?", [idCategory],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error al obtener los productos.");
                } else {
                    console.log(result); // Imprimir los datos recibidos por ID en la consola
                    res.send(result);
                    console.log(idCategory)
                }
            }
        );
    },

    delete: (req, res) => {
        const id = req.params.id;

        db.query("DELETE FROM producto WHERE id=?", [id],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send("Producto eliminado");
                }
            }
        );
    }
};

module.exports = productoController;
