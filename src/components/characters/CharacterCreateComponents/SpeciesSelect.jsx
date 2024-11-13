import React, { useEffect, useState } from "react";
import { Col, Form, Image } from "react-bootstrap";
import {
  getSFX,
  getSpecies,
  getSpeciesSFX,
  getValues,
} from "../../../services/Service";

export const SpeciesSelect = ({
  kindredDistinction,
  setKindredDistinction,
  setReady,
}) => {
  const [species, setSpecies] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [sfx, setSfx] = useState([]);
  const [speciesSfx, setSpeciesSfx] = useState([]);
  const [selectedSpeciesSfx, setSelectedSpeciesSfx] = useState([]);
  const [values, setValues] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);

  // Fetch species once when the component mounts.
  useEffect(() => {
    getSpecies().then(setSpecies);
    getSFX().then(setSfx);
    getSpeciesSFX().then(setSpeciesSfx);
    getValues().then(setValues);
  }, []);

  // Fetch species once when the component mounts.
  useEffect(() => {
    setSelectedSpecies(
      species.find((item) => item.id === parseInt(kindredDistinction.speciesId))
    );
  }, [kindredDistinction, species]);

  useEffect(() => {
    if (speciesSfx) {
      const selectedSSFX = speciesSfx.filter(
        (item) => item?.speciesId === selectedSpecies?.id
      );
      const sfxOptions = sfx.filter((item) =>
        selectedSSFX.some((selected) => selected.sfxId === item.id)
      );

      setSelectedSpeciesSfx(sfxOptions);
    }
    if (values) {
      const foundValue = values.find(
        (item) => item.id === selectedSpecies?.valueId
      );
      setSelectedValue(foundValue);
    }
  }, [species, selectedSpecies, sfx, speciesSfx]);

  useEffect(() => {
    if (kindredDistinction.speciesId) {
      setReady(2);
    } else {
      setReady(1);
    }
  }, [kindredDistinction]);

  return (
    <>
      <Col md={{ span: 4 }} className="select-column">
        <div className="mt-3 mb-3">
          <Form>
            <Form.Group className="mb-3" controlId="formKindredSpecies">
              <Form.Label>Select Character Species</Form.Label>
              <Form.Select
                defaultValue={kindredDistinction.speciesId || ""}
                onChange={(evt) =>
                  setKindredDistinction({
                    ...kindredDistinction,
                    speciesId: evt.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Select a species
                </option>
                {species.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
          {selectedSpecies ? (
            <div className="mt-3 mb-3">
              <Image
                className="species-select-image"
                src={selectedSpecies.image}
                alt={`Image of ${selectedSpecies.name}`}
              />
              <h2 className="mt-3">{selectedSpecies.name}</h2>
            </div>
          ) : (
            ""
          )}
        </div>
      </Col>
      {selectedSpecies ? (
        <Col md={{ span: 4 }} className="select-column">
          <div className="mt-3 mb-3">
            <h2>Description</h2>
            <div>{selectedSpecies.description}</div>
          </div>
        </Col>
      ) : (
        ""
      )}
      {selectedSpecies ? (
        <Col md={{ span: 4 }} className="select-column">
          <div className="mt-3 mb-3">
            <h2>SFX</h2>
            <ul>
              {selectedSpeciesSfx.map((item) => (
                <li key={item.id}>
                  <b>{item.name}:</b> {item.description}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Value</h2>
            +1 {selectedValue?.name}
          </div>
        </Col>
      ) : (
        ""
      )}
    </>
  );
};
