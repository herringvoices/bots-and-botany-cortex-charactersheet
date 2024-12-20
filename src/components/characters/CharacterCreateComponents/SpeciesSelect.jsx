import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Col,
  Form,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import {
  getSFX,
  getSpecies,
  getSpeciesSFX,
  getValues,
} from "../../../services/Service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SpeciesSelect = ({
  kindredDistinction,
  setKindredDistinction,
  setReady,
  setCharacter,
  character,
  values, // Receive values from parent
  setModifiedValues, // Receive setModifiedValues from parent
}) => {
  const [species, setSpecies] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [sfx, setSfx] = useState([]);
  const [speciesSfx, setSpeciesSfx] = useState([]);
  const [selectedSpeciesSfx, setSelectedSpeciesSfx] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [show, setShow] = useState(false);

  // Fetch species, sfx, and speciesSfx once when the component mounts.
  useEffect(() => {
    Promise.all([getSpecies(), getSFX(), getSpeciesSFX()])
      .then(([species, sfx, speciesSfx]) => {
        setSpecies(species);
        setSfx(sfx);
        setSpeciesSfx(speciesSfx);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Set selected species when kindredDistinction.speciesId or species change.
  useEffect(() => {
    setSelectedSpecies(
      species.find((item) => item.id === parseInt(kindredDistinction.speciesId))
    );
  }, [kindredDistinction, species]);

  // Update character image and selectedValue when selectedSpecies changes.
  useEffect(() => {
    if (selectedSpecies) {
      setCharacter({ ...character, image: selectedSpecies.image });

      // Find and set the value associated with the selected species.
      const foundValue = values.find(
        (item) => item.id === selectedSpecies.valueId
      );
      setSelectedValue(foundValue);

      // Update modifiedValues in the parent to match the selectedValue.
      setModifiedValues((prev) =>
        prev.map((val) =>
          val.id === 1 ? { ...val, valueId: foundValue?.id || 0 } : val
        )
      );
    }
  }, [selectedSpecies, values, setCharacter, setModifiedValues]);

  // Update selectedSpeciesSfx when speciesSfx or selectedSpecies changes.
  useEffect(() => {
    if (speciesSfx && selectedSpecies) {
      const selectedSSFX = speciesSfx.filter(
        (item) => item?.speciesId === selectedSpecies?.id
      );
      const sfxOptions = sfx.filter((item) =>
        selectedSSFX.some((selected) => selected.sfxId === item.id)
      );
      setSelectedSpeciesSfx(sfxOptions);
    }
  }, [speciesSfx, selectedSpecies, sfx]);

  // Update readiness based on whether a species is selected.
  useEffect(() => {
    setReady(kindredDistinction.speciesId ? 2 : 1);
  }, [kindredDistinction]);

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rules and Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Distinctions</h4>
          <p>
            Distinctions (Kindred, Vocation, and Quirk) all start at a d8. They
            represent your character's background: where they come from, what
            they do, and what quirk makes them unique.
          </p>
          <h4>Kindred Distinction</h4>
          <h5>Species</h5>
          <p>
            Step 1: Choose your <strong>species</strong>, then your{" "}
            <strong>background</strong>. These will combine into your{" "}
            <strong>Kindred Distinction</strong>, such as "Cityfolk Amorf." Step
            up the associated <strong>Values</strong> by one.
          </p>
        </Modal.Body>
      </Modal>

      <Row className="align-items-center">
        <Col>
          <h1>Species Selection</h1>
        </Col>
        <Col xs="auto">
          <Button className="btn-edit" onClick={() => setShow(true)}>
            <FontAwesomeIcon icon="fa-solid fa-question" />
          </Button>
        </Col>
      </Row>
      <Col md={{ span: 4 }} className="select-column">
        <div className="mt-3 mb-3">
          <Form>
            <Form.Group className="mb-3" controlId="formKindredSpecies">
              <Form.Label>Select Character Species</Form.Label>
              <Form.Select
                defaultValue={kindredDistinction.speciesId || ""}
                onChange={(evt) =>
                  setKindredDistinction({
                    ...kindredDistinction,
                    speciesId: parseInt(evt.target.value, 10),
                  })
                }
              >
                <option value="" disabled>
                  Select a species
                </option>
                {species.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
          {selectedSpecies ? (
            <div className="mt-3 mb-3">
              <Image
                className="species-select-image"
                src={selectedSpecies.image}
                alt={`Image of ${selectedSpecies.name}`}
              />
              <h2 className="mt-3">{selectedSpecies.name}</h2>
            </div>
          ) : (
            ""
          )}
        </div>
      </Col>
      {selectedSpecies ? (
        <Col md={{ span: 4 }} className="select-column">
          <div className="mt-3 mb-3">
            <h2>Description</h2>
            <div>{selectedSpecies.description}</div>
          </div>
        </Col>
      ) : (
        ""
      )}
      {selectedSpecies ? (
        <Col md={{ span: 4 }} className="select-column">
          <div className="mt-3 mb-3">
            <h2>SFX</h2>
            <ul>
              {selectedSpeciesSfx.map((item) => (
                <li key={item.id}>
                  <b>{item.name}:</b> {item.description}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Value</h2>
            +1 {selectedValue?.name}
          </div>
        </Col>
      ) : (
        ""
      )}
    </>
  );
};
