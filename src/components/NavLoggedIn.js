import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function NavLoggedIn() {
  const [search, setSearch] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const navigate = useNavigate();

  const handleSearch = () => {
    //handle search here
    navigate(`/search/${search}`);
  };

  const handleLogout = () => {
    removeCookie("userId");
  };

  return (
    <div>
      <Navbar
        fixed="top"
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
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="\feed">Home</Nav.Link>
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
              <Button variant="info" onClick={handleSearch}>
                Search
              </Button>
            </Form>
            <Nav>
              <Nav.Link href="\profile">Profile</Nav.Link>
              <Nav.Link href="\" onClick={handleLogout}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavLoggedIn;
