import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import speciesData from "./data.js";
import "./species.scss";

const SpeciesProfile = ({ species }) => {
  // Find the species data based on the species prop
  const speciesInfo = speciesData.find(
    (item) => item.name.toLowerCase() === species.toLowerCase()
  );

  // If species not found, display a fallback
  if (!speciesInfo) {
    return (
      <Container className="my-5">
        <h2>Species Not Found</h2>
        <p>The species you are looking for is not available in the database.</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img
              variant="top"
              src={speciesInfo.image}
              alt={speciesInfo.name}
            />
            <Card.Body>
              <Card.Title>{speciesInfo.name}</Card.Title>
              <Card.Text>{speciesInfo.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8} className="dark-container p-5 species-info">
          <h4>Physical Traits</h4>
          <ul>
            {speciesInfo.physicalTraits.map((trait, index) => (
              <li key={index}>
                <strong>{trait.trait}:</strong> {trait.description}
              </li>
            ))}
          </ul>
          <h4>Cognitive Traits</h4>
          <ul>
            {speciesInfo.cognitiveTraits.map((trait, index) => (
              <li key={index}>
                <strong>{trait.trait}:</strong> {trait.description}
              </li>
            ))}
          </ul>
          <h4>Reproduction</h4>
          <ul>
            {speciesInfo.reproduction.map((method, index) => (
              <li key={index}>
                <strong>{method.method}:</strong> {method.description}
              </li>
            ))}
          </ul>
          <h4>Technology</h4>
          <ul>
            {speciesInfo.technology.map((tech, index) => (
              <li key={index}>
                <strong>{tech.type}:</strong> {tech.description}
              </li>
            ))}
          </ul>
          <h4>Culture</h4>
          <ul>
            {speciesInfo.culture.map((aspect, index) => (
              <li key={index}>
                <strong>{aspect.aspect}:</strong> {aspect.description}
              </li>
            ))}
          </ul>
          <h4>Interaction with Other Species</h4>
          <p>{speciesInfo.interactionWithOtherSpecies}</p>
          <h4>Weaknesses</h4>
          <ul>
            {speciesInfo.weaknesses.map((weakness, index) => (
              <li key={index}>
                <strong>{weakness.weakness}:</strong> {weakness.description}
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default SpeciesProfile;
