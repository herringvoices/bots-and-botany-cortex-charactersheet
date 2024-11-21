import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PPItem = ({ character, setter, updater }) => {
  // Handler to increment plotPoints by 1
  const handleIncrement = () => {
    // Create the updated character with incremented pp
    const updatedCharacter = {
      ...character,
      plotPoints: character.plotPoints + 1,
    };

    // Call the updater function to update the backend, then update local state
    updater(updatedCharacter)
      .then((updatedCharacter) => {
        // Update the character locally only after confirming backend update
        setter(updatedCharacter);
      })
      .catch((error) => {
        console.error("Error updating character plotPoints:", error);
      });
  };

  const handleDecrement = () => {
    if (character.plotPoints > 0) {
      // Create the updated character with decremented plotPoints
      const updatedCharacter = {
        ...character,
        plotPoints: character.plotPoints - 1,
      };

      // Call the updater function to update the backend, then update local state
      updater(updatedCharacter)
        .then((updatedCharacter) => {
          // Update the character locally only after confirming backend update
          setter(updatedCharacter);
        })
        .catch((error) => {
          console.error("Error updating character pp:", error);
        });
    }
  };

  return (
    <Col className="distinction-item">
      <Row className="text-dark">
        <h4>Plot Points</h4>
      </Row>
      <Row className="text-dark d-flex justify-content-around align-items-center">
        {/* Decrement Button */}
        <Col xs="auto">
          <Button
            className="btn-plus"
            onClick={handleDecrement}
            disabled={character?.plotPoints <= 0} // Disable button if plotPoints is 0
          >
            <FontAwesomeIcon icon="fa-solid fa-circle-minus" />
          </Button>
        </Col>

        {/* Plot Points Display */}
        <Col xs="auto" className="plot-points">
          {character?.plotPoints}
        </Col>

        {/* Increment Button */}
        <Col xs="auto">
          <Button className="btn-plus" onClick={handleIncrement}>
            <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
          </Button>
        </Col>
      </Row>
    </Col>
  );
};

export default PPItem;
