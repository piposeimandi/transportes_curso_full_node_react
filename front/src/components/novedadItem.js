function formatearFecha(fecha) {
  if (!fecha) return null;

  const [anio, mes, dia] = fecha.slice(0, 10).split("-").map(Number);
  const [hora, minuto] = fecha.slice(11, 16).split(":").map(Number);
  const valor = new Date(Date.UTC(anio, mes - 1, dia, hora || 0, minuto || 0));

  if (Number.isNaN(valor.getTime())) return null;

  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "UTC",
  }).format(valor);
}

export default function NovedadItem({ id, titulo, subtitulo, cuerpo, imagen, fecha_insert }) {
  const baseUrl = process.env.API_BASE_URL?.replace(/\/$/, "") ?? "";
  const imagenUrl = imagen
    ? imagen.startsWith("http")
      ? imagen
      : `${baseUrl}/images/${imagen}`
    : null;
  const fecha = formatearFecha(fecha_insert);
  const modalId = `novedad-${id}`;

  const subtituloAcotado = {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };

  return (
    <>
      <article className="card position-relative h-100">
        <div className="row g-0 h-100">
          {imagenUrl ? (
            <div className="col-md-3 d-flex align-items-center p-2">
              <img
                src={imagenUrl}
                className="w-100 rounded-3 object-fit-cover"
                style={{ height: "8rem" }}
                alt={titulo}
              />
            </div>
          ) : (
            <div className="col-md-3 d-flex align-items-center justify-content-center p-2">
              <div className="w-100 h-100 d-flex align-items-center justify-content-center rounded-3 bg-secondary-subtle text-body-secondary small">
                Sin imagen
              </div>
            </div>
          )}

          <div className={imagenUrl ? "col-md-9" : "col-12"}>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title text-truncate" title={titulo}>{titulo}</h5>
              {subtitulo && (
                <h6
                  className="card-subtitle mb-2 text-body-secondary"
                  style={subtituloAcotado}
                  title={subtitulo}
                >
                  {subtitulo}
                </h6>
              )}
              {fecha && <small className="text-body-secondary">{fecha}</small>}

              <button
                type="button"
                className="stretched-link btn btn-link p-0 mt-auto align-self-start"
                data-bs-toggle="modal"
                data-bs-target={`#${modalId}`}
              >
                Ver novedad completa
              </button>
            </div>
          </div>
        </div>
      </article>

      <div
        className="modal fade"
        id={modalId}
        tabIndex="-1"
        aria-labelledby={`${modalId}-titulo`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title h4" id={`${modalId}-titulo`}>{titulo}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              />
            </div>

            <div className="modal-body">
              {imagenUrl && (
                <img
                  src={imagenUrl}
                  className="img-fluid rounded mb-3 w-100"
                  style={{ maxHeight: "45vh", objectFit: "contain" }}
                  alt={titulo}
                />
              )}
              {subtitulo && <h6 className="text-body-secondary mb-2">{subtitulo}</h6>}
              {fecha && <p className="small text-body-secondary mb-3">{fecha}</p>}
              <p className="mb-0" style={{ whiteSpace: "pre-line" }}>
                {cuerpo}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
