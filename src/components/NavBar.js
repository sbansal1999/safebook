import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar() {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    //handle search here
  };

  return (
    <div>
      <Navbar
        collapseOnSelect
        variant="dark"
        bg="dark"
        style={{ height: "10vh" }}
      >
        <Container>
          <Navbar.Brand href="\">
            <h1>Safe Book</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link className="me-3" href="\register">
                Sign Up
              </Nav.Link>

              <Nav.Link href="\login">Log In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
