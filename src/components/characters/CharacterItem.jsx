import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { deleteCharacter } from "../../services/Service";
export const CharacterItem = ({ character }) => {
  return (
    <Container as="main">
      <Row className="dark-container text-center mt-5">
        <Col md={{ span: 6, offset: 3 }}>
          {character.name}
          <Button onClick={() => deleteCharacter(character)}>DELETE</Button>
        </Col>
      </Row>
    </Container>
  );
};
