export default function Personaje({ personaje }) {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={personaje.image}
            className="img-fluid rounded-start"
            alt={personaje.name}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{personaje.name}</h5>
            <p className="card-text">Especie: {personaje.species}</p>
            <p className="card-text">Estado: {personaje.status}</p>
            <p className="card-text">Género: {personaje.gender}</p>
          </div>
        </div>
      </div>
    </div>
  );
}