import React, { useEffect, useState } from "react";
import { Container, Row, Navbar, Nav, Button } from "react-bootstrap";
import { NameSelect } from "./CharacterCreateComponents/NameSelect";
import { SpeciesSelect } from "./CharacterCreateComponents/SpeciesSelect";
import { BackgroundSelect } from "./CharacterCreateComponents/BackgroundSelect";
import { VocationSelect } from "./CharacterCreateComponents/VocationSelect";
import { AttributeSelect } from "./CharacterCreateComponents/AttributeSelect";
import { ValueSelect } from "./CharacterCreateComponents/ValueSelect";
import { SFXSelect } from "./CharacterCreateComponents/SFXSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CharacterCreate.scss";
import "animate.css";
import {
  getValues,
  postCharacter,
  postKindredDistinction,
} from "../../services/Service";

import {
  postVocationDistinction,
  postQuirkDistinction,
} from "../../services/distinctionsService";
import { useNavigate } from "react-router-dom";
import {
  getAttributes,
  postCharacterAttribute,
} from "../../services/attributeService";
import { postCharacterValue } from "../../services/valueService";
import { getExpandedSFX, postCharacterSFX } from "../../services/sfxService";
import {
  getSpecialties,
  postSpecialty,
} from "../../services/specialtiesService";
import { getAssets, postAsset } from "../../services/assetsService";
import { SpecialtiesAndAssetsSelect } from "./CharacterCreateComponents/SpecialtiesAndAssetsSelect";
import { postCharacterStress } from "../../services/stressService";

