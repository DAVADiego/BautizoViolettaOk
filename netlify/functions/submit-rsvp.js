const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Método no permitido',
        };
    }

    try {
        const data = JSON.parse(event.body);  // Obtiene los datos del formulario

        // Define la ruta del archivo JSON para guardar los datos
        const filePath = path.join('/tmp', 'rsvp-data.json');

        // Lee los datos existentes si el archivo ya tiene algo
        const existingData = fs.existsSync(filePath)
            ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
            : [];

        // Agrega los nuevos datos al array
        existingData.push(data);

        // Escribe los datos en el archivo
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Datos guardados correctamente' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al procesar los datos' }),
        };
    }
};