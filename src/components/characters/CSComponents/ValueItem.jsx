import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DieSize } from "../DieSize";

export const ValueItem = ({
  title, // Title for the value (e.g., the name or category)
  value, // Non-expanded value data (object representing the specific value)
  setValue, // Setter function to update a specific value
  updateValue, // Function to update value on the server
  expandedValue,
}) => {
  const [edit, setEdit] = useState(false);
  const [localDescription, setLocalDescription] = useState(
    value?.description || ""
  );
  const [localDieSize, setLocalDieSize] = useState(value?.dieSize || 4); // Local state for dieSize

  // Limits for dieSize
  const minDieSize = 4;
  const maxDieSize = 12;

  // Increment dieSize by 2, up to a maximum of 12
  const handleIncrement = () => {
    setLocalDieSize((prev) => Math.min(prev + 2, maxDieSize));
  };

  // Decrement dieSize by 2, down to a minimum of 4
  const handleDecrement = () => {
    setLocalDieSize((prev) => Math.max(prev - 2, minDieSize));
  };

  // Handle changes to form fields
  const handleChange = (e) => {
    const { value } = e.target;
    setLocalDescription(value);
  };

  // Save function to update value on the server and toggle edit off
  const handleSave = () => {
    const updatedValue = {
      ...value,
      description: localDescription,
      dieSize: localDieSize,
    };
    updateValue(updatedValue)
      .then((updatedValueFromServer) => {
        setValue(updatedValueFromServer); // Update state with the new data
        setEdit(false); // Toggle edit mode off
      })
      .catch((error) => {
        console.error(`Error saving value:`, error);
      });
  };

  return (
    <Row className="value-item py-2 my-2 mx-auto">
      <Col md={3} className="my-auto py-3">
        <Row>
          <Col className="text-dark">
            <h4>{expandedValue?.value?.name || "Unknown Value"}</h4>
          </Col>
        </Row>
        <Row className="text-dark d-flex justify-content-around align-items-center">
          <Col xs="auto">
            {edit ? (
              <Button className="btn-plus" onClick={handleDecrement}>
                <FontAwesomeIcon icon="fa-solid fa-circle-minus" />
              </Button>
            ) : null}
          </Col>
          <Col xs="auto">
            <DieSize dieSize={localDieSize} />
          </Col>
          <Col xs="auto">
            {edit ? (
              <Button className="btn-plus" onClick={handleIncrement}>
                <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
              </Button>
            ) : null}
          </Col>
        </Row>
      </Col>
      <Col md={8} className="d-flex align-items-center">
        {edit ? (
          <Form className="w-75">
            <Form.Group controlId="valueDescription">
              <Form.Label className="text-dark">Value Description</Form.Label>
              <Form.Control
                type="text"
                name="valueDescription"
                value={localDescription} // Bind to local state
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        ) : (
          <div className="value-description">{value?.description}</div>
        )}
      </Col>
      {/* Edit/Save button */}
      <Col md={1} className="p-2 my-auto">
        {edit ? (
          <Button className="btn-edit-dark" onClick={handleSave} active>
            <FontAwesomeIcon icon="fa-solid fa-floppy-disk" />
          </Button>
        ) : (
          <Button className="btn-edit-dark" onClick={() => setEdit(true)}>
            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
          </Button>
        )}
      </Col>
    </Row>
  );
};
