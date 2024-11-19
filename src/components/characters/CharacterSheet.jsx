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
  getCharacterAttributesByCharacterId,
  updateCharacterAttributes,
} from "../../services/attributeService";
import {
  getCharacterValuesByCharacterId,
  updateCharacterValue,
} from "../../services/valueService";
import { AttributeItem } from "./CSComponents/AttributeItem"; // Import AttributeItem

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
  const [expandedValues, setExpandedValues] = useState(null);
  const [values, setValues] = useState(null);

  // Attributes state
  const [expandedAttributes, setExpandedAttributes] = useState(null);
  const [attributes, setAttributes] = useState(null);

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
      .then((prev) => {
        // Store the entire fetched array into expandedValues
        setExpandedValues(prev);

        // Remove the 'value' field from each object in the array
        const nonExpandedValuesArray = prev.map(
          ({ value, ...nonExpandedValues }) => nonExpandedValues
        );

        // Set the resulting array without 'value' properties to values
        setValues(nonExpandedValuesArray);
      })
      .catch((error) => {
        console.error("Error fetching and setting values:", error);
      });

    // Fetch Attributes
    getCharacterAttributesByCharacterId(characterId)
      .then((prev) => {
        // Store the entire fetched array into expandedAttributes
        setExpandedAttributes(prev);

        // Remove the 'attribute' field from each object in the array
        const nonExpandedAttributesArray = prev.map(
          ({ attribute, ...nonExpandedAttributes }) => nonExpandedAttributes
        );

        // Set the resulting array without 'attribute' properties to attributes
        setAttributes(nonExpandedAttributesArray);
      })
      .catch((error) => {
        console.error("Error fetching and setting attributes:", error);
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
            <Row className="p-2">
              {expandedValues?.map((expandedValue) => (
                <ValueItem
                  key={expandedValue.id}
                  title={expandedValue.value.name}
                  value={values.find((item) => item.id === expandedValue.id)}
                  setValue={(updatedValue) =>
                    setValues((prev) =>
                      prev.map((v) =>
                        v.id === updatedValue.id ? updatedValue : v
                      )
                    )
                  }
                  updateValue={updateCharacterValue}
                  expandedValue={expandedValue}
                />
              ))}
            </Row>
          </Accordion.Body>
        </Accordion.Item>

        {/* Attributes */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>Attributes</Accordion.Header>
          <Accordion.Body className="dark-container text-center">
            <Row className="p-2">
              {expandedAttributes?.map((expandedAttribute) => (
                <AttributeItem
                  key={expandedAttribute.id}
                  title={expandedAttribute.attribute.name}
                  attribute={attributes.find(
                    (item) => item.id === expandedAttribute.id
                  )}
                  setAttribute={(updatedAttribute) =>
                    setAttributes((prev) =>
                      prev.map((a) =>
                        a.id === updatedAttribute.id ? updatedAttribute : a
                      )
                    )
                  }
                  updateAttribute={updateCharacterAttributes}
                  expandedAttribute={expandedAttribute}
                />
              ))}
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};
