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

async function deleteNovedadById(id) {
    // En lugar de eliminar el registro, actualizamos la fecha de eliminación
    var query = "UPDATE novedades SET fecha_delete = NOW() WHERE id = ?";
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

module.exports = { getNovedades, insertNovedad, deleteNovedadById, getNovedadById, updateNovedadById };


