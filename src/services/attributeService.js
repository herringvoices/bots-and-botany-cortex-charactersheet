import { api } from "./Service";

export const getAttributes = () => {
  return fetch(`${api}/attributes`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // This returns the fetched attributes data
    })
    .catch((error) => {
      console.error("Error fetching attributes:", error);
    });
};

export const getCharacterAttributesByCharacterId = (characterId) => {
  return fetch(
    `${api}/characterAttributes?characterId=${characterId}&_expand=attribute`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // Returns the fetched characterAttributes data with expanded attribute
    })
    .catch((error) => {
      console.error("Error fetching characterAttributes:", error);
    });
};

export const updateCharacterAttributes = (characterAttribute) => {
  return fetch(`${api}/characterAttributes/${characterAttribute.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(characterAttribute),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to update characterAttributes. Status: ${response.status}`
        );
      }
      return response.json(); // Assuming API returns a response body
    })
    .then((data) => {
      console.log("CharacterAttributes updated successfully:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error updating characterAttributes:", error);
    });
};

export const deleteCharacterAttributes = (characterAttributeId) => {
  return fetch(`${api}/characterAttributes/${characterAttributeId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to delete characterAttributes. Status: ${response.status}`
        );
      }
      console.log("CharacterAttributes deleted successfully.");
    })
    .catch((error) => {
      console.error("Error deleting characterAttributes:", error);
    });
};

export const postCharacterAttribute = (characterAttributeObject) => {
  return fetch(`${api}/characterAttributes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(characterAttributeObject),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to post character attribute. Status: ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("CharacterAttribute created successfully:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error posting character attribute:", error);
    });
};
