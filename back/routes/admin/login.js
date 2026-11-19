var express = require('express');
var router = express.Router();

var usuarioModel = require('../../models/usuarioModel');

// diseño de formulario
router.get('/', function(req, res, next) {
    res.render('admin/login', {
        layout: 'admin/layout',
    });
});

/* procesar formulario por post*/
router.post('/', async function(req, res, next) {
    try {
        var username = req.body.username;
        var password = req.body.password;

        var usuario = await usuarioModel.getuserbypasswordandusername(username, password);      

        if (usuario != undefined) {
            res.redirect('/admin/novedades');
        }else {
            res.render('admin/login', {
                layout: 'admin/layout',
                error: 'Nombre de usuario o contraseña incorrectos'
            });
        }

        
    } catch (error) {
        console.log('Error al procesar el formulario de inicio de sesión:', error);
    }
});

module.exports = router;
