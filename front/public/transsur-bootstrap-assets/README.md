# TransSur — recursos visuales para Bootstrap 5

Paquete de recursos para la página de ejemplo de una empresa ficticia de logística y transporte.

## Contenido
- `img/logo-transsur.svg`: logo vectorial (ideal para navbar).
- `img/transsur-hero.jpg`: imagen principal para el hero.
- `img/flota.jpg`: imagen de flota de camiones.
- `img/centro-distribucion.jpg`: imagen de centro de distribución.
- `img/paqueteria.jpg`: imagen de paquetería.
- `favicon.svg`: favicon del sitio.

## Uso rápido con Bootstrap 5

Copiá la carpeta `img` y `favicon.svg` dentro de `public/` (React/Vite) o dentro de la carpeta pública de tu proyecto.

### Navbar
```html
<a class="navbar-brand" href="/">
  <img src="/img/logo-transsur.svg" alt="TransSur" height="52">
</a>
```

### Hero
```html
<section class="container-fluid p-0">
  <div class="p-5 text-white"
       style="background: linear-gradient(90deg, rgba(9,38,75,.88), rgba(9,38,75,.15)), url('/img/transsur-hero.jpg') center/cover; min-height: 420px;">
    <div class="container py-5">
      <h1 class="display-4 fw-bold">Tu carga, nuestro destino</h1>
      <p class="lead">Soluciones de logística y transporte para todo el país.</p>
      <a class="btn btn-warning btn-lg fw-semibold" href="#contacto">Solicitar presupuesto</a>
    </div>
  </div>
</section>
```

### Tarjetas de servicios
```html
<div class="row g-4">
  <div class="col-md-4">
    <div class="card h-100 border-0 shadow-sm">
      <img src="/img/flota.jpg" class="card-img-top" alt="Flota de camiones">
      <div class="card-body"><h5 class="card-title">Transporte de cargas</h5></div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card h-100 border-0 shadow-sm">
      <img src="/img/centro-distribucion.jpg" class="card-img-top" alt="Centro de distribución">
      <div class="card-body"><h5 class="card-title">Distribución</h5></div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card h-100 border-0 shadow-sm">
      <img src="/img/paqueteria.jpg" class="card-img-top" alt="Paquetes en línea de preparación">
      <div class="card-body"><h5 class="card-title">Paquetería</h5></div>
    </div>
  </div>
</div>
```

### Favicon
En el `<head>`:
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
```

Los ejemplos usan rutas absolutas desde la carpeta pública. Si tu proyecto usa otra estructura, ajustá las rutas.
