import React from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { deleteCharacter } from "../../services/Service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const CharacterItem = ({ character, getAndSetCharacters }) => {
  return (
    <Row className="mb-3 dark-container text-center mt-3 character-list-item text-center mx-auto">
      <Col md={{ span: 2 }} className="image-column">
        <Link to={`/characters/view/${character.id}`} className="hover-link">
          <Image
            src={character.image}
            alt={`Image of ${character.name}`}
            roundedCircle
          />
        </Link>
      </Col>

      <Col md={{ span: 8 }} className="character-name my-auto text-start">
        <Link to={`/characters/view/${character.id}`} className="hover-link">
          {character.name}
        </Link>
      </Col>

      <Col md={{ span: 2 }} className="character-name my-auto text-start">
        <Button
          className="trash-button"
          onClick={() => deleteCharacter(character).then(getAndSetCharacters)}
        >
          <FontAwesomeIcon icon="fa-solid fa-trash-can" />
        </Button>
      </Col>
    </Row>
  );
};
