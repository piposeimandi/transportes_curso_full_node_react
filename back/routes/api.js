var express = require('express');
var router = express.Router();
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

module.exports = router;    