import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export const Welcome = () => {
  return (
    <Container as="main">
      <Row className="dark-container text-center mt-5">
        <Col md={{ span: 6, offset: 3 }} className="p-4">
          <h1>Welcome to the Bots and Botany Character Sheet</h1>
          <h2>Please use the menu above to get started!</h2>
        </Col>
      </Row>
    </Container>
  );
};
