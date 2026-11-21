import "./styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/nav";


export const metadata = {
  title: "Transportes X",
  description: "Envio de paquetes y encomiendas a nivel nacional e internacional",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Nav />

        <main className="container py-4">
          {children}
        </main>

        <footer className="bg-light border-top py-3 text-center">
          <p className="mb-0">
            &copy; 2024 Transportes X. Todos los derechos reservados.
          </p>
        </footer>
      </body>
    </html>
  );
}
