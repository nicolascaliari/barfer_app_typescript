const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require('path');
const db = require('./src/config/datebase');
const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');





async function getValues(spreadsheetId, range) {
    try {
        const auth = new GoogleAuth({
            keyFile: './src/json/credencial.json',
            scopes: 'https://www.googleapis.com/auth/spreadsheets',
        });

        const authClient = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: authClient });

        const result = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const numRows = result.data.values ? result.data.values.length : 0;
        console.log(`${numRows} rows retrieved.`);
        return result;
    } catch (err) {
        console.error('Error al obtener datos de Google Sheets:', err);
        throw err;
    }
}



const spreadsheetId = '1GWuEEJqcnOYwSVwfwhFh6N43OqANlplGaR5Ax-1NW20';
const range = '!A1:E10';
getValues(spreadsheetId, range)
    .then((result) => {
        console.log('Datos obtenidos:', result.data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'public/img')));


db.connect((err) => {
    if (err) {
        console.log('Error en la conexión a la base de datos:');
    } else {
        console.log('Conexión a la base de datos exitosa');
    }
});




async function insertarDatosEnGoogleSheets(status, items, direccion, telefono, payer) {
    const spreadsheetId = '1GWuEEJqcnOYwSVwfwhFh6N43OqANlplGaR5Ax-1NW20'; // Reemplaza con el ID de tu hoja de cálculo
    const range = '!A1:E10'; // Reemplaza con el nombre de la hoja en la que deseas insertar los datos

    // Configura la autenticación
    const auth = new GoogleAuth({
        keyFile: './src/json/credencial.json', // Ruta a tu archivo de credenciales
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    // Formatea los datos como quieras insertarlos en la hoja de cálculo
    const rowData = [payer.name, items.map(item => item.title).join(', '), direccion, telefono, status];


    try {
        const result = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            insertDataOption: 'INSERT_ROWS',
            resource: {
                values: [rowData],
            },
        });

        console.log(`${result.data.updates.updatedCells} celdas actualizadas.`);
    } catch (err) {
        console.error('Error al insertar datos en Google Sheets:', err);
        throw err;
    }
}

// Ruta para recibir los datos de Mercado Pago
app.post('/webhook', async (req, res) => {
    try {
        // Aquí puedes procesar los datos recibidos de Mercado Pago
        const { status, items, payer } = req.body;
        const direccion = payer.direccion; // Obtén la dirección de 'payer'
        const telefono = payer.telefono; // Obtén el teléfono de 'payer'

        // Luego, llama a la función para insertar los datos en Google Sheets
        await insertarDatosEnGoogleSheets(status, items, direccion, telefono, payer);


        // Responde con un mensaje de éxito
        res.status(200).json({ message: 'Datos guardados en Google Sheets con éxito' });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});




// Rutas
const productoRoutes = require('./src/routes/product');
app.use('/producto', productoRoutes);

const categoryRoutes = require('./src/routes/category');
app.use('/category', categoryRoutes);

const usuariosRoutes = require('./src/routes/user'); // Agrega las rutas de usuarios
app.use('/usuarios', usuariosRoutes); // Usa '/usuarios' como prefijo para las rutas de usuarios

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
