var express = require('express');
var router = express.Router();

var usuarioModel = require('../../models/usuarios.model');

// diseño de formulario
router.get('/', function(req, res, next) {
    res.render('admin/login', {
        layout: 'admin/layout',
    });
});

/*destruir la session*/
router.get('/logout', function(req, res, next) {
    req.session.destroy(function(error) {
        if (error) {
            return next(error);
        }
        res.render('admin/login', {
            layout: 'admin/layout',
            error: 'Sesión cerrada correctamente'
        });
    });
});


/* procesar formulario por post*/
router.post('/', async function(req, res, next) {
    try {
        var username = req.body.username;
        var password = req.body.password;

        var usuario = await usuarioModel.getuserbypasswordandusername(username, password);      

        if (usuario != undefined) {
            req.session.id_usuario = usuario.id
            req.session.nombre = usuario.usuario
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
