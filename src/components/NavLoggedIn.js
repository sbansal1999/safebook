import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavLoggedIn() {
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
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="\">Home</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Button variant="dark" onClick={handleSearch}>
                Search
              </Button>
            </Form>
            <Nav>
              <Nav.Link href="\profile">Profile</Nav.Link>
              <Nav.Link href="\logout">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavLoggedIn;
