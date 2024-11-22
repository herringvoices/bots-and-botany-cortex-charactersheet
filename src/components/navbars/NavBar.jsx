import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Offcanvas,
  Container,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./NavBar.scss";

export const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("bnb_user");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar expand="md" variant="dark" className="mb-3">
        <Container fluid>
          {/* Brand Logo */}
          <Navbar.Brand as={Link} to="/">
            <img
              src="/images/logo.png"
              alt="Logo"
              width="40"
              className="d-inline-block align-top logo"
            />
          </Navbar.Brand>

          {/* Toggle button for Offcanvas */}
          <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            show={show}
            onHide={handleClose}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Navigation
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-start flex-grow-1 pe-3">
                {/* Characters Dropdown */}
                <NavDropdown
                  title="Characters"
                  id="characters-dropdown"
                  bg="dark"
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/characters/create"
                    onClick={handleClose}
                  >
                    Create
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/characters/view"
                    onClick={handleClose}
                  >
                    View
                  </NavDropdown.Item>
                </NavDropdown>

                {/* Rules Dropdown */}
                <NavDropdown title="Rules" id="rules-dropdown" bg="dark">
                  <NavDropdown.Item
                    as={Link}
                    to="/rules#gameplay-basics"
                    onClick={handleClose}
                  >
                    Gameplay Basics
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/rules#dice"
                    onClick={handleClose}
                  >
                    Dice
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/rules#traits-die-ratings"
                    onClick={handleClose}
                  >
                    Traits and Die Ratings
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/rules#stepping-up"
                    onClick={handleClose}
                  >
                    Stepping Up and Stepping Down
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/rules#hitches-botches"
                    onClick={handleClose}
                  >
                    Hitches and Botches
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/rules#plot-points"
                    onClick={handleClose}
                  >
                    Plot Points
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/rules#stress"
                    onClick={handleClose}
                  >
                    Stress
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/rules#tests"
                    onClick={handleClose}
                  >
                    Tests
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/rules#contests"
                    onClick={handleClose}
                  >
                    Contests
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/rules#challenges"
                    onClick={handleClose}
                  >
                    Challenges
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/rules#recovering-stress"
                    onClick={handleClose}
                  >
                    Recovering Stress
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/rules#trauma"
                    onClick={handleClose}
                  >
                    Trauma
                  </NavDropdown.Item>
                </NavDropdown>

                {/* Technology Dropdown */}
                <NavDropdown
                  title="Technology"
                  id="technology-dropdown"
                  bg="dark"
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/technology"
                    onClick={handleClose}
                  >
                    Overview
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/technology#hub-system"
                    onClick={handleClose}
                  >
                    Hub System
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/technology#nanites"
                    onClick={handleClose}
                  >
                    Nanites
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/technology#hardware-software"
                    onClick={handleClose}
                  >
                    Hardware and Software
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/technology#translation-software"
                    onClick={handleClose}
                  >
                    Translation Software
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/technology#cloud-computing"
                    onClick={handleClose}
                  >
                    Cloud Computing and Ether
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/technology#skill-pills"
                    onClick={handleClose}
                  >
                    Skill Pills
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/technology#perks"
                    onClick={handleClose}
                  >
                    Perks
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/technology#grav-drive"
                    onClick={handleClose}
                  >
                    Grav-Drive
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/technology#e-gates"
                    onClick={handleClose}
                  >
                    E-Gates
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/technology#limited-intelligences"
                    onClick={handleClose}
                  >
                    Limited Intelligences (LIs)
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/technology#medical-nanites"
                    onClick={handleClose}
                  >
                    Medical and Utility Nanites
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/technology#weaponry-defense"
                    onClick={handleClose}
                  >
                    Weaponry and Defense
                  </NavDropdown.Item>
                </NavDropdown>
                {/* Species Info dropdown */}
                <NavDropdown title="Species" id="species-dropdown" bg="dark">
                  <NavDropdown.Item
                    as={Link}
                    to="/species/amorf"
                    onClick={handleClose}
                  >
                    Amorf
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/species/avia"
                    onClick={handleClose}
                  >
                    Avia
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/species/calxis"
                    onClick={handleClose}
                  >
                    Calxis
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/species/feararc"
                    onClick={handleClose}
                  >
                    Feararc
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/species/flora"
                    onClick={handleClose}
                  >
                    Flora (Stock)
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/species/humans"
                    onClick={handleClose}
                  >
                    Humans
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/species/machina"
                    onClick={handleClose}
                  >
                    Machina
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/species/vearin"
                    onClick={handleClose}
                  >
                    Vearin
                  </NavDropdown.Item>
                </NavDropdown>

                {/* Logout Link - Positioned at the End */}
                {isLoggedIn && (
                  <Nav.Item className="ms-auto">
                    <Nav.Link
                      as={Link}
                      to="/"
                      onClick={() => {
                        localStorage.removeItem("bnb_user");
                        handleClose();
                        navigate("/", { replace: true });
                      }}
                      className="navbar-link"
                    >
                      Logout
                    </Nav.Link>
                  </Nav.Item>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};
