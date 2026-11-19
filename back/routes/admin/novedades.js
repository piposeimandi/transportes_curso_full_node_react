var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedades.model');


// diseño de formulario
router.get('/', async function(req, res, next) {
    var novedades = await novedadesModel.getNovedades();
    res.render('admin/novedades', {
        novedades: novedades,
        layout: 'admin/layout',
    });
});

// Formulario para agregar novedades
router.get('/agregar', (req, res, next) => {
    res.render('admin/novedadAgregar', {
        layout: 'admin/layout'
    });
});

router.get('/', async function(req, res, next) {
    var novedades = await novedadesModel.getNovedades();
    res.render('admin/novedades', {
        novedades: novedades,
        layout: 'admin/layout',
    });
});

router.post('/agregar', async (req, res, next) => {
    try {
        if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
            await novedadesModel.insertNovedad(req.body);
            res.redirect('/admin/novedades');
        } else {
            res.render('admin/novedadAgregar', {
                layout: 'admin/layout',
                error: 'Todos los campos son obligatorios'
            });
        }
    } catch (error) {
        console.log(error);
        res.render('admin/novedadAgregar', {
            layout: 'admin/layout',
            error: 'Error al agregar la novedad'
        });
    }
});

router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await novedadesModel.deleteNovedadById(id);
    res.redirect('/admin/novedades');
});

router.get('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;
    var novedad = await novedadesModel.getNovedadById(id);
    res.render('admin/novedadModificar', {
        layout: 'admin/layout',
        novedad
    });
});

router.post('/modificar', async (req, res, next) => {
    try {
        var obj = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo
        }
        await novedadesModel.updateNovedadById(obj, req.body.id);
        res.redirect('/admin/novedades');
    } catch (error) {
        console.log(error);
        res.render('admin/novedadesModificar', {
            layout: 'admin/layout',
            error: 'Error al modificar la novedad'
        });
    }
}); 

module.exports = router;
