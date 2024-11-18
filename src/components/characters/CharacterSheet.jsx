import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCharacterById,
  getKindredDistinctionByCharacterId,
  updateKindredDistinction,
} from "../../services/Service";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import "./CharacterSheet.scss";
import { DistinctionItem } from "./CSComponents/DistinctionItem";
import { ValueItem } from "./CSComponents/ValueItem"; // Import ValueItem
import { CharacterHeader } from "./CSComponents/CharacterHeader";
import {
  getQuirkDistinctionByCharacterId,
  getVocationDistinctionByCharacterId,
  updateVocationDistinction,
  updateQuirkDistinction,
} from "../../services/distinctionsService";
import {
  getCharacterValuesByCharacterId,
  updateCharacterValue,
} from "../../services/valueService";

export const CharacterSheet = ({ currentUser }) => {
  let { characterId } = useParams();
  characterId = parseInt(characterId);

  const [character, setCharacter] = useState(null);

  // Distinctions state
  const [expandedKindredDistinction, setExpandedKindredDistinction] =
    useState(null);
  const [kindredDistinction, setKindredDistinction] = useState(null);

  const [expandedVocationDistinction, setExpandedVocationDistinction] =
    useState(null);
  const [vocationDistinction, setVocationDistinction] = useState(null);

  const [expandedQuirkDistinction, setExpandedQuirkDistinction] =
    useState(null);
  const [quirkDistinction, setQuirkDistinction] = useState(null);

  // Values state
  const [values, setValues] = useState([]); // All values
  const [individualValues, setIndividualValues] = useState([]); // Separate states for each value

  const getAndSetState = () => {
    getCharacterById(characterId).then(setCharacter);

    // Fetch Kindred Distinction
    getKindredDistinctionByCharacterId(characterId)
      .then((prev) => {
        const [expandedKD] = prev;
        setExpandedKindredDistinction(expandedKD);

        const { species, background, ...nonExpandedKindredDistinction } =
          expandedKD;
        setKindredDistinction(nonExpandedKindredDistinction);
      })
      .catch((error) => {
        console.error("Error fetching and setting kindred distinction:", error);
      });

    // Fetch Vocation Distinction
    getVocationDistinctionByCharacterId(characterId)
      .then((prev) => {
        const [expandedVD] = prev;
        setExpandedVocationDistinction(expandedVD);

        const { adjective, job, ...nonExpandedVocationDistinction } =
          expandedVD;
        setVocationDistinction(nonExpandedVocationDistinction);
      })
      .catch((error) => {
        console.error(
          "Error fetching and setting vocation distinction:",
          error
        );
      });

    // Fetch Quirk Distinction
    getQuirkDistinctionByCharacterId(characterId)
      .then((prev) => {
        const [expandedQD] = prev;
        setExpandedQuirkDistinction(expandedQD);

        const { quirk, ...nonExpandedQuirkDistinction } = expandedQD;
        setQuirkDistinction(nonExpandedQuirkDistinction);
      })
      .catch((error) => {
        console.error("Error fetching and setting quirk distinction:", error);
      });

    // Fetch Values
    getCharacterValuesByCharacterId(characterId)
      .then((fetchedValues) => {
        setValues(fetchedValues);
        setIndividualValues(fetchedValues.map((value) => ({ ...value })));
      })
      .catch((error) => {
        console.error("Error fetching values:", error);
      });
  };

  // useEffect for initial render
  useEffect(() => {
    getAndSetState();
  }, [characterId]);

  return (
    <Container as="main">
      <CharacterHeader character={character} setCharacter={setCharacter} />

      <Accordion defaultActiveKey="0">
        {/* Distinctions */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>Distinctions</Accordion.Header>
          <Accordion.Body className="dark-container text-center">
            <Row>
              <DistinctionItem
                title="Kindred"
                expandedDistinction={expandedKindredDistinction}
                distinction={kindredDistinction}
                setDistinction={setKindredDistinction}
                updateDistinction={updateKindredDistinction}
                getAndSetState={getAndSetState}
              />
              <DistinctionItem
                title="Vocation"
                expandedDistinction={expandedVocationDistinction}
                distinction={vocationDistinction}
                setDistinction={setVocationDistinction}
                updateDistinction={updateVocationDistinction}
                getAndSetState={getAndSetState}
              />
              <DistinctionItem
                title="Quirk"
                expandedDistinction={expandedQuirkDistinction}
                distinction={quirkDistinction}
                setDistinction={setQuirkDistinction}
                updateDistinction={updateQuirkDistinction}
                getAndSetState={getAndSetState}
              />
            </Row>
          </Accordion.Body>
        </Accordion.Item>

        {/* Values */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Values</Accordion.Header>
          <Accordion.Body className="dark-container text-center">
            <Row>
              {individualValues.map((value, index) => (
                <ValueItem
                  key={value.id}
                  title={`Value ${index + 1}`}
                  value={value}
                  setValue={(updatedValue) =>
                    setIndividualValues((prev) =>
                      prev.map((v) =>
                        v.id === updatedValue.id ? updatedValue : v
                      )
                    )
                  }
                  updateValue={updateCharacterValue}
                />
              ))}
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};
