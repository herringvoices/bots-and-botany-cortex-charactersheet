import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import {
  getSFX,
  getBackground,
  getBackgroundSFX,
} from "../../../services/Service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const BackgroundSelect = ({
  kindredDistinction,
  setKindredDistinction,
  setReady,
  values, // Use values from the parent
  setModifiedValues, // Update modifiedValues in the parent
}) => {
  const [background, setBackground] = useState([]);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [sfx, setSfx] = useState([]);
  const [backgroundSfx, setBackgroundSfx] = useState([]);
  const [selectedBackgroundSfx, setSelectedBackgroundSfx] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [show, setShow] = useState(false);

  // Fetch background, sfx, and backgroundSfx once when the component mounts.
  useEffect(() => {
    Promise.all([getBackground(), getSFX(), getBackgroundSFX()])
      .then(([background, sfx, backgroundSfx]) => {
        setBackground(background);
        setSfx(sfx);
        setBackgroundSfx(backgroundSfx);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Set selected background when kindredDistinction.backgroundId changes.
  useEffect(() => {
    setSelectedBackground(
      background.find(
        (item) => item.id === parseInt(kindredDistinction.backgroundId)
      )
    );
  }, [kindredDistinction, background]);

  // Update selectedValue and modifiedValues when selectedBackground changes.
  useEffect(() => {
    if (selectedBackground) {
      const foundValue = values.find(
        (item) => item.id === selectedBackground.valueId
      );
      setSelectedValue(foundValue);

      // Update the modifiedValues array in the parent.
      setModifiedValues((prev) =>
        prev.map((val) =>
          val.id === 2 ? { ...val, valueId: foundValue?.id || 0 } : val
        )
      );

      // Update selectedBackgroundSfx based on the selected background.
      const selectedSSFX = backgroundSfx.filter(
        (item) => item?.backgroundId === selectedBackground?.id
      );
      const sfxOptions = sfx.filter((item) =>
        selectedSSFX.some((selected) => selected.sfxId === item.id)
      );
      setSelectedBackgroundSfx(sfxOptions);
    }
  }, [selectedBackground, values, backgroundSfx, sfx, setModifiedValues]);

  // Update readiness based on whether a background is selected.
  useEffect(() => {
    setReady(kindredDistinction.backgroundId ? 3 : 2);
  }, [kindredDistinction]);

  return (
    <>
      {/* Modal for Rules and Information */}
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
          <h5>Background</h5>
          <p>
            Step 1: Choose your <strong>species</strong>, then your{" "}
            <strong>background</strong>. These will combine into your{" "}
            <strong>Kindred Distinction</strong>, such as "Cityfolk Amorf." Step
            up the associated <strong>Values</strong> by one.
          </p>
        </Modal.Body>
      </Modal>

      {/* Header Row with Modal Trigger Button */}
      <Row className="align-items-center">
        <Col>
          <h1>Background Selection</h1>
        </Col>
        <Col xs="auto">
          <Button className="btn-edit" onClick={() => setShow(true)}>
            <FontAwesomeIcon icon="fa-solid fa-question" />
          </Button>
        </Col>
      </Row>

      {/* Background Selection Form */}
      <Col md={{ span: 4 }} className="select-column">
        <div className="mt-3 mb-3">
          <Form>
            <Form.Group className="mb-3" controlId="formKindredBackground">
              <Form.Label>Select Character Background</Form.Label>
              <Form.Select
                defaultValue={kindredDistinction.backgroundId || ""}
                onChange={(evt) =>
                  setKindredDistinction({
                    ...kindredDistinction,
                    backgroundId: parseInt(evt.target.value, 10),
                  })
                }
              >
                <option value="" disabled>
                  Select a background
                </option>
                {background.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
          {selectedBackground ? (
            <div className="mt-3 mb-3">
              <Image
                className="background-select-image"
                src={selectedBackground.image}
                alt={`Image of ${selectedBackground.name}`}
              />
              <h2 className="mt-3">{selectedBackground.name}</h2>
            </div>
          ) : (
            ""
          )}
        </div>
      </Col>

      {/* Background Description */}
      {selectedBackground ? (
        <Col md={{ span: 4 }} className="select-column">
          <div className="mt-3 mb-3">
            <h2>Description</h2>
            <div>{selectedBackground.description}</div>
          </div>
        </Col>
      ) : (
        ""
      )}

      {/* SFX and Value Information */}
      {selectedBackground ? (
        <Col md={{ span: 4 }} className="select-column">
          <div className="mt-3 mb-3">
            <h2>SFX</h2>
            <ul>
              {selectedBackgroundSfx.map((item) => (
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
