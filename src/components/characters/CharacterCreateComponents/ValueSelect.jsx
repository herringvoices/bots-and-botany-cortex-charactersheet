import React, { useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
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
      {/* Header Section */}
      <Row>
        <Col>
          <h2>Allocate Value Points</h2>
          <p>Points Available: {pointsAvailable}</p>
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
