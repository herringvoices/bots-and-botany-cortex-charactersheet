import React from "react";
import {
  Navbar,
  Nav,
  Offcanvas,
  Container,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("bnb_user");

  return (
    <>
      <Navbar expand="md" variant="dark" className="mb-3">
        <Container fluid>
          {/* Brand Logo */}
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src="/images/logo.png"
                alt="Logo"
                width="40"
                className="d-inline-block align-top logo"
              />
            </Navbar.Brand>
          </LinkContainer>

          {/* Toggle button for Offcanvas */}
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Navigation
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-start flex-grow-1 pe-3">
                {/* Characters Dropdown */}
                <NavDropdown title="Characters" id="characters-dropdown">
                  <LinkContainer to="/characters/create">
                    <NavDropdown.Item>Create</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/characters/view">
                    <NavDropdown.Item>View</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>

                {/* Conditional Login/Logout Link */}
                {isLoggedIn ? (
                  <Nav.Item className="logout-item">
                    <Nav.Link
                      as={Link}
                      to="/"
                      onClick={() => {
                        localStorage.removeItem("bnb_user");
                        navigate("/", { replace: true });
                      }}
                      className="navbar-link"
                    >
                      Logout
                    </Nav.Link>
                  </Nav.Item>
                ) : (
                  ""
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};
