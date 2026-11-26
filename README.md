# TransSur - Logistica y Transporte

Trabajo practico de la diplomatura UTNBA Web Full Stack. Es un sitio institucional de una empresa de logistica y transporte (TransSur), con un front publico y un panel de admin para manejar las novedades.

## Video explicativo

Antes de leer el resto, te dejo el video donde explico todo el trabajo (arquitectura, back, front, soft delete y como lo corri en local):

[![Ver video explicativo en YouTube](https://img.youtube.com/vi/j6WckOUrmxo/0.jpg)](https://youtu.be/j6WckOUrmxo)

Link directo: https://youtu.be/j6WckOUrmxo

El repo tiene dos partes que conviven juntas:

- `back/` - api y panel de administracion (Node + Express + Handlebars).
- `front/` - sitio publico (Next.js + React + Bootstrap).
- `docs/` - los pasos que fui anotando y el sql de la base.

---

## Que se hizo

### Front (`front/`)

Sitio publico con Next.js (app router) y Bootstrap 5 en tema oscuro. Paginas:

- Inicio: hero con llamado a la accion y tarjetas de servicios (transporte de cargas, distribucion, paqueteria).
- Nosotros: consumo de una api externa (Rick and Morty) a modo de ejemplo de integracion.
- Novedades: lista las ultimas novedades publicadas, consumiendo la api del back (`/api/novedades`). Cada una se muestra en una tarjeta con imagen, titulo, subtitulo, fecha y un modal con el contenido completo.
- Contacto: formulario validado que envia la consulta por mail a traves del back (`/api/contacto`).
- Nav comun con link al panel de admin (`/admin/login`).

### Back (`back/`)

App Express con vistas en Handlebars que hace dos cosas:

1. Panel de admin (rutas protegidas por sesion):
   - Login / logout del admin (sesion con express-session, password hasheada con md5).
   - CRUD de novedades: crear, listar, modificar y eliminar, con subida de imagen (express-fileupload), validacion de tipo y tamaño (JPG/PNG/GIF/WEBP, hasta 5 MB) y limpieza del archivo anterior al reemplazar o borrar.
   - Las imagenes se guardan local en `back/storage/images` y se sirven en `/images`.
2. Api REST (con cors habilitado en `/api`):
   - `GET /api/novedades` - novedades activas (sin baja logica).
   - `POST /api/contacto` - envio del formulario de contacto por correo (nodemailer, configurado para mailtrap en desarrollo).

### Base de datos (MySQL)

Tres tablas principales (ver `docs/transportes.sql`):

- `usuarios` - credenciales del admin.
- `novedades` - publicaciones con imagen y fechas de insercion/actualizacion/baja.
- `empleados` - datos de ejemplo.

---

## Stack

Back: Node.js, Express, Handlebars, mysql2, express-session, md5, express-fileupload, cors, dotenv, nodemailer, nodemon.

Front: Next.js 16, React 19, Bootstrap 5.

---

## Estructura

```
transportes/
├── back/
├── front/
├── docs/
│   ├── pasos.txt
│   └── transportes.sql
└── README.md
```

---

## Como correrlo en local

Los requisitos minimos son Node.js 22 o superior, npm y MySQL 8 (o compatible) corriendo. No hace falta lerd para correrlo, es solo como lo fui levantando yo durante el desarrollo.

### 1. Instalar dependencias

```
cd back && npm install
cd ../front && npm install
```

### 2. Base de datos

El dump esta en `docs/transportes.sql`. Hay que importarlo en MySQL creando la base `transportes`.

Usuario: root
Contraseña: lerd (o la que uses)
Puerto: 3306 o 3307 segun la pc

Se puede usar phpmyadmin o la linea de comandos.

### 3. Variables de entorno

`back/.env`:

```
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3307
MYSQL_USER=root
MYSQL_PASSWORD=lerd
MYSQL_DATABASE=transportes

SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=...
SMTP_PASS=...
MAIL_TO=flavia.ursino@gmail.com
```

`front/.env`:

```
API_BASE_URL=https://back.test
```

(Si lo corres sin lerd, cambiar a http://localhost:3000)

### 4. Con lerd (como lo corri yo)

Cada app tiene su `.lerd.yaml` que la registra como sitio con dominio `.test` y https.

- `back/` -> https://back.test (proxy al puerto 3000, `npm run start`)
- `front/` -> https://front.test (proxy al puerto 3002, `npm run dev`)

Al hacer `lerd link` en cada carpeta se registra el sitio y lerd se encarga de levantar el proceso, el proxy nginx y el certificado.

### 5. Sin lerd (manual)

```
# backend (puerto 3000)
cd back && npm run start

# frontend (puerto 3002)
cd front && npm run dev
```

Y ajustar `API_BASE_URL` en `front/.env` a `http://localhost:3000`.

### Credenciales del panel

Usuario: flavia
Contraseña: 1234

---

## Soft delete (propuesta alternativa a borrar una novedad)

En lugar de borrar fisicamente una novedad al "eliminarla", implemente soft delete (baja logica). La tabla `novedades` tiene la columna `fecha_delete` (datetime, nullable). Al dar de baja una novedad se hace:

```
UPDATE novedades SET fecha_delete = NOW()
WHERE id = ? AND fecha_delete IS NULL;
```

Esto permite:

- ocultarla del sitio publico: la api `/api/novedades` (y `getNovedades`) filtra `WHERE fecha_delete IS NULL`, asi las novedades dadas de baja no aparecen en el front.
- mantener el registro en la base para auditoria y recuperacion.
- restaurar una novedad dada de baja (fecha_delete = NULL), volviendo a publicarla.
- borrar definitivamente solo cuando se confirma: `DELETE FROM novedades WHERE id = ?`, que ademas elimina el archivo de imagen del disco.

En el panel (`/admin/novedades`) se listan todas las novedades (incluidas las dadas de baja) con `getAllNovedades`, ordenando las activas primero. Las dadas de baja se muestran con estilo secundario y badge "Dada de baja", con botones de restaurar o eliminar definitivamente. Las activas tienen modificar y dar de baja.

Ademas, al modificar una novedad dada de baja se bloquea la edicion (redireccion al listado), y al reemplazar o quitar la imagen se borra el archivo anterior del disco para no dejar archivos huerfanos.

Esta propuesta (soft delete + borrado definitivo opcional) me parece mejor que un borrado fisico inmediato, que es irreversible.

---

## Endpoints de la api

- `GET /api/novedades` - lista las novedades activas.
- `POST /api/contacto` - envia el formulario de contacto por mail.

## Rutas del panel

- `/admin/login` - login del admin.
- `/admin/login/logout` - cierre de sesion.
- `/admin/novedades` - listado (activas y dadas de baja).
- `/admin/novedades/agregar` - alta.
- `/admin/novedades/modificar/:id` - edicion.
- `POST /admin/novedades/eliminar/:id` - soft delete (dar de baja).
- `POST /admin/novedades/restaurar/:id` - restaurar.
- `POST /admin/novedades/eliminar-definitivo/:id` - borrado fisico + imagen.

---

## Notas

- Las imagenes subidas se sirven en `/images` desde `back/storage/images`.
- El correo de contacto usa mailtrap en desarrollo (configurable por variables de entorno).
- El dump completo de la base esta en `docs/transportes.sql`.