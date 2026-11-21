"use client";

import { useState } from "react";

const initialForm = {
  nombre: "",
  email: "",
  telefono: "",
  motivo: "",
  mensaje: "",
};

export default function ContactForm({ postUrl }) {
  const [validated, setValidated] = useState(false);
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMsg("");
    setError(false);

    const form = event.currentTarget;
    setValidated(true);

    if (!form.checkValidity()) {
      event.stopPropagation();
      return;
    }

    setSending(true);

    try {
      const rawResponse = await fetch(postUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const response = await rawResponse.json();

      setError(response.error === true);
      setMsg(response.message);

      if (response.error === false) {
        setFormData(initialForm);
        form.reset();
        setValidated(false);
      }
    } catch {
      setError(true);
      setMsg("No se pudo enviar el mensaje. Intentá de nuevo.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="card h-100 border-0 shadow-sm">
      <div className="card-body p-4 p-lg-5">
        <span className="section-eyebrow text-primary-emphasis">Formulario</span>
        <h2 className="h4 mt-2 mb-1">Envianos tu consulta</h2>
        <p className="small text-secondary mb-4">
          Completá los datos y te respondemos por email.
        </p>

        {msg && (
          <div
            className={`alert ${
              error ? "alert-danger" : "alert-success"
            } alert-dismissible fade show`}
            role="alert"
          >
            {msg}
            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar"
              onClick={() => setMsg("")}
            />
          </div>
        )}

        <form
          className={
            validated ? "needs-validation was-validated" : "needs-validation"
          }
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
                name="nombre"
                id="contactName"
                autoComplete="name"
                placeholder="Ej.: María Gómez"
                value={formData.nombre}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
                name="telefono"
                id="contactPhone"
                autoComplete="tel"
                placeholder="+54 11..."
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="contactSubject">
                Motivo
              </label>
              <select
                className="form-select form-select-lg"
                name="motivo"
                id="contactSubject"
                value={formData.motivo}
                onChange={handleChange}
                required
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
                name="mensaje"
                id="contactMessage"
                rows={5}
                placeholder="Contanos origen, destino y detalles del envío..."
                value={formData.mensaje}
                onChange={handleChange}
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
              <button
                type="submit"
                className="btn btn-primary btn-lg px-4"
                disabled={sending}
              >
                {sending ? "Enviando..." : "Enviar consulta"}
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
