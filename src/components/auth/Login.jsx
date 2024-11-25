import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../views/UserContext";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase-config";
import { Container, Row, Col, Button } from "react-bootstrap";

export const Login = () => {
  const { user } = useContext(UserContext); // Access user state
  const [error, setError] = useState(null); // Error handling
  const navigate = useNavigate();

  // Redirect if the user is already logged in
  useEffect(() => {
    if (user && user.id) {
      // Ensure `user` exists
      navigate("/"); // Redirect to homepage
    }
  }, [user, navigate]);

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/"); // Redirect to homepage after login
    } catch (error) {
      setError("Failed to log in. Please try again.");
      console.error("Login error:", error.message);
    }
  };

  return (
    <Container as="main">
      <Row className="dark-container text-center mt-5">
        <Col md={{ span: 6, offset: 3 }} className="mt-5">
          <h1>Bots and Botany</h1>
          <h2>Please sign in</h2>

          {error && <p className="text-danger">{error}</p>}

          <Button onClick={handleGoogleSignIn} className="btn-edit mb-5 mt-2">
            Sign in with Google
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
