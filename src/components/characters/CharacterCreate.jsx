import React, { useEffect, useState } from "react";
import { Container, Row, Col, Navbar, Nav, Button } from "react-bootstrap";
import { NameSelect } from "./CharacterCreateComponents/NameSelect";
import { SpeciesSelect } from "./CharacterCreateComponents/SpeciesSelect";
import { BackgroundSelect } from "./CharacterCreateComponents/BackgroundSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CharacterCreate.css";
import "animate.css";
import { postCharacter, postKindredDistinction } from "../../services/Service";
import { useNavigate } from "react-router-dom";

export const CharacterCreate = ({ currentUser }) => {
  const [step, setStep] = useState(1);
  const [character, setCharacter] = useState({});
  const [kindredDistinction, setKindredDistinction] = useState({});
  const [ready, setReady] = useState(0);
  const navigate = useNavigate();
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
  }, [currentUser]);

  const handleSubmit = (character, kindredDistinction) => {
    const shallowCharacterCopy = { ...character };
    console.log(shallowCharacterCopy);

    postCharacter(shallowCharacterCopy)
      .then((characterResponse) => {
        // Update `characterId` in kindredDistinction with the new character's ID
        kindredDistinction.characterId = characterResponse.id;

        // Now post the updated kindredDistinction
        return postKindredDistinction(kindredDistinction);
      })
      .then(() => {
        // Navigate to characters/view after successful submission
        navigate("/characters/view");
      })
      .catch((error) => {
        console.error("Error during submission:", error);
      });
  };

  return (
    <>
      <Container as="main">
        <Row className="dark-container text-center mt-3 mb-5 p-3">
          {step === 1 ? (
            <NameSelect
              character={character}
              setCharacter={setCharacter}
              setReady={setReady}
            />
          ) : step === 2 ? (
            <>
              <h1>Species Selection</h1>
              <SpeciesSelect
                kindredDistinction={kindredDistinction}
                setKindredDistinction={setKindredDistinction}
                setReady={setReady}
              />
            </>
          ) : step === 3 ? (
            <BackgroundSelect
              kindredDistinction={kindredDistinction}
              setKindredDistinction={setKindredDistinction}
              setReady={setReady}
            />
          ) : (
            ""
          )}
        </Row>
      </Container>

      {/* NavBar along the bottom */}
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
          {ready === step && step < 3 ? (
            <Button className="custom-nav-button">
              <FontAwesomeIcon
                icon="fa-solid fa-circle-arrow-right"
                onClick={() => {
                  setStep((prev) => (prev += 1));
                }}
              />
            </Button>
          ) : ready === step && step === 3 ? (
            <Button
              className="custom-nav-button"
              onClick={() => handleSubmit(character, kindredDistinction)}
            >
              <FontAwesomeIcon icon="fa-solid fa-circle-check" />
            </Button>
          ) : (
            ""
          )}
        </Nav>
      </Navbar>
    </>
  );
};
