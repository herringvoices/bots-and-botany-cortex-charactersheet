import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DieSize } from "../DieSize";

export const AttributeItem = ({
  title, // Title for the attribute (e.g., the name or category)
  attribute, // Non-expanded attribute data (object representing the specific attribute)
  setAttribute, // Setter function to update a specific attribute
  updateAttribute, // Function to update attribute on the server
  expandedAttribute,
}) => {
  const [edit, setEdit] = useState(false);
  const [localDieSize, setLocalDieSize] = useState(attribute?.dieSize || 4); // Local state for dieSize

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

  // Save function to update attribute on the server and toggle edit off
  const handleSave = () => {
    const updatedAttribute = {
      ...attribute,
      dieSize: localDieSize,
    };
    updateAttribute(updatedAttribute)
      .then((updatedAttributeFromServer) => {
        setAttribute(updatedAttributeFromServer); // Update state with the new data
        setEdit(false); // Toggle edit mode off
      })
      .catch((error) => {
        console.error(`Error saving attribute:`, error);
      });
  };

  return (
    <Col md={4} className="distinction-item-container">
      <Row>
        <Col className="distinction-item">
          <Row>
            <Col
              className="my-auto text-dark text-center"
              xs={{ offset: 4, span: 4 }}
            >
              <h4>{title}</h4>
            </Col>
            <Col xs={{ offset: 2, span: 1 }} className="p-2 text-end">
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
      </Row>
    </Col>
  );
};
