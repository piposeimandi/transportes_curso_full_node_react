"use client";

import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Navigation() {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} href="/">
          Transportes X
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navigation" />

        <Navbar.Collapse id="main-navigation">
          <Nav className="ms-auto">
            <Nav.Link as={Link} href="/">
              Inicio
            </Nav.Link>

            <Nav.Link as={Link} href="/nosotros">
              Nosotros
            </Nav.Link>

            <Nav.Link as={Link} href="/novedades">
              Novedades
            </Nav.Link>

            <Nav.Link as={Link} href="/contact">
              Contacto
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
