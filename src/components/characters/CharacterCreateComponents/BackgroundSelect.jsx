import React, { useEffect, useState } from "react";
import { Col, Form, Image } from "react-bootstrap";
import {
  getSFX,
  getBackground,
  getBackgroundSFX,
  getValues,
} from "../../../services/Service";

export const BackgroundSelect = ({
  kindredDistinction,
  setKindredDistinction,
  setReady,
}) => {
  const [background, setBackground] = useState([]);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [sfx, setSfx] = useState([]);
  const [backgroundSfx, setBackgroundSfx] = useState([]);
  const [selectedBackgroundSfx, setSelectedBackgroundSfx] = useState([]);
  const [values, setValues] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);

  // Fetch background once when the component mounts.
  useEffect(() => {
    getBackground().then(setBackground);
    getSFX().then(setSfx);
    getBackgroundSFX().then(setBackgroundSfx);
    getValues().then(setValues);
  }, []);

  // Fetch background once when the component mounts.
  useEffect(() => {
    setSelectedBackground(
      background.find(
        (item) => item.id === parseInt(kindredDistinction.backgroundId)
      )
    );
  }, [kindredDistinction, background]);

  useEffect(() => {
    if (backgroundSfx) {
      const selectedSSFX = backgroundSfx.filter(
        (item) => item?.backgroundId === selectedBackground?.id
      );
      const sfxOptions = sfx.filter((item) =>
        selectedSSFX.some((selected) => selected.sfxId === item.id)
      );

      setSelectedBackgroundSfx(sfxOptions);
    }
    if (values) {
      const foundValue = values.find(
        (item) => item.id === selectedBackground?.valueId
      );
      setSelectedValue(foundValue);
    }
  }, [background, selectedBackground, sfx, backgroundSfx]);

  useEffect(() => {
    if (kindredDistinction.backgroundId) {
      setReady(3);
    } else {
      setReady(2);
    }
  }, [kindredDistinction]);

  return (
    <>
      <Col md={{ span: 4 }} className="select-column">
        <div className="mt-3 mb-3">
          <Form>
            <Form.Group className="mb-3" controlId="formKindredBackground">
              <Form.Label>Select Character Background</Form.Label>
              <Form.Select
                defaultValue={kindredDistinction.backgroundId || ""}
                onChange={(evt) =>
                  setKindredDistinction({
                    ...kindredDistinction,
                    backgroundId: evt.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Select a background
                </option>
                {background.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
          {selectedBackground ? (
            <div className="mt-3 mb-3">
              <Image
                className="background-select-image"
                src={selectedBackground.image}
                alt={`Image of ${selectedBackground.name}`}
              />
              <h2 className="mt-3">{selectedBackground.name}</h2>
            </div>
          ) : (
            ""
          )}
        </div>
      </Col>
      {selectedBackground ? (
        <Col md={{ span: 4 }} className="select-column">
          <div className="mt-3 mb-3">
            <h2>Description</h2>
            <div>{selectedBackground.description}</div>
          </div>
        </Col>
      ) : (
        ""
      )}
      {selectedBackground ? (
        <Col md={{ span: 4 }} className="select-column">
          <div className="mt-3 mb-3">
            <h2>SFX</h2>
            <ul>
              {selectedBackgroundSfx.map((item) => (
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
