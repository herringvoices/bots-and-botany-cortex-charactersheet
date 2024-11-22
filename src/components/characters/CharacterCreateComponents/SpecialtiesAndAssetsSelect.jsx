import React, { useState } from "react";
import { Button, Row, Modal, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpecialtyAndAssetItem from "./SpecialtyAndAssetItem";

export const SpecialtiesAndAssetsSelect = ({
  array,
  setter,
  title,
  pointsLeft,
}) => {
  // State to keep track of the next unique ID to be assigned
  const [nextId, setNextId] = useState(array.length + 1);

  // State to control the display of the modal
  const [show, setShow] = useState(false);

  // Handler to add a new item to the array (works for both specialties and assets)
  const handleAddItem = () => {
    const newItem = {
      id: nextId, // Assign a unique incrementing ID
      name: "Enter name here",
      dieSize: 4, // Default starting value
    };
    setter((prev) => [...prev, newItem]);
    setNextId((prevId) => prevId + 1); // Increment the next ID value
  };

  // Dynamic content for the modal based on the title prop
  const getModalContent = () => {
    if (title === "Specialties") {
      return (
        <>
          <h4>Specialties</h4>
          <p>
            Specialties are sort of like skills in D&D, though you won’t have as
            many. A <strong>d4</strong> means you’ve dabbled enough on your own
            to pick up some proficiency. A <strong>d6</strong> in a skill means
            that you are trained in it, while a <strong>d8</strong> means you’re
            an expert. Anything beyond that should be treated as a rare
            exception.
          </p>
          <p>
            You have <strong>8 points</strong> to spend on specialties and
            assets. One point gets you a specialty at a <strong>d4</strong>.
            Stepping the die up requires another point.
          </p>
        </>
      );
    } else if (title === "Assets") {
      return (
        <>
          <h4>Assets</h4>
          <p>
            Assets can be anything that gives your character an edge—from a
            prized gun, to a loyal pet toad, to your best friend who's always by
            your side. They don't have to be tangible, either; maybe you have
            some powerful Family Connections that deserve a die value.
          </p>
          <p>
            Just as not every possession counts as an asset, the ones that make
            the short list are those that are likely to help your character in a
            challenging situation.
          </p>
          <p>
            You have <strong>8 points</strong> to spend on specialties and
            assets. One point gets you an asset at a <strong>d4</strong>.
            Stepping the die up requires another point.
          </p>
        </>
      );
    }
    return null; // Fallback, in case the title is unexpected
  };

  return (
    <>
      {/* Modal for Specialties or Assets Information */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{title} Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>{getModalContent()}</Modal.Body>
      </Modal>

      {/* Header with Button to Trigger Modal */}
      <Row className="align-items-center">
        <Col>
          <h3>{title}</h3>
        </Col>
        <Col xs="auto">
          <Button className="btn-edit" onClick={() => setShow(true)}>
            <FontAwesomeIcon icon="fa-solid fa-question" />
          </Button>
        </Col>
      </Row>

      {/* List of Specialties and Assets */}
      <Row className="my-1">
        {array.map((item) => (
          <SpecialtyAndAssetItem
            key={item.id}
            item={item}
            setter={setter}
            sheet={false}
            pointsLeft={pointsLeft}
            deleter={true}
            isNameEditable={true}
            title={item.name}
          />
        ))}
      </Row>

      {/* Button to Add New Specialty or Asset */}
      <Button className="mt-3" onClick={handleAddItem} disabled={!pointsLeft}>
        Add to {title}
      </Button>
    </>
  );
};
