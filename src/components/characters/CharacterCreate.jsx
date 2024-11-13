import React, { useEffect, useState } from "react";
import { Container, Row, Col, Navbar, Nav, Button } from "react-bootstrap";
import { NameSelect } from "./CharacterCreateComponents/NameSelect";
import { SpeciesSelect } from "./CharacterCreateComponents/SpeciesSelect";
import { BackgroundSelect } from "./CharacterCreateComponents/BackgroundSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CharacterCreate.css";
import "animate.css";

export const CharacterCreate = ({ currentUser }) => {
  const [step, setStep] = useState(1);
  const [character, setCharacter] = useState({});
  const [kindredDistinction, setKindredDistinction] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  //useEffect for the initial render
  useEffect(() => {
    //Set the initial Character object
    setCharacter({
      userId: currentUser.id,
      name: "",
      pronouns: "",
      plotPoints: 0,
      description: "",
      image: "",
    });
    //Set the initial Kindred Distinction object
    setKindredDistinction({
      characterId: 0,
      speciesId: 0,
      backgroundId: 0,
      dieSize: 8,
    });
  }, []);

  useEffect(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 100); // Delay in milliseconds
  }, [step]);

  return (
    <>
      <Container as="main">
        <Row className="dark-container text-center mt-5">
          {step === 1 ? (
            <NameSelect character={character} setCharacter={setCharacter} />
          ) : step === 2 ? (
            <SpeciesSelect setKindredDistinction={setKindredDistinction} />
          ) : step === 3 ? (
            <BackgroundSelect setKindredDistinction={setKindredDistinction} />
          ) : (
            ""
          )}
        </Row>
      </Container>
      <Navbar fixed="bottom" className="justify-content-around bottom-navbar">
        <Nav>
          {step > 1 ? (
            <Button
              className="custom-nav-button"
              onClick={() => {
                setStep((prev) => (prev -= 1));
              }}
            >
              <FontAwesomeIcon icon="fa-solid fa-circle-arrow-left" />
            </Button>
          ) : (
            ""
          )}
        </Nav>
        <Nav>
          <Button className="custom-nav-button">
            <FontAwesomeIcon
              icon="fa-solid fa-circle-arrow-right"
              onClick={() => {
                setStep((prev) => (prev += 1));
              }}
            />
          </Button>
        </Nav>
      </Navbar>
    </>
  );
};
