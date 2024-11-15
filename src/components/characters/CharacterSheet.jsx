import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCharacterById,
  getKindredDistinctionByCharacterId,
} from "../../services/Service";
import { Accordion, Col, Container, Image, Row } from "react-bootstrap";
import "./CharacterSheet.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DistinctionItem } from "./CSComponents/DistinctionItem";
import { CharacterHeader } from "./CSComponents/ChracterHeader";

export const CharacterSheet = ({ currentUser }) => {
  let { characterId } = useParams();
  characterId = parseInt(characterId);

  const [character, setCharacter] = useState(null);
  const [expandedKindredDistinction, setExpandedKindredDistinction] =
    useState(null);
  const [kindredDistinction, setKindredDistinction] = useState(null);

  const getAndSetState = () => {
    getCharacterById(characterId).then(setCharacter);

    getKindredDistinctionByCharacterId(characterId)
      .then((prev) => {
        const [expandedKD] = prev;
        setExpandedKindredDistinction(expandedKD);

        // Create a non-expanded version by omitting the expanded fields
        const { species, background, ...nonExpandedKindredDistinction } =
          expandedKD;
        setKindredDistinction(nonExpandedKindredDistinction);
      })
      .catch((error) => {
        console.error("Error fetching and setting kindred distinction:", error);
      });
  };

  //useEffect for initial render
  useEffect(() => {
    getAndSetState();
  }, [characterId]);

  return (
    <Container as="main">
      <CharacterHeader character={character} setCharacter={setCharacter} />

      <Accordion eventKey="0" alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Distinctions</Accordion.Header>
          <Accordion.Body className="dark-container text-center">
            <DistinctionItem
              expandedKindredDistinction={expandedKindredDistinction}
              kindredDistinction={kindredDistinction}
              setKindredDistinction={setKindredDistinction}
              getAndSetState={getAndSetState}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};
