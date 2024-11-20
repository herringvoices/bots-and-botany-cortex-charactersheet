import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";

export const SFXItem = ({ sfx, locked, toggleLockStatus, disabled, sheet }) => {
  return (
    <Row
      className={`${
        locked ? "dark-container" : "value-item text-dark"
      } align-items-center my-2 p-2`}
    >
      <Col xs={10} className="text-start">
        <h5>{sfx.name}</h5>
        <p>{sfx.description}</p>
      </Col>
      <Col xs={2} className="text-end">
        <Button
          onClick={
            !sheet
              ? toggleLockStatus
              : () => {
                  toggleLockStatus(sfx);
                }
          }
          className={!locked ? "btn-edit-dark" : "btn-edit"}
          disabled={locked && disabled}
        >
          {locked ? (
            <FontAwesomeIcon icon="fa-solid fa-lock" />
          ) : (
            <FontAwesomeIcon icon="fa-solid fa-lock-open" />
          )}
        </Button>
      </Col>
    </Row>
  );
};
