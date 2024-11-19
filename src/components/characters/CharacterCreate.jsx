import React, { useEffect, useState } from "react";
import { Container, Row, Navbar, Nav, Button } from "react-bootstrap";
import { NameSelect } from "./CharacterCreateComponents/NameSelect";
import { SpeciesSelect } from "./CharacterCreateComponents/SpeciesSelect";
import { BackgroundSelect } from "./CharacterCreateComponents/BackgroundSelect";
import { VocationSelect } from "./CharacterCreateComponents/VocationSelect";
import { AttributeSelect } from "./CharacterCreateComponents/AttributeSelect";
import { ValueSelect } from "./CharacterCreateComponents/ValueSelect";
import { SFXSelect } from "./CharacterCreateComponents/SFXSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CharacterCreate.scss";
import "animate.css";
import {
  getValues,
  postCharacter,
  postKindredDistinction,
} from "../../services/Service";

import {
  postVocationDistinction,
  postQuirkDistinction,
} from "../../services/distinctionsService";
import { useNavigate } from "react-router-dom";
import {
  getAttributes,
  postCharacterAttribute,
} from "../../services/attributeService";
import { postCharacterValue } from "../../services/valueService";
import { getExpandedSFX, postCharacterSFX } from "../../services/sfxService";

export const CharacterCreate = ({ currentUser }) => {
  const [step, setStep] = useState(1);
  const [character, setCharacter] = useState({});
  const [kindredDistinction, setKindredDistinction] = useState({});
  const [vocationDistinction, setVocationDistinction] = useState({});
  const [quirkDistinction, setQuirkDistinction] = useState({});
  const [characterAttributes, setCharacterAttributes] = useState([]);
  const [characterValues, setCharacterValues] = useState([]); // State for values
  const [characterSFX, setCharacterSFX] = useState([]);
  const [expandedSFX, setExpandedSFX] = useState([]); // New state for expanded SFX
  const [ready, setReady] = useState(0);
  const navigate = useNavigate();
  const [values, setValues] = useState([]);
  const [modifiedValues, setModifiedValues] = useState([]);
  const [attributePoints, setAttributePoints] = useState(11);
  const [valuePointsAvailable, setValuePointsAvailable] = useState(4);
  const [valuePointsSpent, setValuePointsSpent] = useState([]);

  // Initialize state on first render
  useEffect(() => {
    if (Object.keys(character).length === 0) {
      setCharacter({
        userId: currentUser.id,
        name: "",
        pronouns: "",
        plotPoints: 0,
        description: "",
        image: "",
      });
    }

    if (Object.keys(kindredDistinction).length === 0) {
      setKindredDistinction({
        characterId: 0,
        speciesId: 0,
        backgroundId: 0,
        dieSize: 8,
      });
    }

    if (Object.keys(vocationDistinction).length === 0) {
      setVocationDistinction({
        characterId: 0,
        adjectiveId: 0,
        jobId: 0,
        dieSize: 8,
      });
    }

    if (Object.keys(quirkDistinction).length === 0) {
      setQuirkDistinction({
        characterId: 0,
        quirkId: 0,
        dieSize: 8,
      });
    }

    getValues().then((values) => {
      setValues(values);

      const initialPointsSpent = values.map((value) => ({
        valueId: value.id,
        pointsSpent: 0,
      }));
      setValuePointsSpent(initialPointsSpent);

      // Initialize characterValues with valueId, characterId, and dieSize
      const initializedValues = values.map((value) => ({
        valueId: value.id, // Set valueId equal to value.id
        characterId: currentUser.id, // Set characterId equal to currentUser.id
        dieSize: 4, // Initialize dieSize at 4
      }));
      setCharacterValues(initializedValues);
    });

    const newValues = [];
    for (let i = 1; i < 6; i++) {
      newValues.push({ id: i, characterId: currentUser.id, valueId: 0 });
    }
    setModifiedValues(newValues);

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

    // Fetch expanded SFX and set state
    getExpandedSFX()
      .then((sfxData) => {
        setExpandedSFX(sfxData);
      })
      .catch((error) => console.error("Error fetching expanded SFX:", error));
  }, [currentUser]);

  const populateCharacterSFX = (kindred, vocation, quirk) => {
    let updatedCharacterSFX = [];

    expandedSFX.forEach((sfx) => {
      // Use .some() to check for a matching speciesId
      if (
        sfx.speciesSfx?.some(
          (speciesSfx) => speciesSfx.speciesId === kindred?.speciesId
        )
      ) {
        updatedCharacterSFX.push({
          characterId: 0, // Update accordingly if needed
          sfxId: sfx.id,
          name: sfx.name,
          description: sfx.description,
          locked: true,
        });
      }

      // Use .some() to check for a matching backgroundId
      if (
        sfx.backgroundSfx?.some(
          (backgroundSfx) =>
            backgroundSfx.backgroundId === kindred?.backgroundId
        )
      ) {
        updatedCharacterSFX.push({
          characterId: 0,
          sfxId: sfx.id,
          name: sfx.name,
          description: sfx.description,
          locked: true,
        });
      }

      // Use .some() to check for a matching jobId
      if (sfx.jobSfx?.some((jobSfx) => jobSfx.jobId === vocation?.jobId)) {
        updatedCharacterSFX.push({
          characterId: 0,
          sfxId: sfx.id,
          name: sfx.name,
          description: sfx.description,
          locked: true,
        });
      }

      // Use .some() to check for a matching adjectiveId
      if (
        sfx.adjectiveSfx?.some(
          (adjectiveSfx) => adjectiveSfx.adjectiveId === vocation?.adjectiveId
        )
      ) {
        updatedCharacterSFX.push({
          characterId: 0,
          sfxId: sfx.id,
          name: sfx.name,
          description: sfx.description,
          locked: true,
        });
      }

      // Use .some() to check for a matching quirkId
      if (
        sfx.quirkSfx?.some((quirkSfx) => quirkSfx.quirkId === quirk?.quirkId)
      ) {
        updatedCharacterSFX.push({
          characterId: 0,
          sfxId: sfx.id,
          name: sfx.name,
          description: sfx.description,
          locked: true,
        });
      }
    });

    setCharacterSFX(updatedCharacterSFX);
  };

  useEffect(() => {
    if (expandedSFX.length > 0) {
      populateCharacterSFX(
        kindredDistinction,
        vocationDistinction,
        quirkDistinction
      );
    }
  }, [expandedSFX]);

  const handleSubmit = (
    character,
    kindredDistinction,
    vocationDistinction,
    quirkDistinction,
    characterAttributes,
    characterValues,
    characterSFX
  ) => {
    const shallowCharacterCopy = { ...character };

    postCharacter(shallowCharacterCopy)
      .then((characterResponse) => {
        // Update characterId in distinctions and attributes
        const updatedAttributes = characterAttributes.map((attr) => ({
          characterId: characterResponse.id, // Use characterResponse.id
          attributeId: attr.id,
          dieSize: attr.dieSize,
        }));
        setCharacterAttributes(updatedAttributes);

        kindredDistinction.characterId = characterResponse.id;
        vocationDistinction.characterId = characterResponse.id;
        quirkDistinction.characterId = characterResponse.id;

        // Update characterId in characterValues
        const updatedCharacterValues = characterValues.map((value) => ({
          characterId: characterResponse.id, // Use characterResponse.id
          dieSize: value.dieSize,
          valueId: value.id,
          description: "", // Default to an empty string
        }));

        // Update characterId in characterSFX
        const updatedCharacterSFX = characterSFX.map((sfx) => ({
          ...sfx,
          characterId: characterResponse.id, // Use characterResponse.id
        }));

        // Add the Hinder SFX to characterSFX
        const hinderSFX = {
          characterId: characterResponse.id,
          sfxId: 101,
          name: "Hinder",
          description:
            "Gain a PP when you step a distinction down to a d4 for an action.",
          locked: false,
        };

        // Post all distinctions, attributes, characterValues, and characterSFX concurrently
        return Promise.all([
          postKindredDistinction(kindredDistinction),
          postVocationDistinction(vocationDistinction),
          postQuirkDistinction(quirkDistinction),
          ...updatedAttributes.map((attr) => postCharacterAttribute(attr)),
          ...updatedCharacterValues.map((value) => postCharacterValue(value)),
          ...updatedCharacterSFX.map((sfx) => postCharacterSFX(sfx)),
          postCharacterSFX(hinderSFX),
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
            <SpeciesSelect
              setCharacter={setCharacter}
              kindredDistinction={kindredDistinction}
              setKindredDistinction={(updatedDistinction) => {
                setKindredDistinction(updatedDistinction);
                populateCharacterSFX(
                  updatedDistinction,
                  vocationDistinction,
                  quirkDistinction
                );
              }}
              setReady={setReady}
              character={character}
              values={values}
              setModifiedValues={setModifiedValues}
            />
          ) : step === 3 ? (
            <BackgroundSelect
              kindredDistinction={kindredDistinction}
              setKindredDistinction={(updatedDistinction) => {
                setKindredDistinction(updatedDistinction);
                populateCharacterSFX(
                  updatedDistinction,
                  vocationDistinction,
                  quirkDistinction
                );
              }}
              setReady={setReady}
              values={values}
              setModifiedValues={setModifiedValues}
            />
          ) : step === 4 ? (
            <VocationSelect
              vocationDistinction={vocationDistinction}
              setVocationDistinction={(updatedDistinction) => {
                setVocationDistinction(updatedDistinction);
                populateCharacterSFX(
                  kindredDistinction,
                  updatedDistinction,
                  quirkDistinction
                );
              }}
              quirkDistinction={quirkDistinction}
              setQuirkDistinction={(updatedDistinction) => {
                setQuirkDistinction(updatedDistinction);
                populateCharacterSFX(
                  kindredDistinction,
                  vocationDistinction,
                  updatedDistinction
                );
              }}
              setReady={setReady}
              values={values}
              setModifiedValues={setModifiedValues}
            />
          ) : step === 5 ? (
            <AttributeSelect
              characterAttributes={characterAttributes}
              setCharacterAttributes={setCharacterAttributes}
              setReady={setReady}
              pointsAvailable={attributePoints}
              setPointsAvailable={setAttributePoints}
            />
          ) : step === 6 ? (
            <ValueSelect
              values={values}
              modifiedValues={modifiedValues}
              characterValues={characterValues}
              setCharacterValues={setCharacterValues}
              setReady={setReady}
              pointsAvailable={valuePointsAvailable}
              setPointsAvailable={setValuePointsAvailable}
              pointsSpent={valuePointsSpent}
              setPointsSpent={setValuePointsSpent}
            />
          ) : step === 7 ? (
            <SFXSelect
              characterSFX={characterSFX}
              setCharacterSFX={setCharacterSFX}
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
          {ready === step && step < 7 ? (
            <Button
              className="custom-nav-button"
              onClick={() => setStep((prev) => prev + 1)}
            >
              <FontAwesomeIcon icon="fa-solid fa-circle-arrow-right" />
            </Button>
          ) : ready === step && step === 7 ? (
            <Button
              className="custom-nav-button"
              onClick={() =>
                handleSubmit(
                  character,
                  kindredDistinction,
                  vocationDistinction,
                  quirkDistinction,
                  characterAttributes,
                  characterValues,
                  characterSFX
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
