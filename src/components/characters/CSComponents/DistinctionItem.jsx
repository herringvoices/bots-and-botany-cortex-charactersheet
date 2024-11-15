// DistinctionItem.js
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateKindredDistinction } from "../../../services/Service";

export const DistinctionItem = ({
  expandedKindredDistinction,
  kindredDistinction,
  setKindredDistinction,
  getAndSetState,
}) => {
  const [edit, setEdit] = useState(false);

  // Fetch data or set kindredDistinction state as needed
  useEffect(() => {
    if (!expandedKindredDistinction) {
      getAndSetState();
    }
  }, [expandedKindredDistinction, getAndSetState]);

  // Limits for dieSize
  const minDieSize = 4;
  const maxDieSize = 12;

  // Fetch data or set kindredDistinction state as needed
  useEffect(() => {
    if (!expandedKindredDistinction) {
      getAndSetState();
    }
  }, [expandedKindredDistinction, getAndSetState]);

  // Increment dieSize by 2, up to a maximum of 12
  const handleIncrement = () => {
    setKindredDistinction((prev) => ({
      ...prev,
      dieSize: Math.min(prev.dieSize + 2, maxDieSize),
    }));
  };

  // Decrement dieSize by 2, down to a minimum of 4
  const handleDecrement = () => {
    setKindredDistinction((prev) => ({
      ...prev,
      dieSize: Math.max(prev.dieSize - 2, minDieSize),
    }));
  };

  // Save function to update kindredDistinction on the server and toggle edit off
  const handleSave = () => {
    updateKindredDistinction(kindredDistinction)
      .then((updatedDistinction) => {
        setKindredDistinction(updatedDistinction); // Update state with the new data
        setEdit(false); // Toggle edit mode off
      })
      .catch((error) => {
        console.error("Error saving kindred distinction:", error);
      });
  };

  return (
    <Col md={{ span: 4 }}>
      <Row>
        <Col className="my-auto" xs={{ offset: 4, span: 4 }}>
          <h3>Kindred</h3>
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
              <h4>
                {expandedKindredDistinction?.species.name}{" "}
                {expandedKindredDistinction?.background.name}
              </h4>
            </Col>
          </Row>
          <Row className="text-dark">
            <Col xs={{ offset: 2, span: 2 }}>
              {edit ? (
                <Button className="btn-plus" onClick={handleDecrement}>
                  <FontAwesomeIcon icon="fa-solid fa-circle-minus" />
                </Button>
              ) : (
                ""
              )}
            </Col>
            <Col xs={{ offset: 1, span: 2 }}>
              <div className="diamond">
                <div>{kindredDistinction?.dieSize}</div>
              </div>
            </Col>
            <Col xs={{ offset: 1, span: 2 }}>
              {edit ? (
                <Button className="btn-plus" onClick={handleIncrement}>
                  <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
                </Button>
              ) : (
                ""
              )}
            </Col>
            <Col xs={2}></Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};
