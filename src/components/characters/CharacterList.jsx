import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getCharactersByUserId } from "../../services/Service";
import { CharacterItem } from "./CharacterItem";
export const CharacterList = ({ currentUser }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getCharactersByUserId(currentUser.id).then(setCharacters);
  }, [currentUser]);

  return (
    <Container as="main">
      <Row className="dark-container text-center mt-5">
        <Col md={{ span: 6, offset: 3 }}>
          {characters.map((item) => (
            <CharacterItem character={item} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};
