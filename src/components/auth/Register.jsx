import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, getUserByUsername } from "../../services/userService";
import { Form, Button, Container, Overlay, Popover } from "react-bootstrap";

export const Register = (props) => {
  const [user, setUser] = useState({
    username: "",
  });
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
        window.alert("Account with that username address already exists");
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
  };

  return (
    <Container as="main" className="d-flex flex-column align-items-center">
      <Form onSubmit={handleRegister} className="w-50 mt-5">
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

        <Button variant="info" type="submit">
          Register
        </Button>
      </Form>
    </Container>

    // <main style={{ textAlign: "center" }}>
    //   <form className="form-login" onSubmit={handleRegister}>
    //     <h1>Bots and Botany</h1>
    //     <h2>Please Register</h2>
    //     <fieldset>
    //       <div className="form-group">
    //         <input
    //           onChange={updateUser}
    //           type="text"
    //           id="username"
    //           className="form-control"
    //           placeholder="Create a username"
    //           required
    //         />
    //       </div>
    //     </fieldset>

    //     <fieldset>
    //       <div className="form-group">
    //         <button className="login-btn btn-info" type="submit">
    //           Register
    //         </button>
    //       </div>
    //     </fieldset>
    //   </form>
    // </main>
  );
};
