
import  Personaje from "@/components/personaje";

export default async function Nosotros() {
  const respuesta = await fetch("https://rickandmortyapi.com/api/character/");

  if (!respuesta.ok) {
    throw new Error("No se pudo cargar la lista de personajes.");
  }

  const datos = (await respuesta.json()).results;

  return (
    <section>
      <h1>Nosotros</h1>

      <p className="lead">
        Somos una empresa especializada en el envío de paquetes y encomiendas
        a nivel nacional e internacional.
      </p>

      <div className="row g-4">
        {datos.map((personaje) => (
          <div className="col-md-6" key={personaje.id}>
            <Personaje personaje={personaje} />
          </div>
        ))}
      </div>

      <button className="btn btn-primary mt-3">Solicitar información</button>
    </section>
  );
}
