import Link from "next/link";

const servicios = [
  {
    titulo: "Transporte de cargas",
    texto: "Envíos de carga por carretera en todo el país, con seguimiento en cada etapa del viaje.",
    imagen: "/transsur-bootstrap-assets/img/flota.jpg",
    alt: "Flota de camiones",
  },
  {
    titulo: "Distribución",
    texto: "Centros de distribución que conectan productos con destinos nacionales e internacionales.",
    imagen: "/transsur-bootstrap-assets/img/centro-distribucion.jpg",
    alt: "Centro de distribución",
  },
  {
    titulo: "Paquetería",
    texto: "Preparación y entrega de paquetes y encomiendas con tarifas accesibles.",
    imagen: "/transsur-bootstrap-assets/img/paqueteria.jpg",
    alt: "Paquetes en línea de preparación",
  },
];

export default function Home() {
  return (
    <div>
      <section
        className="p-5 text-white rounded-3 mb-5"
        style={{
          background:
            "linear-gradient(90deg, rgba(9,38,75,.88), rgba(9,38,75,.15)), url('/transsur-bootstrap-assets/img/transsur-hero.jpg') center/cover",
          minHeight: "420px",
        }}
      >
        <div className="py-5">
          <h1 className="display-4 fw-bold">Tu carga, nuestro destino</h1>
          <p className="lead">
            Soluciones de logística y transporte para todo el país.
          </p>
          <Link className="btn btn-warning btn-lg fw-semibold" href="/contacto">
            Solicitar presupuesto
          </Link>
        </div>
      </section>

      <section>
        <span className="section-eyebrow text-primary-emphasis">
          Nuestros servicios
        </span>
        <h2 className="display-6 fw-bold mt-2 mb-4">¿Qué hacemos?</h2>

        <div className="row g-4">
          {servicios.map((servicio) => (
            <div className="col-md-4" key={servicio.titulo}>
              <div className="card h-100 border-0 shadow-sm">
                <img
                  src={servicio.imagen}
                  className="card-img-top"
                  alt={servicio.alt}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{servicio.titulo}</h5>
                  <p className="card-text text-secondary">
                    {servicio.texto}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
