require('dotenv').config();
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
            keyFile:process.env.GOOGLE_SHEETS_KEYFILE,
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



const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
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
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const range = '!A1:E10'; 


    const auth = new GoogleAuth({
        keyFile: process.env.GOOGLE_SHEETS_KEYFILE, 
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    
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


app.post('/webhook', async (req, res) => {
    try {
        const { status, items, payer } = req.body;
        const direccion = payer.direccion;
        const telefono = payer.telefono; 

 
        await insertarDatosEnGoogleSheets(status, items, direccion, telefono, payer);



        res.status(200).json({ message: 'Datos guardados en Google Sheets con éxito' });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});





const productoRoutes = require('./src/routes/product');
app.use('/producto', productoRoutes);

const categoryRoutes = require('./src/routes/category');
app.use('/category', categoryRoutes);

const usuariosRoutes = require('./src/routes/user'); 
app.use('/usuarios', usuariosRoutes); 

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
