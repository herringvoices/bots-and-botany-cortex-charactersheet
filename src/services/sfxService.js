import { api } from "./Service";

export const getExpandedSFX = () => {
  return fetch(
    `${api}/sfx?_embed=backgroundSfx&_embed=speciesSfx&_embed=jobSfx&_embed=adjectiveSfx&_embed=quirkSfx`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // This returns the fetched expanded SFX data
    })
    .catch((error) => {
      console.error("Error fetching expanded SFX:", error);
    });
};

export const postCharacterSFX = (characterSFXObject) => {
  return fetch(`${api}/characterSFX`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(characterSFXObject),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error posting character SFX:", error);
    });
};