export const CharacterCreate = ({ currentUser }) => {
  const [step, setStep] = useState(1);
  const [character, setCharacter] = useState({});
  const [kindredDistinction, setKindredDistinction] = useState({});
  const [vocationDistinction, setVocationDistinction] = useState({});
  const [quirkDistinction, setQuirkDistinction] = useState({});
  const [characterAttributes, setCharacterAttributes] = useState([]);
  const [characterValues, setCharacterValues] = useState([]); // State for values
  const [characterSFX, setCharacterSFX] = useState([]);
  const [expandedSFX, setExpandedSFX] = useState([]); // state for expanded SFX
  const [ready, setReady] = useState(0);
  const navigate = useNavigate();
  const [values, setValues] = useState([]);
  const [modifiedValues, setModifiedValues] = useState([]);
  const [attributePoints, setAttributePoints] = useState(11);
  const [valuePointsAvailable, setValuePointsAvailable] = useState(4);
  const [valuePointsSpent, setValuePointsSpent] = useState([]);
  const [specialties, setSpecialties] = useState([]); // state for specialties
  const [assets, setAssets] = useState([]); // state for assets
  const [specialtyAndAssetPoints, setSpecialtyAndAssetPoints] = useState(5); // Points for specialties and assets

  // Initialize state on first render
  useEffect(() => {
    const initializeCharacterState = () => {
      setCharacter((prev) =>
        Object.keys(prev).length === 0
          ? {
              userId: currentUser.id,
              name: "",
              pronouns: "",
              plotPoints: 0,
              description: "",
              image: "",
            }
          : prev
      );

      setKindredDistinction((prev) =>
        Object.keys(prev).length === 0
          ? {
              characterId: 0,
              speciesId: 0,
              backgroundId: 0,
              dieSize: 8,
            }
          : prev
      );

      setVocationDistinction((prev) =>
        Object.keys(prev).length === 0
          ? {
              characterId: 0,
              adjectiveId: 0,
              jobId: 0,
              dieSize: 8,
            }
          : prev
      );

      setQuirkDistinction((prev) =>
        Object.keys(prev).length === 0
          ? {
              characterId: 0,
              quirkId: 0,
              dieSize: 8,
            }
          : prev
      );
    };

    const initializeValues = async () => {
      try {
        const values = await getValues();
        setValues(values);

        const initialPointsSpent = values.map((value) => ({
          valueId: value.id,
          pointsSpent: 0,
        }));
        setValuePointsSpent(initialPointsSpent);

        // Initialize characterValues with valueId, characterId, and dieSize
        const initializedValues = values.map((value) => ({
          valueId: value.id,
          characterId: currentUser.id,
          dieSize: 4,
        }));
        setCharacterValues(initializedValues);

        const newValues = Array.from({ length: 5 }, (_, i) => ({
          id: i + 1,
          characterId: currentUser.id,
          valueId: 0,
        }));
        setModifiedValues(newValues);
      } catch (error) {
        console.error("Error fetching values:", error);
      }
    };

    const initializeAttributes = async () => {
      try {
        const attributes = await getAttributes();
        const initializedAttributes = attributes.map((attr) => ({
          ...attr,
          characterId: 0,
          dieSize: 4,
        }));
        setCharacterAttributes(initializedAttributes);
      } catch (error) {
        console.error("Error fetching attributes:", error);
      }
    };

    const initializeExpandedSFX = async () => {
      try {
        const sfxData = await getExpandedSFX();
        setExpandedSFX(sfxData);
      } catch (error) {
        console.error("Error fetching expanded SFX:", error);
      }
    };

    const initializeSpecialtiesAndAssets = async () => {
      setSpecialties([]);
      setAssets([]);
      setSpecialtyAndAssetPoints(5);

      try {
        const fetchedSpecialties = await getSpecialties();
        setSpecialties(fetchedSpecialties);
      } catch (error) {
        console.error("Error fetching specialties:", error);
      }

      try {
        const fetchedAssets = await getAssets();
        setAssets(fetchedAssets);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    initializeCharacterState();
    initializeValues();
    initializeAttributes();
    initializeExpandedSFX();
    initializeSpecialtiesAndAssets();
  }, [currentUser]);

  const populateCharacterSFX = (kindred, vocation, quirk) => {
    let updatedCharacterSFX = [];

    expandedSFX.forEach((sfx) => {
      // Use .some() to check for a matching speciesId
      if (
        sfx.speciesSfx?.some(
          (speciesSfx) => speciesSfx.speciesId === kindred?.speciesId
        )
      ) {
        updatedCharacterSFX.push({
          characterId: 0, // Update accordingly if needed
          sfxId: sfx.id,
          name: sfx.name,
          description: sfx.description,
          locked: true,
        });
      }

      // Use .some() to check for a matching backgroundId
      if (
        sfx.backgroundSfx?.some(
          (backgroundSfx) =>
            backgroundSfx.backgroundId === kindred?.backgroundId
        )
      ) {
        updatedCharacterSFX.push({
          characterId: 0,
          sfxId: sfx.id,
          name: sfx.name,
          description: sfx.description,
          locked: true,
        });
      }

      // Use .some() to check for a matching jobId
      if (sfx.jobSfx?.some((jobSfx) => jobSfx.jobId === vocation?.jobId)) {
        updatedCharacterSFX.push({
          characterId: 0,
          sfxId: sfx.id,
          name: sfx.name,
          description: sfx.description,
          locked: true,
        });
      }

      // Use .some() to check for a matching adjectiveId
      if (
        sfx.adjectiveSfx?.some(
          (adjectiveSfx) => adjectiveSfx.adjectiveId === vocation?.adjectiveId
        )
      ) {
        updatedCharacterSFX.push({
          characterId: 0,
          sfxId: sfx.id,
          name: sfx.name,
          description: sfx.description,
          locked: true,
        });
      }

      // Use .some() to check for a matching quirkId
      if (
        sfx.quirkSfx?.some((quirkSfx) => quirkSfx.quirkId === quirk?.quirkId)
      ) {
        updatedCharacterSFX.push({
          characterId: 0,
          sfxId: sfx.id,
          name: sfx.name,
          description: sfx.description,
          locked: true,
        });
      }
    });

    setCharacterSFX(updatedCharacterSFX);
  };

  useEffect(() => {
    if (expandedSFX.length > 0) {
      populateCharacterSFX(
        kindredDistinction,
        vocationDistinction,
        quirkDistinction
      );
    }
  }, [expandedSFX]);

  const handleSubmit = (
    character,
    kindredDistinction,
    vocationDistinction,
    quirkDistinction,
    characterAttributes,
    characterValues,
    characterSFX,
    assets,
    specialties
  ) => {
    const shallowCharacterCopy = { ...character };

    // Step 1: Post character
    postCharacter(shallowCharacterCopy)
      .then((characterResponse) => {
        // Step 2: Update characterId in distinctions and attributes
        const updatedAttributes = characterAttributes.map((attr) => ({
          characterId: characterResponse.id,
          attributeId: attr.id,
          dieSize: attr.dieSize,
        }));
        setCharacterAttributes(updatedAttributes);

        kindredDistinction.characterId = characterResponse.id;
        vocationDistinction.characterId = characterResponse.id;
        quirkDistinction.characterId = characterResponse.id;

        // Update characterId in characterValues
        const updatedCharacterValues = characterValues.map((value) => ({
          characterId: characterResponse.id,
          dieSize: value.dieSize,
          valueId: value.id,
          description: "", // Default to an empty string
        }));

        // Update characterId in characterSFX
        const updatedCharacterSFX = characterSFX.map((sfx) => ({
          ...sfx,
          characterId: characterResponse.id,
        }));

        // Step 3: Update characterId in assets
        const updatedAssets = assets.map((asset) => ({
          characterId: characterResponse.id,
          name: asset.name,
          dieSize: asset.dieSize,
        }));

        // Step 4: Update characterId in specialties
        const updatedSpecialties = specialties.map((specialty) => ({
          characterId: characterResponse.id,
          name: specialty.name,
          dieSize: specialty.dieSize,
        }));

        // Step 5: Prepare six characterStresses to post (stressId: 1-6)
        const characterStresses = [];
        for (let i = 1; i < 7; i++) {
          characterStresses.push({
            characterId: characterResponse.id,
            stressId: i,
            dieSize: 0,
          });
        }

        // Step 6: Add the Hinder SFX to characterSFX
        const hinderSFX = {
          characterId: characterResponse.id,
          sfxId: 101,
          name: "Hinder",
          description:
            "Gain a PP when you step a distinction down to a d4 for an action.",
          locked: false,
        };

        // Step 7: Post all distinctions, attributes, characterValues, characterSFX, assets, specialties, and stresses concurrently
        return Promise.all([
          postKindredDistinction(kindredDistinction),
          postVocationDistinction(vocationDistinction),
          postQuirkDistinction(quirkDistinction),
          ...updatedAttributes.map((attr) => postCharacterAttribute(attr)),
          ...updatedCharacterValues.map((value) => postCharacterValue(value)),
          ...updatedCharacterSFX.map((sfx) => postCharacterSFX(sfx)),
          postCharacterSFX(hinderSFX),
          ...updatedAssets.map((asset) => postAsset(asset)),
          ...updatedSpecialties.map((specialty) => postSpecialty(specialty)),
          ...characterStresses.map((stress) => postCharacterStress(stress)), // Posting 6 stress objects
        ]);
      })
      .then(() => {
        // Step 8: Navigate to the character view page
        navigate("/characters/view");
      })
      .catch((error) => {
        console.error("Error during submission:", error);
      });
  };

  useEffect(() => {
    const calculateSpecialtyAndAssetPoints = () => {
      // Calculate the total die size for specialties
      const totalSpecialtyDieSize = specialties.reduce(
        (sum, item) => sum + item.dieSize,
        0
      );

      // Calculate the total die size for assets
      const totalAssetDieSize = assets.reduce(
        (sum, item) => sum + item.dieSize,
        0
      );

      // Calculate the total number of specialties and assets
      const totalLength = specialties.length + assets.length;

      // Calculate points spent
      const pointsSpent =
        (totalSpecialtyDieSize + totalAssetDieSize - 2 * totalLength) / 2;

      // Calculate points available
      const pointsAvailable = 8 - pointsSpent;

      // Set the available points in the state
      setSpecialtyAndAssetPoints(pointsAvailable);
    };

    calculateSpecialtyAndAssetPoints();
  }, [specialties, assets]);

  {
    /* useEffect to update 'setReady' when 'specialtyAndAssetPoints' changes */
  }
  {
    useEffect(() => {
      if (specialtyAndAssetPoints === 0) {
        setReady(8);
      } else {
        setReady(7);
      }
    }, [specialtyAndAssetPoints, setReady]);
  }

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
            <SpeciesSelect
              setCharacter={setCharacter}
              kindredDistinction={kindredDistinction}
              setKindredDistinction={(updatedDistinction) => {
                setKindredDistinction(updatedDistinction);
                populateCharacterSFX(
                  updatedDistinction,
                  vocationDistinction,
                  quirkDistinction
                );
              }}
              setModifiedValues={setModifiedValues}
              setReady={setReady}
            />
          ) : step === 3 ? (
            <BackgroundSelect
              kindredDistinction={kindredDistinction}
              setKindredDistinction={(updatedDistinction) => {
                setKindredDistinction(updatedDistinction);
                populateCharacterSFX(
                  updatedDistinction,
                  vocationDistinction,
                  quirkDistinction
                );
              }}
              setReady={setReady}
              values={values}
              setModifiedValues={setModifiedValues}
            />
          ) : step === 4 ? (
            <VocationSelect
              vocationDistinction={vocationDistinction}
              setVocationDistinction={(updatedDistinction) => {
                setVocationDistinction(updatedDistinction);
                populateCharacterSFX(
                  kindredDistinction,
                  updatedDistinction,
                  quirkDistinction
                );
              }}
              quirkDistinction={quirkDistinction}
              setQuirkDistinction={(updatedDistinction) => {
                setQuirkDistinction(updatedDistinction);
                populateCharacterSFX(
                  kindredDistinction,
                  vocationDistinction,
                  updatedDistinction
                );
              }}
              setReady={setReady}
              values={values}
              setModifiedValues={setModifiedValues}
            />
          ) : step === 5 ? (
            <AttributeSelect
              characterAttributes={characterAttributes}
              setCharacterAttributes={setCharacterAttributes}
              setReady={setReady}
              pointsAvailable={attributePoints}
              setPointsAvailable={setAttributePoints}
            />
          ) : step === 6 ? (
            <ValueSelect
              values={values}
              modifiedValues={modifiedValues}
              characterValues={characterValues}
              setCharacterValues={setCharacterValues}
              setReady={setReady}
              pointsAvailable={valuePointsAvailable}
              setPointsAvailable={setValuePointsAvailable}
              pointsSpent={valuePointsSpent}
              setPointsSpent={setValuePointsSpent}
            />
          ) : step === 7 ? (
            <SFXSelect
              characterSFX={characterSFX}
              setCharacterSFX={setCharacterSFX}
              setReady={setReady}
            />
          ) : step === 8 ? (
            <>
              <h2>Select your Specialties and Assets!</h2>
              <p>Points Available: {specialtyAndAssetPoints}</p>
              <SpecialtiesAndAssetsSelect
                array={specialties}
                setter={setSpecialties}
                pointsLeft={specialtyAndAssetPoints}
                title="Specialties"
              />
              <SpecialtiesAndAssetsSelect
                array={assets}
                setter={setAssets}
                pointsLeft={specialtyAndAssetPoints}
                title="Assets"
              />
            </>
          ) : null}
        </Row>
      </Container>

      {/* Navigation Bar */}
      <Navbar fixed="bottom" className="justify-content-around bottom-navbar">
        <Nav>
          {step > 1 ? (
            <Button
              className="custom-nav-button"
              onClick={() => setStep((prev) => prev - 1)}
            >
              <FontAwesomeIcon icon="fa-solid fa-circle-arrow-left" />
            </Button>
          ) : null}
        </Nav>
        <Nav>
          {ready === step && step < 8 ? (
            <Button
              className="custom-nav-button"
              onClick={() => setStep((prev) => prev + 1)}
            >
              <FontAwesomeIcon icon="fa-solid fa-circle-arrow-right" />
            </Button>
          ) : ready === step && step === 8 ? (
            <Button
              className="custom-nav-button"
              onClick={() =>
                handleSubmit(
                  character,
                  kindredDistinction,
                  vocationDistinction,
                  quirkDistinction,
                  characterAttributes,
                  characterValues,
                  characterSFX,
                  assets,
                  specialties
                )
              }
            >
              <FontAwesomeIcon icon="fa-solid fa-circle-check" />
            </Button>
          ) : null}
        </Nav>
      </Navbar>
    </>
  );
};
