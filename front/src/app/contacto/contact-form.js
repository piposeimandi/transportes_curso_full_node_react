"use client";

import { useState } from "react";

export default function ContactForm() {
  const [validated, setValidated] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    setValidated(true);

    if (!form.checkValidity()) {
      event.stopPropagation();
      return;
    }

    setSent(true);
    form.reset();
    setValidated(false);
  }

  return (
    <div className="card h-100 border-0 shadow-sm">
      <div className="card-body p-4 p-lg-5">
        <span className="section-eyebrow text-primary-emphasis">Formulario</span>
        <h2 className="h4 mt-2 mb-1">Envianos tu consulta</h2>
        <p className="small text-secondary mb-4">
          Completá los datos y te respondemos por email.
        </p>

        {sent && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="status"
          >
            Gracias por tu consulta. Te responderemos a la brevedad.
            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar"
              onClick={() => setSent(false)}
            />
          </div>
        )}

        <form
          className={validated ? "needs-validation was-validated" : "needs-validation"}
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label" htmlFor="contactName">
                Nombre y apellido
              </label>
              <input
                className="form-control form-control-lg"
                type="text"
                name="name"
                id="contactName"
                autoComplete="name"
                placeholder="Ej.: María Gómez"
                required
              />
              <div className="invalid-feedback">Ingresá tu nombre.</div>
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="contactEmail">
                Email
              </label>
              <input
                className="form-control form-control-lg"
                type="email"
                name="email"
                id="contactEmail"
                autoComplete="email"
                placeholder="nombre@email.com"
                required
              />
              <div className="invalid-feedback">Ingresá un email válido.</div>
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="contactPhone">
                Teléfono <span className="text-secondary">(opcional)</span>
              </label>
              <input
                className="form-control form-control-lg"
                type="tel"
                name="phone"
                id="contactPhone"
                autoComplete="tel"
                placeholder="+54 11..."
              />
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="contactSubject">
                Motivo
              </label>
              <select
                className="form-select form-select-lg"
                name="subject"
                id="contactSubject"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Seleccioná una opción
                </option>
                <option value="envio">Consultar un envío</option>
                <option value="tarifa">Solicitar una tarifa</option>
                <option value="seguimiento">Seguimiento de encomienda</option>
                <option value="otro">Otro motivo</option>
              </select>
              <div className="invalid-feedback">
                Seleccioná el motivo de contacto.
              </div>
            </div>

            <div className="col-12">
              <label className="form-label" htmlFor="contactMessage">
                Mensaje
              </label>
              <textarea
                className="form-control"
                name="message"
                id="contactMessage"
                rows={5}
                placeholder="Contanos origen, destino y detalles del envío..."
                required
                minLength={10}
              />
              <div className="invalid-feedback">
                Escribí al menos 10 caracteres.
              </div>
            </div>

            <div className="col-12">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="contactConsent"
                  name="consent"
                  required
                />
                <label className="form-check-label" htmlFor="contactConsent">
                  Acepto ser contactado por Transportes X.
                </label>
                <div className="invalid-feedback">
                  Debés aceptar el contacto.
                </div>
              </div>
            </div>

            <div className="col-12 d-grid gap-2 d-md-flex justify-content-md-end">
              <button type="submit" className="btn btn-primary btn-lg px-4">
                Enviar consulta
              </button>
            </div>
          </div>

          <p className="small text-secondary mt-3 mb-0">
            Tus datos se usan únicamente para responder tu consulta.
          </p>
        </form>
      </div>
    </div>
  );
}
