var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var novedadesModel = require('../models/novedades.model');

/* GET novedades listing. */
router.get('/novedades', async function(req, res, next) {
  try {
    var novedades = await novedadesModel.getNovedades();
    res.json(novedades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las novedades' });
  }
});

/* POST contacto: envía el formulario de contacto por mail. */
router.post('/contacto', async function(req, res, next) {
  try {
    var mail = {
      to: process.env.MAIL_TO || 'flavia.ursino@gmail.com',
      subject: 'Contacto web',
      html: `${req.body.nombre} se contactó a través de la web y quiere más información a este correo: ${req.body.email} <br> Además, hizo el siguiente comentario: ${req.body.mensaje} <br> Su teléfono es: ${req.body.telefono} <br> Motivo: ${req.body.motivo || 'No especificado'}`
    };

    var transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transport.sendMail(mail);

    res.status(201).json({
      error: false,
      message: 'Mensaje enviado'
    });
  } catch (error) {
    console.error('Error al enviar el mail:', error);
    res.status(500).json({
      error: true,
      message: 'No se pudo enviar el mensaje'
    });
  }
});

module.exports = router;