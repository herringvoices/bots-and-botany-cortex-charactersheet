import React, { useEffect, useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import { SFXItem } from "./SFXItem";

export const SFXSelect = ({ characterSFX, setCharacterSFX, setReady }) => {
  const [unlockedSFX, setUnlockedSFX] = useState([]);
  const [lockedSFX, setLockedSFX] = useState([]);
  const [pointsAvailable, setPointsAvailable] = useState(2);

  // useEffect to filter characterSFX into locked and unlocked
  useEffect(() => {
    setUnlockedSFX(characterSFX.filter((item) => !item.locked));
    setLockedSFX(characterSFX.filter((item) => item.locked));
  }, [characterSFX]);

  // useEffect to calculate pointsAvailable
  useEffect(() => {
    const points = 2 - unlockedSFX.length;
    setPointsAvailable(points);
  }, [unlockedSFX]);

  // useEffect to set ready state based on pointsAvailable
  useEffect(() => {
    if (pointsAvailable === 0) {
      setReady(7);
    } else {
      setReady(8);
    }
  }, [pointsAvailable]);

  const toggleLockStatus = (sfxId) => {
    const updatedSFX = characterSFX.map((sfx) =>
      sfx.sfxId === sfxId ? { ...sfx, locked: !sfx.locked } : sfx
    );
    setCharacterSFX(updatedSFX);
  };

  return (
    <div>
      <div className="sfx-select-header text-center mb-3">
        <h4>Unlock two SFX from your available pool.</h4>
        <p>Points Available: {pointsAvailable}</p>
      </div>
      <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
        {/* Unlocked SFX */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>Unlocked SFX</Accordion.Header>
          <Accordion.Body className="text-center">
            {unlockedSFX.map((sfx) => (
              <SFXItem
                key={sfx.sfxId}
                sfx={sfx}
                locked={false}
                toggleLockStatus={() => toggleLockStatus(sfx.sfxId)}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>

        {/* Locked SFX */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Locked SFX</Accordion.Header>
          <Accordion.Body className="text-center">
            {lockedSFX.map((sfx) => (
              <SFXItem
                key={sfx.sfxId}
                sfx={sfx}
                locked={true}
                toggleLockStatus={() => toggleLockStatus(sfx.sfxId)}
                disabled={pointsAvailable === 0}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
