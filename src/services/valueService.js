import { api } from "./Service";

export const getCharacterValuesByCharacterId = (characterId) => {
  return fetch(
    `${api}/characterValues?characterId=${characterId}&_expand=value`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // Returns the fetched characterValues data with expanded value
    })
    .catch((error) => {
      console.error("Error fetching characterValues:", error);
    });
};

export const updateCharacterValue = (characterValue) => {
  return fetch(`${api}/characterValues/${characterValue.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(characterValue),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to update characterValues. Status: ${response.status}`
        );
      }
      return response.json(); // Assuming API returns a response body
    })
    .then((data) => {
      console.log("CharacterValues updated successfully:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error updating characterValues:", error);
    });
};

export const deleteCharacterValue = (characterValueId) => {
  return fetch(`${api}/characterValues/${characterValueId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to delete characterValue. Status: ${response.status}`
        );
      }
      console.log("CharacterValue deleted successfully.");
    })
    .catch((error) => {
      console.error("Error deleting characterValue:", error);
    });
};

export const postCharacterValue = (characterValueObject) => {
  return fetch(`${api}/characterValues`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(characterValueObject),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to post character value. Status: ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("CharacterValue created successfully:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error posting character value:", error);
    });
};
