import React, { useEffect, useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import { DieSize } from "../DieSize";

export const ValueSelect = ({
  values,
  modifiedValues,
  characterValues,
  setCharacterValues,
  setReady,
  pointsAvailable,
  setPointsAvailable,
  pointsSpent,
  setPointsSpent,
}) => {
  const [show, setShow] = useState(false);

  // Effect: Update characterValues based on modifiedValues and pointsSpent
  useEffect(() => {
    const updatedCharacterValues = values.map((value) => {
      // Filter to find matching modified values for the current value
      const filteredArray = modifiedValues.filter(
        (modVal) => modVal.valueId === value.id
      );

      // Use the count of matching modified values for calculations
      const modValue = filteredArray.length; // Calculate based on the number of matches
      const pointsOnValue =
        pointsSpent.find((point) => point.valueId === value.id)?.pointsSpent ||
        0; // Default to 0 if not found

      // Calculations for dieSize and minDieSize
      const minDieSize = modValue * 2 + 4; // Minimum size
      const dieSize = (modValue + pointsOnValue) * 2 + 4; // Final size

      return {
        ...value,
        dieSize,
        minDieSize,
      };
    });

    setCharacterValues(updatedCharacterValues);

    // Determine if all values meet the minimum and points are fully allocated
    const allValuesValid = updatedCharacterValues.every(
      (val) => val.dieSize >= val.minDieSize
    );

    if (pointsAvailable === 0 && allValuesValid) {
      setReady(6); // Ready for the next step
    } else {
      setReady(5); // Not ready yet
    }
  }, [
    values,
    modifiedValues,
    pointsSpent,
    pointsAvailable,
    setCharacterValues,
    setReady,
  ]);

  // Increment points spent for a value
  const handleIncrement = (valueId) => {
    if (pointsAvailable > 0) {
      setPointsSpent((prev) =>
        prev.map((p) =>
          p.valueId === valueId ? { ...p, pointsSpent: p.pointsSpent + 1 } : p
        )
      );
      setPointsAvailable((prev) => prev - 1); // Decrease available points
    }
  };

  // Decrement points spent for a value
  const handleDecrement = (valueId) => {
    const currentPoints = pointsSpent.find(
      (p) => p.valueId === valueId
    )?.pointsSpent;
    if (currentPoints > 0) {
      setPointsSpent((prev) =>
        prev.map((p) =>
          p.valueId === valueId ? { ...p, pointsSpent: p.pointsSpent - 1 } : p
        )
      );
      setPointsAvailable((prev) => prev + 1); // Increase available points
    }
  };

  return (
    <>
      {/* Modal for Value Points Information */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Value Points</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Value Points</h4>
          <p>
            You should have accumulated a number of value points already, but
            you now have <strong>4 points</strong> to use to step up any values
            you'd like.
          </p>
          <p>
            Later, when viewing your character's character sheet, you'll be able
            to come up with a single sentence that defines what that value means
            for your character.
          </p>
          <div className="dark-container p-1 m-1">
            <h5>Devotion</h5>
            <p>
              Have you ever been obligated to others? This value is about duty,
              faith, and friendship. You’re motivated by the bonds of loyalty
              and your love for others.
            </p>
          </div>
          <div className="dark-container p-1 m-1">
            <h5>Glory</h5>
            <p>
              Have you ever wanted to be celebrated by history? This value is
              about legacy, fame, and fortune. You’re motivated by praise,
              acclaim, and your desire to be remembered.
            </p>
          </div>
          <div className="dark-container p-1 m-1">
            <h5>Liberty</h5>
            <p>
              Have you ever resisted the control of others? This value is about
              freedom, independence, and autonomy. You’re motivated by a world
              without oppression or suppression.
            </p>
          </div>
          <div className="dark-container p-1 m-1">
            <h5>Mastery</h5>
            <p>
              Have you ever needed to rise above your own limits? This value is
              about control, achievement, and skill. You’re motivated by power,
              growth, and self-development.
            </p>
          </div>
          <div className="dark-container p-1 m-1">
            <h5>Justice</h5>
            <p>
              Have you ever been compelled to fix what’s wrong? This value is
              about balance, righteousness, and reward. You’re motivated by
              adherence to fairness and what you think is right.
            </p>
          </div>
          <div className="dark-container p-1 m-1">
            <h5>Truth</h5>
            <p>
              Have you ever sought out all the answers? This value is about
              fidelity, certainty, and authenticity. You’re motivated by finding
              strength in facts and by the principle and pursuit of knowledge.
            </p>
          </div>
        </Modal.Body>
      </Modal>

      {/* Header Section with Button to Trigger Modal */}
      <Row className="align-items-center">
        <Col>
          <h2>Allocate Value Points</h2>
          <p>Points Available: {pointsAvailable}</p>
        </Col>
        <Col xs="auto">
          <Button className="btn-edit" onClick={() => setShow(true)}>
            <FontAwesomeIcon icon="fa-solid fa-question" />
          </Button>
        </Col>
      </Row>

      {/* Character Values Display and Allocation Controls */}
      <Row className="flex-row">
        {characterValues?.map((value, index) => (
          <Col
            key={`value-${value?.id ?? `fallback-${index}`}`} // Ensure fallback is unique
            md={3}
            className="distinction-item text-center"
          >
            {/* Value Name */}
            <Row>
              <Col className="text-dark">
                <h4>{value?.name ?? "Unknown Value"}</h4>
              </Col>
            </Row>

            {/* Die Size Adjustment Controls */}
            <Row className="text-dark">
              <Col xs={{ offset: 2, span: 2 }}>
                <Button
                  className="btn-plus"
                  onClick={() => handleDecrement(value?.id)}
                  disabled={
                    !value ||
                    pointsSpent.find((p) => p.valueId === value.id)
                      ?.pointsSpent === 0
                  } // Disable if no points to decrement
                >
                  <FontAwesomeIcon icon="fa-solid fa-circle-minus" />
                </Button>
              </Col>
              <Col xs={{ offset: 1, span: 2 }}>
                <DieSize dieSize={value?.dieSize ?? 4} />
                {/* Die Size Display */}
              </Col>
              <Col xs={{ offset: 1, span: 2 }}>
                <Button
                  className="btn-plus"
                  onClick={() => handleIncrement(value?.id)}
                  disabled={
                    !value || pointsAvailable <= 0 || value.dieSize >= 12
                  } // Disable if dieSize is 12 or more
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
