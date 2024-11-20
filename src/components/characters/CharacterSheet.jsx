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
import { ValueItem } from "./CSComponents/ValueItem";
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
import { AttributeItem } from "./CSComponents/AttributeItem";
import {
  getCharacterSfxByCharacterId,
  updateCharacterSfx,
} from "../../services/sfxService";
import { SFXItem } from "./CharacterCreateComponents/SFXItem";

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

  // SFX State
  const [unlockedSFX, setUnlockedSFX] = useState([]);
  const [lockedSFX, setLockedSFX] = useState([]);
  const [SFX, setSFX] = useState([]);

  // Fetch and set functions for each part of the state
  const getAndSetCharacter = async () => {
    try {
      const character = await getCharacterById(characterId);
      setCharacter(character);
    } catch (error) {
      console.error("Error fetching and setting character:", error);
    }
  };

  const getAndSetKindredDistinction = async () => {
    try {
      const distinctions = await getKindredDistinctionByCharacterId(
        characterId
      );
      const [expandedKD] = distinctions;
      setExpandedKindredDistinction(expandedKD);

      const { species, background, ...nonExpandedKindredDistinction } =
        expandedKD;
      setKindredDistinction(nonExpandedKindredDistinction);
    } catch (error) {
      console.error("Error fetching and setting kindred distinction:", error);
    }
  };

  const getAndSetVocationDistinction = async () => {
    try {
      const distinctions = await getVocationDistinctionByCharacterId(
        characterId
      );
      const [expandedVD] = distinctions;
      setExpandedVocationDistinction(expandedVD);

      const { adjective, job, ...nonExpandedVocationDistinction } = expandedVD;
      setVocationDistinction(nonExpandedVocationDistinction);
    } catch (error) {
      console.error("Error fetching and setting vocation distinction:", error);
    }
  };

  const getAndSetQuirkDistinction = async () => {
    try {
      const distinctions = await getQuirkDistinctionByCharacterId(characterId);
      const [expandedQD] = distinctions;
      setExpandedQuirkDistinction(expandedQD);

      const { quirk, ...nonExpandedQuirkDistinction } = expandedQD;
      setQuirkDistinction(nonExpandedQuirkDistinction);
    } catch (error) {
      console.error("Error fetching and setting quirk distinction:", error);
    }
  };

  const getAndSetValues = async () => {
    try {
      const values = await getCharacterValuesByCharacterId(characterId);
      setExpandedValues(values);

      const nonExpandedValuesArray = values.map(
        ({ value, ...nonExpandedValues }) => nonExpandedValues
      );
      setValues(nonExpandedValuesArray);
    } catch (error) {
      console.error("Error fetching and setting values:", error);
    }
  };

  const getAndSetAttributes = async () => {
    try {
      const attributes = await getCharacterAttributesByCharacterId(characterId);
      setExpandedAttributes(attributes);

      const nonExpandedAttributesArray = attributes.map(
        ({ attribute, ...nonExpandedAttributes }) => nonExpandedAttributes
      );
      setAttributes(nonExpandedAttributesArray);
    } catch (error) {
      console.error("Error fetching and setting attributes:", error);
    }
  };

  const getAndSetSFX = async () => {
    try {
      const sfxData = await getCharacterSfxByCharacterId(characterId);
      setSFX(sfxData);
      setUnlockedSFX(sfxData.filter((item) => !item.locked));
      setLockedSFX(sfxData.filter((item) => item.locked));
    } catch (error) {
      console.error("Error fetching character SFX:", error);
    }
  };

  // Orchestrator to fetch all state (initial render)
  const getAndSetState = async () => {
    try {
      await Promise.all([
        getAndSetCharacter(),
        getAndSetKindredDistinction(),
        getAndSetVocationDistinction(),
        getAndSetQuirkDistinction(),
        getAndSetValues(),
        getAndSetAttributes(),
        getAndSetSFX(),
      ]);
    } catch (error) {
      console.error("Error in getAndSetState:", error);
    }
  };

  // Optimized toggle for SFX lock status
  const toggleLockStatus = (sfx) => {
    const { id, name, description, locked, characterId } = sfx;
    const updatedSfx = { id, name, description, locked: !locked, characterId };

    updateCharacterSfx(updatedSfx)
      .then(() => {
        console.log(`Successfully toggled lock status for SFX: ${sfx.name}`);

        // Optimistically update the local state
        setSFX((prev) =>
          prev.map((item) =>
            item.id === updatedSfx.id
              ? { ...item, locked: updatedSfx.locked }
              : item
          )
        );

        // Refresh only SFX state
        return getAndSetSFX();
      })
      .catch((error) => {
        console.error("Failed to toggle lock status:", error);
      });
  };

  // useEffect for initial render
  useEffect(() => {
    getAndSetState();
  }, [characterId]);

  return (
    <Container as="main">
      <CharacterHeader
        character={character}
        setCharacter={getAndSetCharacter}
      />

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
                getAndSet={getAndSetKindredDistinction}
              />
              <DistinctionItem
                title="Vocation"
                expandedDistinction={expandedVocationDistinction}
                distinction={vocationDistinction}
                setDistinction={setVocationDistinction}
                updateDistinction={updateVocationDistinction}
                getAndSet={getAndSetVocationDistinction}
              />
              <DistinctionItem
                title="Quirk"
                expandedDistinction={expandedQuirkDistinction}
                distinction={quirkDistinction}
                setDistinction={setQuirkDistinction}
                updateDistinction={updateQuirkDistinction}
                getAndSet={getAndSetQuirkDistinction}
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
                  getAndSet={getAndSetValues}
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
                  getAndSet={getAndSetAttributes}
                  expandedAttribute={expandedAttribute}
                />
              ))}
            </Row>
          </Accordion.Body>
        </Accordion.Item>

        {/* Unlocked SFX */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>Unlocked SFX</Accordion.Header>
          <Accordion.Body className="dark-container text-center">
            {unlockedSFX?.map((item) => (
              <SFXItem
                setSFX={setSFX}
                toggleLockStatus={toggleLockStatus}
                locked={false}
                key={item.id}
                sfx={item}
                sheet={true}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>

        {/* Locked SFX */}
        <Accordion.Item eventKey="4">
          <Accordion.Header>Locked SFX</Accordion.Header>
          <Accordion.Body className="dark-container text-center">
            {lockedSFX?.map((item) => (
              <SFXItem
                setSFX={setSFX}
                toggleLockStatus={toggleLockStatus}
                locked={true}
                key={item.id}
                sfx={item}
                sheet={true}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};
