import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DieSize } from "../DieSize";

export const ValueItem = ({
  title, // Title for the value (e.g., the name or category)
  value, // Non-expanded value data
  setValue, // Setter for the value
  updateValue, // Function to update value on the server
}) => {
  const [edit, setEdit] = useState(false);

  // Limits for dieSize
  const minDieSize = 4;
  const maxDieSize = 12;

  // Increment dieSize by 2, up to a maximum of 12
  const handleIncrement = () => {
    setValue((prev) => ({
      ...prev,
      dieSize: Math.min(prev.dieSize + 2, maxDieSize),
    }));
  };

  // Decrement dieSize by 2, down to a minimum of 4
  const handleDecrement = () => {
    setValue((prev) => ({
      ...prev,
      dieSize: Math.max(prev.dieSize - 2, minDieSize),
    }));
  };

  // Save function to update value on the server and toggle edit off
  const handleSave = () => {
    updateValue(value)
      .then((updatedValue) => {
        setValue(updatedValue); // Update state with the new data
        setEdit(false); // Toggle edit mode off
      })
      .catch((error) => {
        console.error(`Error saving value:`, error);
      });
  };

  return (
    <Col span={12} md={{ span: 4 }}>
      <Row>
        <Col className="my-auto" xs={{ offset: 4, span: 4 }}>
          <h3>{title}</h3>
        </Col>
        <Col xs={{ offset: 2, span: 1 }} className="p-2 text-end">
          {edit ? (
            <Button className="btn-edit" onClick={handleSave} active>
              <FontAwesomeIcon icon="fa-solid fa-floppy-disk" />
            </Button>
          ) : (
            <Button className="btn-edit" onClick={() => setEdit(true)}>
              <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
            </Button>
          )}
        </Col>
      </Row>
      <Row>
        <Col className="value-item">
          <Row>
            <Col className="text-dark">
              <h4>{value?.name || "Unknown Value"}</h4>
            </Col>
          </Row>
          <Row className="text-dark">
            <Col xs={{ offset: 2, span: 2 }}>
              {edit ? (
                <Button className="btn-plus" onClick={handleDecrement}>
                  <FontAwesomeIcon icon="fa-solid fa-circle-minus" />
                </Button>
              ) : null}
            </Col>
            <Col xs={{ offset: 1, span: 2 }}>
              <DieSize dieSize={value?.dieSize} />
            </Col>
            <Col xs={{ offset: 1, span: 2 }}>
              {edit ? (
                <Button className="btn-plus" onClick={handleIncrement}>
                  <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
                </Button>
              ) : null}
            </Col>
            <Col xs={2}></Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};
