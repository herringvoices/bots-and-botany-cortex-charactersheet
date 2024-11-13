export const api = "https://bots-and-botany-api-2sjax.ondigitalocean.app";

export const getSpecies = () => {
  return fetch(`${api}/species`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // This returns the fetched species data
    })
    .catch((error) => {
      console.error("Error fetching species:", error);
    });
};

export const getSpeciesSFX = () => {
  return fetch(`${api}/speciesSfx`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // This returns the fetched species data
    })
    .catch((error) => {
      console.error("Error fetching speciesSfx:", error);
    });
};

export const getSFX = () => {
  return fetch(`${api}/sfx`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // This returns the fetched sfx data
    })
    .catch((error) => {
      console.error("Error fetching sfx:", error);
    });
};

export const getValues = () => {
  return fetch(`${api}/values`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // This returns the fetched value data
    })
    .catch((error) => {
      console.error("Error fetching values:", error);
    });
};
