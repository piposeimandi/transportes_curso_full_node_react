var pool = require('./db');

async function getNovedades() {
    var query = `SELECT id, titulo, subtitulo, cuerpo, imagen, nombre_imagen,
                    DATE_FORMAT(fecha_insert, '%Y-%m-%d %H:%i') AS fecha_insert,
                    fecha_update, fecha_delete
             FROM novedades
             WHERE fecha_delete IS NULL
             ORDER BY fecha_insert DESC`;
    var rows = await pool.query(query);
    return rows;
}

// usado por el  panel de admin ,  incluye también 
// novedades eliminadas, para que se puedan restaurar o borrar definitivamente
async function getAllNovedades() {
    var query = `SELECT id, titulo, subtitulo, cuerpo, imagen, nombre_imagen,
                    DATE_FORMAT(fecha_insert, '%Y-%m-%d %H:%i') AS fecha_insert,
                    fecha_update, fecha_delete
             FROM novedades
             ORDER BY (fecha_delete IS NULL) DESC, fecha_insert DESC`;
    var rows = await pool.query(query);
    return rows;
}

async function insertNovedad(obj) {
    const query = `
    INSERT INTO novedades (titulo, subtitulo, cuerpo, imagen, nombre_imagen, fecha_insert)
    VALUES (?, ?, ?, ?, ?, NOW())
  `;

    return pool.query(query, [
        obj.titulo,
        obj.subtitulo,
        obj.cuerpo,
        obj.imagen || null,
        obj.nombre_imagen || null
    ]);
}

// soft delete (como uso en laravel normalmente mediante eloquent 
async function deleteNovedadById(id) {
    var query = "UPDATE novedades SET fecha_delete = NOW() WHERE id = ? AND fecha_delete IS NULL";
    var rows = await pool.query(query, [id]);
    return rows;
}

// borrar definitivamente
async function deleteNovedadDefinitivaById(id) {
    var query = "DELETE FROM novedades WHERE id = ?";
    var rows = await pool.query(query, [id]);
    return rows;
}

// restarurar
async function restoreNovedadById(id) {
    var query = "UPDATE novedades SET fecha_delete = NULL WHERE id = ? AND fecha_delete IS NOT NULL";
    var rows = await pool.query(query, [id]);
    return rows;
}

async function getNovedadById(id) {
    var query = "SELECT * FROM novedades WHERE id = ?";
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function updateNovedadById(obj, id) {
    try {
        var query = "UPDATE novedades SET ?, fecha_update = NOW() WHERE id = ?";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { getNovedades, getAllNovedades, insertNovedad, deleteNovedadById, deleteNovedadDefinitivaById, restoreNovedadById, getNovedadById, updateNovedadById };


