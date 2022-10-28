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
      <Navbar collapseOnSelect bg="success">
        <Container>
          <Navbar.Brand href="\">Safe Book</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse className="justify-content-end">
            <Nav.Link className="me-3" href="\Register">
              Sign Up
            </Nav.Link>

            <Nav.Link href="\login">Log In</Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
