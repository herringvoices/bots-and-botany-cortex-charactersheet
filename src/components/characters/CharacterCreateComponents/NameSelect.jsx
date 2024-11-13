import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
export const NameSelect = ({character, setCharacter, setReady}) => {

  useEffect(() => {
    if (character.name && character.pronouns) {
      setReady(1);
    } else {
      setReady(0);
    }
  }, [character]);
  
  return (
    <Col md={{ span: 6, offset: 3 }}>
      <section className="mt-3">
        <Form>
          <h1>Name Selection</h1>
          <h2>Character Name</h2>
          <Form.Group controlId="formCharacterNamee">
            <Form.Control
              className="mb-3"
              type="text"
              value={character.name || ""}
              onChange={(evt) =>
                setCharacter({ ...character, name: evt.target.value })
              }
              placeholder="Enter a name for your character"
              required
              autoFocus
            />
          </Form.Group>
          <h2>Character Pronouns</h2>
          <Form.Group controlId="formCharacterPronouns">
            <Form.Control
            className="mb-3"
              type="text"
              value={character.pronouns || ""}
              onChange={(evt) =>
                setCharacter({ ...character, pronouns: evt.target.value })
              }
              placeholder="Enter pronouns for your character (e.g., they/them)"
              required
            />
          </Form.Group>
        </Form>
      </section>
    </Col>
  );
};