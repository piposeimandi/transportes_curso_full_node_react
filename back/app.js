var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config(); 
var session = require('express-session');
var fileUpload = require('express-fileupload');

var pool = require('./models/db'); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/admin/login');
var novedadesRouter = require('./routes/admin/novedades');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/images', express.static(path.join(__dirname, 'storage/images')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'Curso2026_pepe',
  resave: false,
  saveUninitialized: true
}));

// guardo en locals si la sesión está iniciada o no, para poder usarlo en las vistas
app.use(function(req, res, next) {
  res.locals.sesionIniciada = Boolean(req.session.id_usuario);
  res.locals.nombre = req.session.nombre || null;
  next();
});

secure = async function(req, res, next){
  try {
    //console.log(req.session.id_usuario);
    if (req.session.id_usuario) {
      next();
    } else {
      res.render('admin/login', {
                layout: 'admin/layout',
                error: 'No tiene permisos para ingresar a esta sección'
            }); // le mando asi para poder mandarle un mensaje al login
    }
  } catch (error) {
    console.log(error);
  }
}

app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 }
}));

app.use('/', indexRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/novedades', secure, novedadesRouter);

/*Select*/
pool.query('SELECT * FROM usuarios').then(function(resultados) {
  console.log(resultados);
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
