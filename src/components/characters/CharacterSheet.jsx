import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCharacterById,
  getKindredDistinctionByCharacterId,
} from "../../services/Service";
import { Col, Container, Image, Row } from "react-bootstrap";
import "./CharacterSheet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DistinctionItem } from "./DistinctionItem";
import { CharacterHeader } from "./ChracterHeader";

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
      <Row className="dark-container text-center mt-5">
        <Row>
          <h2>Distinctions</h2>
        </Row>
        <DistinctionItem
          expandedKindredDistinction={expandedKindredDistinction}
          kindredDistinction={kindredDistinction}
          setKindredDistinction={setKindredDistinction}
          getAndSetState={getAndSetState}
        />
      </Row>
    </Container>
  );
};
