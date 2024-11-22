import { api } from "./Service";

export const getAttributes = () => {
  return fetch(`${api}/attributes`).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
};

export const getCharacterAttributesByCharacterId = (characterId) => {
  return fetch(
    `${api}/characterAttributes?characterId=${characterId}&_expand=attribute`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
};

export const updateCharacterAttributes = (characterAttribute) => {
  return fetch(`${api}/characterAttributes/${characterAttribute.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(characterAttribute),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(
        `Failed to update characterAttributes. Status: ${response.status}`
      );
    }
    return response.json(); // Assuming API returns a response body
  });
};

export const deleteCharacterAttributes = (characterAttributeId) => {
  return fetch(`${api}/characterAttributes/${characterAttributeId}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error(
        `Failed to delete characterAttributes. Status: ${response.status}`
      );
    }
  });
};

export const postCharacterAttribute = (characterAttributeObject) => {
  return fetch(`${api}/characterAttributes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(characterAttributeObject),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(
        `Failed to post character attribute. Status: ${response.status}`
      );
    }
    return response.json();
  });
};
