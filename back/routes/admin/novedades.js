var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedades.model');
var crypto = require('crypto');
var fs = require('fs').promises;
var path = require('path');

var imageDirectory = path.join(__dirname, '../../storage/images');
var allowedImageTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp'
};

async function saveNovedadImage(req) {
    var file = req.files && req.files.imagen;
    if (!file) return null;

    var extension = path.extname(file.name).toLowerCase();
    if (!allowedImageTypes[extension] || allowedImageTypes[extension] !== file.mimetype) {
        var typeError = new Error('La imagen debe ser JPG, PNG, GIF o WEBP');
        typeError.name = 'ValidationError';
        throw typeError;
    }
    if (file.truncated || file.size > 5 * 1024 * 1024 || file.size === 0) {
        var sizeError = new Error('La imagen debe pesar más de 0 y hasta 5 MB');
        sizeError.name = 'ValidationError';
        throw sizeError;
    }

    var storedName = crypto.randomBytes(16).toString('hex') + extension;
    var originalName = path.basename(file.name.replace(/\\/g, '/'));
    await fs.mkdir(imageDirectory, { recursive: true });
    await file.mv(path.join(imageDirectory, storedName));

    return { imagen: storedName, nombre_imagen: originalName };
}

async function removeNovedadImage(imageName) {
    if (imageName && path.basename(imageName) === imageName) {
        try {
            await fs.unlink(path.join(imageDirectory, imageName));
        } catch (error) {
            if (error.code !== 'ENOENT') throw error;
        }
    }
}

async function cleanUpUploadedImage(image) {
    if (!image) return;
    try {
        await removeNovedadImage(image.imagen);
    } catch (error) {
        console.error('Error al limpiar la imagen subida:', error);
    }
}

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
    var uploadedImage;
    try {
        if (!req.body.titulo || !req.body.subtitulo || !req.body.cuerpo) {
            res.render('admin/novedadAgregar', {
                layout: 'admin/layout',
                error: 'Todos los campos son obligatorios'
            });
            return;
        }

        uploadedImage = await saveNovedadImage(req);
        var obj = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo
        };
        if (uploadedImage) Object.assign(obj, uploadedImage);
        await novedadesModel.insertNovedad(obj);
        res.redirect('/admin/novedades');
    } catch (error) {
        await cleanUpUploadedImage(uploadedImage);
        console.error(error);
        res.render('admin/novedadAgregar', {
            layout: 'admin/layout',
            error: error.name === 'ValidationError' ? error.message : 'Error al agregar la novedad'
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
    var uploadedImage;
    var novedad;
    try {
        novedad = await novedadesModel.getNovedadById(req.body.id);
        if (!novedad) {
            res.redirect('/admin/novedades');
            return;
        }

        uploadedImage = await saveNovedadImage(req);
        var obj = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo
        }
        if (uploadedImage) Object.assign(obj, uploadedImage);
        await novedadesModel.updateNovedadById(obj, req.body.id);
        if (uploadedImage && novedad.imagen) {
            try {
                await removeNovedadImage(novedad.imagen);
            } catch (cleanupError) {
                console.error('Error al eliminar la imagen anterior:', cleanupError);
            }
        }
        res.redirect('/admin/novedades');
    } catch (error) {
        await cleanUpUploadedImage(uploadedImage);
        console.error(error);
        res.render('admin/novedadModificar', {
            layout: 'admin/layout',
            novedad,
            error: error.name === 'ValidationError' ? error.message : 'Error al modificar la novedad'
        });
    }
}); 

module.exports = router;
