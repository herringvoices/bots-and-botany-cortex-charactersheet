import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser, getUserByUsername } from "../../services/userService";
import {
  Form,
  Button,
  Container,
  Overlay,
  Popover,
  Row,
  Col,
} from "react-bootstrap";
import React from "react";

export const Register = (props) => {
  const [user, setUser] = useState({
    username: "",
  });
  const [showPopover, setShowPopover] = useState(false);
  const target = useRef(null);
  let navigate = useNavigate();

  const registerNewUser = () => {
    createUser(user).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "bnb_user",
          JSON.stringify({
            id: createdUser.id,
            username: createdUser.username,
          })
        );

        navigate("/");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByUsername(user.username).then((response) => {
      if (response.length > 0) {
        // Duplicate username. No good.
        setShowPopover(true);
      } else {
        // Good username, create user.
        registerNewUser();
      }
    });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
    setShowPopover(false);
  };

  return (
    <Container as="main">
      <Row className="dark-container text-center mt-5">
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleRegister} className="mt-3">
            <h1>Bots and Botany</h1>
            <h2>Please Register</h2>
            <Form.Group controlId="username" className="mb-3">
              <Form.Control
                ref={target}
                type="text"
                value={user.username}
                onChange={updateUser}
                placeholder="Create a username"
                required
                autoFocus
              />
              <Overlay
                target={target.current}
                show={showPopover}
                placement="bottom"
              >
                <Popover>
                  <Popover.Body>
                    Account with that username already exists.
                  </Popover.Body>
                </Popover>
              </Overlay>
            </Form.Group>
            <Button type="submit" className="custom-button">
              Register
            </Button>
          </Form>
          <section className="mt-3 mb-3 text-center">
            <Link className="custom-link-primary" to="/login">
              back to sign-in
            </Link>
          </section>
        </Col>
      </Row>
    </Container>
  );
};
