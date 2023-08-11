const express = require("express");
const path = require('path');
const app = express();
const mysql = require('mysql')
const cors = require("cors");
const fs = require('fs');



app.use(cors());
app.use(express.json())




// Configurar el middleware para servir archivos estáticos
app.use('/images', express.static(path.join(__dirname, 'public/img')));
 

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'agunic1004',
    database: "barfer"
});




app.post("/create", (req, res) => {
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
        fs.mkdir(_path+'\\'+_nombre,(err)=>{
            console.log('error al crear directorio' , err)
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
});


//FUNCION PARA MODIFICAR DISPOSITIVOS
app.put("/update", (req, res) => {
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
        fs.mkdir(_path+'\\'+_nombre,(err)=>{
            console.log('error al crear directorio' , err)
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
});



//FUNCION QUE SIRVE PARA TRAERME TODOS LOS DISPOSITIVOS
app.get("/producto", (req, res) => {

    db.query("SELECT * FROM producto",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});



//FUNCION QUE SIRVE PARA TRAERME TODOS LAS CATEGORIAS
app.get("/category", (req, res) => {

    db.query("SELECT * FROM category",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});








//FUNCION PARA ELIMINAR
app.delete("/delete/:id", (req, res) => {
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
});




app.get("/category/:id", (req, res) => {
    const id = req.params.id;

    db.query("SELECT * FROM producto WHERE idCategory = ?", [id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al obtener los producto.");
            } else {
                console.log(result); // Imprimir los datos recibidos por ID en la consola
                res.send(result);
            }
        }
    );
});



app.get("/dispositivo/:id", (req, res) => {
    const id = req.params.id;

    db.query("SELECT * FROM producto WHERE id = ?", [id],
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
});


///==========================/// parte para los usuarios


app.get("/usuarios", (req, res) => {

    db.query("SELECT * FROM usuarios",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.post("/createusuario", (req, res) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const email = req.body.email;
    const password = req.body.password

    db.query("INSERT INTO usuarios(nombre,apellido, email, password) VALUES(?,?,?,?)", [nombre, apellido, email, password],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("usuario registrado con exito");
            }
        }
    );
});




app.put("/updateusuarios", (req, res) => {
    const idusuarios = req.body.idusuarios;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const email = req.body.email;
    const password = req.body.password

    db.query("UPDATE usuarios SET nombre=?, apellido=? ,email=?, password=?  WHERE idusuarios=?", [nombre, apellido, email, password,idusuarios],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("usuario actualizado");
            }
        }
    );
});


app.listen(3001, () => {
    console.log("corriendo en el puerto 3001");
});


