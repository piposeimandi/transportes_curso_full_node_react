
var pool = require('./db');
var md5 = require('md5');

async function getuserbypasswordandusername(username, password) {
    try {
      
        var query = 'SELECT * FROM usuarios WHERE usuario = ? AND password = ?';
        var rows = await pool.query(query, [username, md5(password)]);
        console.log('usuario conectado', username);    
        return rows[0];

    } catch (error) {
      console.log('Error al obtener el usuario por nombre de usuario y contraseña:', error);    
    }
}

module.exports = { getuserbypasswordandusername };
