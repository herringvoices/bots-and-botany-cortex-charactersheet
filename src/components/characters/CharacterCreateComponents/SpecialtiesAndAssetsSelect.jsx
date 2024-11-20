import React, { useState } from "react";
import { Button, Row } from "react-bootstrap";
import { SpecialtyAndAssetItem } from "./SpecialtyAndAssetItem";

export const SpecialtiesAndAssetsSelect = ({
  array,
  setter,
  title,
  pointsLeft,
}) => {
  // State to keep track of the next unique ID to be assigned
  const [nextId, setNextId] = useState(array.length + 1);

  // Handler to add a new item to the array (works for both specialties and assets)
  const handleAddItem = () => {
    const newItem = {
      id: nextId, // Assign a unique incrementing ID
      name: "Enter name here",
      dieSize: 4, // Default starting value
    };
    setter((prev) => [...prev, newItem]);
    setNextId((prevId) => prevId + 1); // Increment the next ID value
  };

  return (
    <div className="specialties-and-assets-container">
      <h3>{title}</h3>
      <Row>
        {array.map((item) => (
          <SpecialtyAndAssetItem
            key={item.id}
            item={item}
            setter={setter}
            sheet={false} // Assuming default is false, can be made dynamic if needed
            pointsLeft={pointsLeft}
          />
        ))}
      </Row>
      <Button className="mt-3" onClick={handleAddItem} disabled={!pointsLeft}>
        Add to {title}
      </Button>
    </div>
  );
};
