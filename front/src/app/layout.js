import Script from "next/script";
import Nav from "@/components/nav";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/globals.css";


export const metadata = {
  title: "Transportes X",
  description: "Envio de paquetes y encomiendas a nivel nacional e internacional",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" data-bs-theme="dark">
      <head>
        <Script
          src="/js/bootstrap.bundle.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <Nav />

        <main className="container flex-grow-1 py-4">
          {children}
        </main>

        <footer className="bg-dark text-white py-3 text-center mt-auto border-top border-secondary">
          <p className="mb-0">
            &copy; 2024 Transportes X. Todos los derechos reservados.
          </p>
        </footer>
      </body>
    </html>
  );
}
