import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./style.css";

function Header() {
  return (
    <Navbar className="navbar-dark bg-dark">
      <Navbar.Brand href="/">
        React Books
      </Navbar.Brand>
      <Nav className="mr-auto">
      <Nav.Link href="/saved">Saved Books</Nav.Link>
      <Nav.Link href="/search">Search</Nav.Link>
    </Nav>
    </Navbar>
  );
}

export default Header;