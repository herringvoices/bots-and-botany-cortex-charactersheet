import React, { useEffect, useState } from "react";
import { Container, Row, Navbar, Nav, Button } from "react-bootstrap";
import { NameSelect } from "./CharacterCreateComponents/NameSelect";
import { SpeciesSelect } from "./CharacterCreateComponents/SpeciesSelect";
import { BackgroundSelect } from "./CharacterCreateComponents/BackgroundSelect";
import { VocationSelect } from "./CharacterCreateComponents/VocationSelect";
import { AttributeSelect } from "./CharacterCreateComponents/AttributeSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CharacterCreate.scss";
import "animate.css";
import { postCharacter, postKindredDistinction } from "../../services/Service";

import {
  postVocationDistinction,
  postQuirkDistinction,
} from "../../services/distinctionsService";
import { useNavigate } from "react-router-dom";
import {
  getAttributes,
  postCharacterAttribute,
} from "../../services/attributeService";

export const CharacterCreate = ({ currentUser }) => {
  const [step, setStep] = useState(1);
  const [character, setCharacter] = useState({});
  const [kindredDistinction, setKindredDistinction] = useState({});
  const [vocationDistinction, setVocationDistinction] = useState({});
  const [quirkDistinction, setQuirkDistinction] = useState({});
  const [characterAttributes, setCharacterAttributes] = useState([]);
  const [pointsAvailable, setPointsAvailable] = useState(11); // Initialize points available
  const [ready, setReady] = useState(0);
  const navigate = useNavigate();

  // Initialize state on first render
  useEffect(() => {
    setCharacter({
      userId: currentUser.id,
      name: "",
      pronouns: "",
      plotPoints: 0,
      description: "",
      image: "",
    });

    setKindredDistinction({
      characterId: 0,
      speciesId: 0,
      backgroundId: 0,
      dieSize: 8,
    });

    setVocationDistinction({
      characterId: 0,
      adjectiveId: 0,
      jobId: 0,
      dieSize: 8,
    });

    setQuirkDistinction({
      characterId: 0,
      quirkId: 0,
      dieSize: 8,
    });

    // Fetch attributes and initialize characterAttributes
    getAttributes()
      .then((attributes) => {
        const initializedAttributes = attributes.map((attr) => ({
          ...attr,
          characterId: 0,
          dieSize: 4,
        }));
        setCharacterAttributes(initializedAttributes);
      })
      .catch((error) => console.error("Error fetching attributes:", error));
  }, [currentUser]);

  const handleSubmit = (
    character,
    kindredDistinction,
    vocationDistinction,
    quirkDistinction,
    characterAttributes
  ) => {
    const shallowCharacterCopy = { ...character };

    postCharacter(shallowCharacterCopy)
      .then((characterResponse) => {
        // Update characterId in distinctions and attributes
        const updatedAttributes = characterAttributes.map((attr) => ({
          characterId: characterResponse.id,
          attributeId: attr.id,
          dieSize: attr.dieSize,
        }));
        setCharacterAttributes(updatedAttributes);

        kindredDistinction.characterId = characterResponse.id;
        vocationDistinction.characterId = characterResponse.id;
        quirkDistinction.characterId = characterResponse.id;

        // Post all distinctions and attributes concurrently
        return Promise.all([
          postKindredDistinction(kindredDistinction),
          postVocationDistinction(vocationDistinction),
          postQuirkDistinction(quirkDistinction),
          ...updatedAttributes.map((attr) => postCharacterAttribute(attr)),
        ]);
      })
      .then(() => {
        navigate("/characters/view");
      })
      .catch((error) => {
        console.error("Error during submission:", error);
      });
  };

  return (
    <>
      <Container as="main">
        <Row className="dark-container text-center mt-3 mb-5 p-3">
          {step === 1 ? (
            <NameSelect
              character={character}
              setCharacter={setCharacter}
              setReady={setReady}
            />
          ) : step === 2 ? (
            <>
              <h1>Species Selection</h1>
              <SpeciesSelect
                setCharacter={setCharacter}
                kindredDistinction={kindredDistinction}
                setKindredDistinction={setKindredDistinction}
                setReady={setReady}
                character={character}
              />
            </>
          ) : step === 3 ? (
            <BackgroundSelect
              kindredDistinction={kindredDistinction}
              setKindredDistinction={setKindredDistinction}
              setReady={setReady}
            />
          ) : step === 4 ? (
            <VocationSelect
              vocationDistinction={vocationDistinction}
              setVocationDistinction={setVocationDistinction}
              quirkDistinction={quirkDistinction}
              setQuirkDistinction={setQuirkDistinction}
              setReady={setReady}
            />
          ) : step === 5 ? (
            <AttributeSelect
              characterAttributes={characterAttributes}
              setCharacterAttributes={setCharacterAttributes}
              setReady={setReady}
            />
          ) : null}
        </Row>
      </Container>

      {/* Navigation Bar */}
      <Navbar fixed="bottom" className="justify-content-around bottom-navbar">
        <Nav>
          {step > 1 ? (
            <Button
              className="custom-nav-button"
              onClick={() => setStep((prev) => prev - 1)}
            >
              <FontAwesomeIcon icon="fa-solid fa-circle-arrow-left" />
            </Button>
          ) : null}
        </Nav>
        <Nav>
          {ready === step && step < 5 ? (
            <Button
              className="custom-nav-button"
              onClick={() => setStep((prev) => prev + 1)}
            >
              <FontAwesomeIcon icon="fa-solid fa-circle-arrow-right" />
            </Button>
          ) : ready === step && step === 5 ? (
            <Button
              className="custom-nav-button"
              onClick={() =>
                handleSubmit(
                  character,
                  kindredDistinction,
                  vocationDistinction,
                  quirkDistinction,
                  characterAttributes
                )
              }
            >
              <FontAwesomeIcon icon="fa-solid fa-circle-check" />
            </Button>
          ) : null}
        </Nav>
      </Navbar>
    </>
  );
};
