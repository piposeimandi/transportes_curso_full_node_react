import ContactForm from "./contact-form";

export const metadata = {
  title: "Contacto | TransSur",
  description: "Comunicate con TransSur.",
};

const channels = [
  {
    label: "Dirección",
    value: "Calle Principal 123",
    icon: "M8 1.5a4.5 4.5 0 0 0-4.5 4.5c0 3.2 4.5 8 4.5 8s4.5-4.8 4.5-8A4.5 4.5 0 0 0 8 1.5Zm0 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z",
  },
  {
    label: "Teléfono",
    value: "+54 9 11 1234-5678",
    href: "tel:+5491112345678",
    icon: "M4.2 1.8a.8.8 0 0 1 .8.1l1.4 1a.8.8 0 0 1 .3.85L6.3 5.3a10.8 10.8 0 0 0 4.4 4.4l1.55-.4a.8.8 0 0 1 .85.3l1 1.4a.8.8 0 0 1 .1.8l-.6 1.1a1.2 1.2 0 0 1-1.25.6A13.4 13.4 0 0 1 2.5 3.65a1.2 1.2 0 0 1 .6-1.25l1.1-.6Z",
  },
  {
    label: "Email",
    value: "contacto@transsur.com",
    href: "mailto:contacto@transsur.com",
    icon: "M1.8 3.5h12.4a.8.8 0 0 1 .8.8v7.4a.8.8 0 0 1-.8.8H1.8a.8.8 0 0 1-.8-.8V4.3a.8.8 0 0 1 .8-.8Zm.95 1.5L8 8.6l5.25-3.6H2.75Z",
  },
  {
    label: "Horario",
    value: "Lunes a viernes, 9:00 a 18:00",
    icon: "M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM8 4.2a.8.8 0 0 1 .8.8v3.1l2.3 1.4a.8.8 0 1 1-.8 1.37L7.6 9.5a.8.8 0 0 1-.4-.7V5a.8.8 0 0 1 .8-.8Z",
  },
];

export default function ContactoPage() {
  return (
    <div className="row g-4 align-items-stretch">
      <div className="col-lg-5">
        <div className="card h-100 border-0 shadow-sm">
          <div className="card-body p-4 p-lg-5">
            <span className="section-eyebrow text-primary-emphasis">
              Atención al cliente
            </span>
            <h1 className="display-6 fw-bold mt-2 mb-3">Hablemos de tu envío</h1>
            <p className="lead mb-4">
              Consultanos por envíos nacionales e internacionales. Te
              acompañamos con tarifas, retiros y seguimiento de encomiendas.
            </p>

            <div className="d-flex align-items-center gap-2 mb-4">
              <span className="status-dot" aria-hidden="true" />
              <span className="small text-secondary">
                Respondemos en menos de 24 h hábiles
              </span>
            </div>

            <ul className="list-unstyled d-grid gap-3 mb-0">
              {channels.map((channel) => (
                <li key={channel.label} className="d-flex gap-3 align-items-start">
                  <span
                    className="channel-icon bg-primary-subtle text-primary-emphasis"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 16 16" fill="currentColor">
                      <path d={channel.icon} />
                    </svg>
                  </span>
                  <div className="pt-1">
                    <div className="small text-secondary">{channel.label}</div>
                    {channel.href ? (
                      <a
                        className="link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                        href={channel.href}
                      >
                        {channel.value}
                      </a>
                    ) : (
                      <div className="fw-semibold">{channel.value}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="col-lg-7">
        <ContactForm postUrl={`${process.env.API_BASE_URL}/api/contacto`} />
      </div>
    </div>
  );
}
