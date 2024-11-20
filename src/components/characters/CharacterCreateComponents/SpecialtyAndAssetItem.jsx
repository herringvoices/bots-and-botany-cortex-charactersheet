import React, { useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DieSize } from "../DieSize";

export const SpecialtyAndAssetItem = ({
  item,
  setter,
  sheet,
  handleSave,
  pointsLeft,
}) => {
  // State to control edit mode and form input value
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(item.name);

  // Handler to increase the dieSize of an item
  const handleIncrement = () => {
    setter((prevArray) =>
      prevArray.map((prevItem) =>
        prevItem.id === item.id
          ? { ...prevItem, dieSize: prevItem.dieSize + 2 }
          : prevItem
      )
    );
  };

  // Handler to decrease the dieSize of an item
  const handleDecrement = () => {
    setter((prevArray) =>
      prevArray.map((prevItem) =>
        prevItem.id === item.id && prevItem.dieSize > 4
          ? { ...prevItem, dieSize: prevItem.dieSize - 2 }
          : prevItem
      )
    );
  };

  // Wrapper for handleSave function
  const onSave = () => {
    // Prepare updated item with new name and any other updates
    const updatedItem = {
      ...item,
      name,
    };

    // Call handleSave passed from the parent
    handleSave(updatedItem)
      .then(() => {
        setEdit(false); // Toggle edit mode off after successful save
      })
      .catch((error) => {
        console.error("Error saving item:", error);
      });
  };

  // Handler to delete an item from the array
  const handleDelete = () => {
    setter((prevArray) =>
      prevArray.filter((prevItem) => prevItem.id !== item.id)
    );
  };

  // Handler to update the name in state as the user types
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    // Update item.name directly in the state array
    setter((prevArray) =>
      prevArray.map((prevItem) =>
        prevItem.id === item.id ? { ...prevItem, name: newName } : prevItem
      )
    );
  };

  return (
    <Col md={4} className="distinction-item-container">
      <Row>
        <Col className="distinction-item">
          <Row>
            {/* Edit/Save Button - always render Col, buttons are conditional */}
            <Col xs={{ offset: 1, span: 1 }} className="p-2 text-end">
              {sheet && (
                <>
                  {edit ? (
                    <Button className="btn-edit-dark" onClick={onSave} active>
                      <FontAwesomeIcon icon="fa-solid fa-floppy-disk" />
                    </Button>
                  ) : (
                    <Button
                      className="btn-edit-dark"
                      onClick={() => setEdit(true)}
                    >
                      <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                    </Button>
                  )}
                </>
              )}
            </Col>

            {/* Item Title or Editable Form */}
            <Col
              className="my-auto text-dark text-center"
              xs={{ offset: 1, span: 6 }}
            >
              {edit || !sheet ? (
                <Form.Control
                  type="text"
                  value={name}
                  onChange={handleNameChange} // Update name as the user types
                  className="text-center mb-2"
                />
              ) : (
                <h4>{item.name}</h4>
              )}
            </Col>

            {/* Delete Button */}
            <Col xs={{ offset: 1, span: 1 }} className="p-2 text-end">
              <Button className="btn-edit-dark" onClick={handleDelete}>
                <FontAwesomeIcon icon="fa-solid fa-trash-can" />
              </Button>
            </Col>

            <Col xs={1}></Col>
          </Row>

          {/* Increment/Decrement controls and die size */}
          <Row className="text-dark d-flex justify-content-around align-items-center">
            {/* Decrement button */}
            <Col xs="auto">
              {(!sheet || edit) && (
                <Button
                  className="btn-plus"
                  onClick={handleDecrement}
                  disabled={item.dieSize <= 4} // Disable if dieSize is at minimum (4)
                >
                  <FontAwesomeIcon icon="fa-solid fa-circle-minus" />
                </Button>
              )}
            </Col>

            {/* Die Size Display */}
            <Col xs="auto">
              <DieSize dieSize={item.dieSize} />
            </Col>

            {/* Increment button */}
            <Col xs="auto">
              {(!sheet || edit) && (
                <Button
                  className="btn-plus"
                  onClick={handleIncrement}
                  disabled={!pointsLeft || item.dieSize >= (sheet ? 12 : 10)} // Cap die size at 12 if sheet is true, else 10
                >
                  <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
                </Button>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};
