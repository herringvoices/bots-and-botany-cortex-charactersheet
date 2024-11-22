import React, { useEffect, useState } from "react";
import { Accordion, Button, Modal, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SFXItem } from "./SFXItem";

export const SFXSelect = ({ characterSFX, setCharacterSFX, setReady }) => {
  const [unlockedSFX, setUnlockedSFX] = useState([]);
  const [lockedSFX, setLockedSFX] = useState([]);
  const [pointsAvailable, setPointsAvailable] = useState(2);
  const [show, setShow] = useState(false);

  // useEffect to filter characterSFX into locked and unlocked
  useEffect(() => {
    setUnlockedSFX(characterSFX.filter((item) => !item.locked));
    setLockedSFX(characterSFX.filter((item) => item.locked));
  }, [characterSFX]);

  // useEffect to calculate pointsAvailable
  useEffect(() => {
    const points = 2 - unlockedSFX.length;
    setPointsAvailable(points);
  }, [unlockedSFX]);

  // useEffect to set ready state based on pointsAvailable
  useEffect(() => {
    if (pointsAvailable === 0) {
      setReady(7);
    } else {
      setReady(8);
    }
  }, [pointsAvailable]);

  const toggleLockStatus = (sfxId) => {
    const updatedSFX = characterSFX.map((sfx) =>
      sfx.sfxId === sfxId ? { ...sfx, locked: !sfx.locked } : sfx
    );
    setCharacterSFX(updatedSFX);
  };

  return (
    <>
      {/* Modal for SFX Information */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>SFX Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>SFX</h4>
          <p>
            Choose <strong>2 SFX</strong> available to you to unlock. For
            instance, amorfs have the opportunity to unlock the SFX's "Tool
            Sample," "Hard to Kill," and "Inspired Instinct." If an amorf has
            the quirk "Act First, Think Later," they also have the opportunity
            to unlock the SFX "No Time For That."
          </p>
          <p>
            However, each character can only unlock 2 SFX total when starting
            out. The rest can only be unlocked later during advancement, and
            only unlocked SFX should be recorded on your character sheet.
          </p>
        </Modal.Body>
      </Modal>

      {/* Header with Button to Trigger Modal */}
      <Row className="align-items-center text-center mb-3">
        <Col>
          <h4>Unlock two SFX from your available pool</h4>
          <p>Points Available: {pointsAvailable}</p>
        </Col>
        <Col xs="auto">
          <Button className="btn-edit" onClick={() => setShow(true)}>
            <FontAwesomeIcon icon="fa-solid fa-question" />
          </Button>
        </Col>
      </Row>

      {/* Accordion for SFX Selection */}
      <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
        {/* Unlocked SFX */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>Unlocked SFX</Accordion.Header>
          <Accordion.Body className="text-center">
            {unlockedSFX.map((sfx) => (
              <SFXItem
                key={sfx.sfxId}
                sfx={sfx}
                locked={false}
                toggleLockStatus={() => toggleLockStatus(sfx.sfxId)}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>

        {/* Locked SFX */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Locked SFX</Accordion.Header>
          <Accordion.Body className="text-center">
            {lockedSFX.map((sfx) => (
              <SFXItem
                key={sfx.sfxId}
                sfx={sfx}
                locked={true}
                toggleLockStatus={() => toggleLockStatus(sfx.sfxId)}
                disabled={pointsAvailable === 0}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};
