import React, { useState, useEffect } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap"; // Bootstrap components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // FontAwesome for icons
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles (if not already globally included)
import { DieSize } from "../DieSize";

export const AttributeSelect = ({
  characterAttributes,
  setCharacterAttributes,
  setReady,
  pointsAvailable,
  setPointsAvailable,
}) => {
  const [show, setShow] = useState(false);

  // Set readiness state based on pointsAvailable and attribute validation
  useEffect(() => {
    if (
      pointsAvailable === 0 &&
      characterAttributes.every((attr) => attr.dieSize >= 4)
    ) {
      setReady(5); // Ready for step 5
    } else {
      setReady(4); // Stay on step 4 until conditions are met
    }
  }, [pointsAvailable, characterAttributes, setReady]);

  const handleIncrement = (attributeId, currentSize) => {
    if (pointsAvailable > 0 && currentSize < 10) {
      setCharacterAttributes((prev) =>
        prev.map((attr) =>
          attr.id === attributeId ? { ...attr, dieSize: currentSize + 2 } : attr
        )
      );
      setPointsAvailable((prev) => prev - 1); // Deduct points
    }
  };

  const handleDecrement = (attributeId, currentSize) => {
    if (currentSize > 4) {
      setCharacterAttributes((prev) =>
        prev.map((attr) =>
          attr.id === attributeId ? { ...attr, dieSize: currentSize - 2 } : attr
        )
      );
      setPointsAvailable((prev) => prev + 1); // Add points back
    }
  };

  return (
    <>
      {/* Modal for Rules and Information */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rules and Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Attributes</h4>
          <p>
            You have 11 points to spend on your six attributes. Each point steps
            an <strong>attribute</strong> die up by one.
          </p>
          <div className="dark-container p-1 m-1">
            <h5>Agility</h5>
            <p>
              Your hand-eye coordination and speed. Use this when you need to
              fight, sneak, aim, or balance.
            </p>
          </div>
          <div className="dark-container p-1 m-1">
            <h5>Awareness</h5>
            <p>
              Your ability to perceive your surroundings and other people. Use
              this as you pay attention to the world around you.
            </p>
          </div>
          <div className="dark-container p-1 m-1">
            <h5>Influence</h5>
            <p>
              Your presence and persuasiveness. Use this while you convince,
              coerce, charm, or collude.
            </p>
          </div>
          <div className="dark-container p-1 m-1">
            <h5>Intellect</h5>
            <p>
              Your capacity to comprehend. Use this to study, learn, recall
              things you know, or figure out a puzzle.
            </p>
          </div>
          <div className="dark-container p-1 m-1">
            <h5>Spirit</h5>
            <p>
              Your mental resolve and emotional reserves. Use this when the
              situation requires courage, determination, perseverance, or
              willpower.
            </p>
          </div>
          <div className="dark-container p-1 m-1">
            <h5>Strength</h5>
            <p>
              Your level of physical fitness and power. Use this if you’re
              called to be tough, strong, or use brute force.
            </p>
          </div>
        </Modal.Body>
      </Modal>

      {/* Header Row with Modal Trigger Button */}
      <Row className="align-items-center">
        <Col>
          <h2>Attributes</h2>
        </Col>
        <Col xs="auto">
          <Button className="btn-edit" onClick={() => setShow(true)}>
            <FontAwesomeIcon icon="fa-solid fa-question" />
          </Button>
        </Col>
      </Row>

      {/* Attribute Allocation Section */}
      <Row>
        <Col>
          <h2>Allocate Attribute Points</h2>
          <p>Points Available: {pointsAvailable}</p>
        </Col>
      </Row>
      <Row className="flex-row">
        {characterAttributes.map((attribute) => (
          <Col
            key={attribute.id}
            md={3} // Three columns per row on medium and larger screens
            className="distinction-item text-center"
          >
            <Row>
              <Col className="text-dark">
                <h4>{attribute.name}</h4>
              </Col>
            </Row>
            <Row className="text-dark">
              <Col xs={{ offset: 2, span: 2 }}>
                <Button
                  className="btn-plus"
                  onClick={() =>
                    handleDecrement(attribute.id, attribute.dieSize)
                  }
                  disabled={attribute.dieSize <= 4}
                >
                  <FontAwesomeIcon icon="fa-solid fa-circle-minus" />
                </Button>
              </Col>
              <Col xs={{ offset: 1, span: 2 }}>
                <DieSize dieSize={attribute?.dieSize} />
              </Col>
              <Col xs={{ offset: 1, span: 2 }}>
                <Button
                  className="btn-plus"
                  onClick={() =>
                    handleIncrement(attribute.id, attribute.dieSize)
                  }
                  disabled={pointsAvailable <= 0 || attribute.dieSize >= 10}
                >
                  <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
                </Button>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </>
  );
};
