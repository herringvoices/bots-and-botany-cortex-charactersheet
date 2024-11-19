import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DieSize } from "../DieSize";

export const DistinctionItem = ({
  title, // e.g., "Kindred", "Vocation", or "Quirk"
  expandedDistinction, // Expanded distinction data
  distinction, // Non-expanded distinction data
  setDistinction, // Setter for the distinction
  updateDistinction, // Function to update distinction on the server
  getAndSetState, // Function to re-fetch and set state
}) => {
  const [edit, setEdit] = useState(false);

  // Limits for dieSize
  const minDieSize = 4;
  const maxDieSize = 12;

  // Fetch data or set distinction state as needed
  useEffect(() => {
    if (!expandedDistinction) {
      getAndSetState();
    }
  }, [expandedDistinction, getAndSetState]);

  // Increment dieSize by 2, up to a maximum of 12
  const handleIncrement = () => {
    setDistinction((prev) => ({
      ...prev,
      dieSize: Math.min(prev.dieSize + 2, maxDieSize),
    }));
  };

  // Decrement dieSize by 2, down to a minimum of 4
  const handleDecrement = () => {
    setDistinction((prev) => ({
      ...prev,
      dieSize: Math.max(prev.dieSize - 2, minDieSize),
    }));
  };

  // Save function to update distinction on the server and toggle edit off
  const handleSave = () => {
    updateDistinction(distinction)
      .then((updatedDistinction) => {
        setDistinction(updatedDistinction); // Update state with the new data
        setEdit(false); // Toggle edit mode off
      })
      .catch((error) => {
        console.error(
          `Error saving ${title.toLowerCase()} distinction:`,
          error
        );
      });
  };
  // Render the distinction-specific title
  const renderTitle = () => {
    if (title === "Kindred") {
      return (
        <>
          {expandedDistinction?.species?.name || "Unknown"}{" "}
          {expandedDistinction?.background?.name || "Unknown"}
        </>
      );
    } else if (title === "Vocation") {
      return (
        <>
          {expandedDistinction?.adjective?.name || "Unknown"}{" "}
          {expandedDistinction?.job?.name || "Unknown"}
        </>
      );
    } else if (title === "Quirk") {
      return expandedDistinction?.quirk?.name || "Unknown";
    } else {
      return "Unknown";
    }
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
        <Col className="distinction-item">
          <Row>
            <Col className="text-dark">
              <h4>{renderTitle()}</h4>
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
              <DieSize dieSize={distinction?.dieSize} />
            </Col>
            <Col xs={{ offset: 1, span: 2 }}>
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
