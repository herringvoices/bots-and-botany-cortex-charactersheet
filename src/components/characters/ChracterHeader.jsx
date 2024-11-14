// CharacterHeader.js
import React, { useState } from "react";
import { Button, Col, Row, Image, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateCharacter } from "../../services/Service";

export const CharacterHeader = ({ character, setCharacter }) => {
  const [edit, setEdit] = useState(false);

  // Handle changes to form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      [name]: value,
    }));
  };

  const handleSave = () => {
    updateCharacter(character)
      .then((updatedCharacter) => {
        setCharacter(updatedCharacter); // Update state with the new character data
        setEdit(false); // Toggle edit mode off
      })
      .catch((error) => {
        console.error("Error saving character:", error);
      });
  };

  return (
    <Row className="dark-container text-center mt-5 align-items-start">
      <Col md={{ span: 2 }} className="image-column">
        <Image
          roundedCircle
          className="character-image"
          src={character?.image}
        />
      </Col>
      <Col md={{ span: 2 }} className="my-auto text-start">
        {edit ? (
          <Form>
            <Form.Group controlId="characterName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={character?.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="characterPronouns" className="mt-2">
              <Form.Label>Pronouns</Form.Label>
              <Form.Control
                type="text"
                name="pronouns"
                value={character?.pronouns}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        ) : (
          <div>
            <h1>{character?.name}</h1>
            {character?.pronouns}
          </div>
        )}
      </Col>
      <Col xs={{ offset: 6, span: 2 }} className="p-2 text-end">
        {edit ? (
          <Button className="btn-edit" onClick={handleSave}>
            <FontAwesomeIcon icon="fa-solid fa-floppy-disk" />
          </Button>
        ) : (
          <Button className="btn-edit" onClick={() => setEdit(true)}>
            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
          </Button>
        )}
      </Col>
    </Row>
  );
};
