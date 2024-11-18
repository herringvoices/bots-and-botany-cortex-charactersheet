import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap"; // Bootstrap components
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
