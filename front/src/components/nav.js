import Link from "next/link";

export default function Navigation() {
  const backUrl = (process.env.API_BASE_URL ?? "https://back.test").replace(/\/$/, "");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary">
      <div className="container">
        <Link className="navbar-brand" href="/">
          <img
            src="/transsur-bootstrap-assets/img/logo-transsur.svg"
            alt="TransSur"
            height="52"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main-navigation"
          aria-controls="main-navigation"
          aria-expanded="false"
          aria-label="Abrir navegación"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="main-navigation">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" href="/">
              Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/nosotros">
                Nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/novedades">
                Novedades
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/contacto">
                Contacto
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={`${backUrl}/admin/login`}>
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
