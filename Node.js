const express = require('express');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/submit', async (req, res) => {
    const { name, age, email } = req.body;

    // Configurar transporte de nodemailer
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'tu-correo@gmail.com',
            pass: 'tu-contraseña'
        }
    });

    try {
        // Enviar email de confirmación
        await transporter.sendMail({
            from: '"Evento Especial" <tu-correo@gmail.com>',
            to: email,
            subject: 'Confirmación de Asistencia',
            text: `Hola ${name}, gracias por confirmar tu asistencia. ¡Nos vemos pronto!`,
        });

        // Agendar evento en Google Calendar (configuración extra requerida)
        const calendar = google.calendar({ version: 'v3', auth: 'tu-api-key' });
        await calendar.events.insert({
            calendarId: 'primary',
            resource: {
                summary: 'Asistencia Confirmada',
                description: `Confirmación de ${name}`,
                start: { dateTime: new Date().toISOString() },
                end: { dateTime: new Date(new Date().getTime() + 3600000).toISOString() }
            }
        });

        res.status(200).send({ message: 'Datos enviados exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error al procesar la solicitud' });
    }
});

app.listen(3000, () => console.log('Servidor ejecutándose en http://localhost:3000'));