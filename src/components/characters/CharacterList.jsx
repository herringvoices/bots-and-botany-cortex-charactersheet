import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getCharactersByUserId } from "../../services/Service";
import { CharacterItem } from "./CharacterItem";
import "./CharacterList.scss";
export const CharacterList = ({ currentUser }) => {
  const [characters, setCharacters] = useState([]);

  const getAndSetCharacters = () => {
    getCharactersByUserId(currentUser.id).then(setCharacters);
  };
  useEffect(() => {
    getAndSetCharacters();
  }, [currentUser]);

  return (
    <Container as="main">
      <Row className="dark-container text-center mt-5">
        <Col md={{ span: 6, offset: 3 }} className="text-center">
          {characters.map((item) => (
            <CharacterItem
              key={item.id}
              getAndSetCharacters={getAndSetCharacters}
              character={item}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
};
