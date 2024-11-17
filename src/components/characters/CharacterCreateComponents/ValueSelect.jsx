import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap"; // Bootstrap components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // FontAwesome for icons
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles
import { DieSize } from "../DieSize"; // Custom DieSize component

export const ValueSelect = ({
  values,
  modifiedValues,
  characterValues,
  setCharacterValues,
  setReady,
}) => {
  const [pointsAvailable, setPointsAvailable] = useState(4);

  useEffect(() => {
    const updatedCharacterValues = values.map((value) => {
      const filteredArray = modifiedValues.filter(
        (modVal) => modVal.valueId === value.id
      );
      const minDieSize = filteredArray.length * 2 + 4;
      const currentValue = characterValues.find(
        (charVal) => charVal.id === value.id
      );
      return {
        ...value,
        dieSize: currentValue?.dieSize || minDieSize,
        minDieSize,
      };
    });

    if (
      JSON.stringify(updatedCharacterValues) !== JSON.stringify(characterValues)
    ) {
      setCharacterValues(updatedCharacterValues);
    }

    if (
      pointsAvailable === 0 &&
      updatedCharacterValues.every((val) => val.dieSize >= val.minDieSize)
    ) {
      setReady(6);
    } else {
      setReady(5);
    }
  }, [
    values,
    modifiedValues,
    characterValues,
    pointsAvailable,
    setCharacterValues,
    setReady,
  ]);

  const handleIncrement = (valueId, currentSize, maxSize) => {
    if (pointsAvailable > 0 && currentSize < maxSize) {
      setCharacterValues((prev) =>
        prev.map((val) =>
          val.id === valueId ? { ...val, dieSize: currentSize + 2 } : val
        )
      );
      setPointsAvailable((prev) => prev - 1);
    }
  };

  const handleDecrement = (valueId, currentSize, minSize) => {
    if (currentSize > minSize) {
      setCharacterValues((prev) =>
        prev.map((val) =>
          val.id === valueId ? { ...val, dieSize: currentSize - 2 } : val
        )
      );
      setPointsAvailable((prev) => prev + 1);
    }
  };

  return (
    <>
      <Row>
        <Col>
          <h2>Allocate Value Points</h2>
          <p>Points Available: {pointsAvailable}</p>
        </Col>
      </Row>
      <Row className="flex-row">
        {characterValues?.map((value, index) => (
          <Col
            key={`value-${value?.id ?? `fallback-${index}`}`} // Ensure fallback is unique
            md={3}
            className="distinction-item text-center"
          >
            <Row>
              <Col className="text-dark">
                <h4>{value?.name ?? "Unknown Value"}</h4>
              </Col>
            </Row>
            <Row className="text-dark">
              <Col xs={{ offset: 2, span: 2 }}>
                <Button
                  className="btn-plus"
                  onClick={() =>
                    handleDecrement(
                      value?.id,
                      value?.dieSize,
                      value?.minDieSize
                    )
                  }
                  disabled={!value || value.dieSize <= value.minDieSize}
                >
                  <FontAwesomeIcon icon="fa-solid fa-circle-minus" />
                </Button>
              </Col>
              <Col xs={{ offset: 1, span: 2 }}>
                <DieSize dieSize={value?.dieSize ?? 4} />
              </Col>
              <Col xs={{ offset: 1, span: 2 }}>
                <Button
                  className="btn-plus"
                  onClick={() => handleIncrement(value?.id, value?.dieSize, 12)}
                  disabled={
                    !value || pointsAvailable <= 0 || value.dieSize >= 12
                  }
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
