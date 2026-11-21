import { Suspense } from "react";
import NovedadItem from "@/components/novedadItem";

async function ListaNovedades() {
  const respuesta = await fetch(`${process.env.API_BASE_URL}/api/novedades`, {
    cache: "no-store",
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo cargar la lista de novedades.");
  }

  const novedades = await respuesta.json();
  const ultimasNovedades = [...novedades]
    .sort((a, b) => (b.fecha_insert ?? "").localeCompare(a.fecha_insert ?? ""))
    .slice(0, 4);
  const columnClass = ultimasNovedades.length === 1 ? "col-12" : "col-md-6";

  return (
    <div className="row g-4">
      {ultimasNovedades.map((novedad) => (
        <div className={columnClass} key={novedad.id}>
          <NovedadItem {...novedad} />
        </div>
      ))}
    </div>
  );
}

export default function Novedades() {
  return (
    <main className="container py-4">
      <h1>Novedades</h1>

      <p className="lead">
        Mantente informado sobre las últimas novedades y promociones.
      </p>

      <Suspense fallback={<p className="text-body-secondary">Cargando novedades...</p>}>
        <ListaNovedades />
      </Suspense>
    </main>
  );
}
