import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserByUsername } from "../../services/userService";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export const Login = () => {
  const [username, set] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    getUserByUsername(username).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];
        localStorage.setItem(
          "bnb_user",
          JSON.stringify({
            id: user.id,
            username: user.username,
          })
        );

        navigate("/");
      } else {
        window.alert("Invalid login");
      }
    });
  };

  return (
    <Container as="main">
      <Row className="dark-container text-center mt-5">
        <Col md={{ span: 6, offset: 3 }}>
          <section className="mt-3">
            <Form onSubmit={handleLogin}>
              <h1>Bots and Botany</h1>
              <h2>Please sign in</h2>
              <Form.Group controlId="formUsername">
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(evt) => set(evt.target.value)}
                  placeholder="Username"
                  required
                  autoFocus
                />
              </Form.Group>
              <Button type="submit" className="custom-button mt-3">
                Sign in
              </Button>
            </Form>
          </section>
          <section className="mt-3 mb-3 text-center">
            <Link className="custom-link-primary" to="/register">
              or click here to register
            </Link>
          </section>
        </Col>
      </Row>
    </Container>

    // <main>
    //   <section>
    //     <form onSubmit={handleLogin}>
    //       <h1>Bots and Botany</h1>
    //       <h2>Please sign in</h2>
    //       <fieldset>
    //         <div>
    //           <input
    //             type="text"
    //             value={username}
    //             onChange={(evt) => set(evt.target.value)}
    //             placeholder="username"
    //             required
    //             autoFocus
    //           />
    //         </div>
    //       </fieldset>
    //       <fieldset>
    //         <div>
    //           <button type="submit">Sign in</button>
    //         </div>
    //       </fieldset>
    //     </form>
    //   </section>
    //   <section>
    //     <Link to="/register">or click here to register</Link>
    //   </section>
    // </main>
  );
};
