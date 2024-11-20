import { api } from "./Service";

// GET: Fetch all stresses
export const getAllStresses = () => {
  return fetch(`${api}/stresses`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // Returns all stresses
    })
    .catch((error) => {
      console.error("Error fetching stresses:", error);
    });
};

// GET: Fetch all character stresses by characterId
export const getCharacterStressesByCharacterId = (characterId) => {
  return fetch(`${api}/characterStresses?characterId=${characterId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // Returns the fetched characterStresses data
    })
    .catch((error) => {
      console.error("Error fetching character stresses:", error);
    });
};

// POST: Add a new character stress
export const postCharacterStress = (characterStressObject) => {
  return fetch(`${api}/characterStresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(characterStressObject),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to post character stress. Status: ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("Character stress created successfully:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error posting character stress:", error);
    });
};

// PUT: Update an existing character stress
export const updateCharacterStress = (characterStressObject) => {
  return fetch(`${api}/characterStresses/${characterStressObject.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(characterStressObject),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to update character stress. Status: ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("Character stress updated successfully:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error updating character stress:", error);
    });
};
