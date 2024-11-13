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

export const getBackground = () => {
  return fetch(`${api}/backgrounds`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // This returns the fetched backgrounds data
    })
    .catch((error) => {
      console.error("Error fetching backgrounds:", error);
    });
};

export const getBackgroundSFX = () => {
  return fetch(`${api}/backgroundSfx`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // This returns the fetched backgroundSFX data
    })
    .catch((error) => {
      console.error("Error fetching backgroundSfx:", error);
    });
};

export const postCharacter = (characterObject) => {
  return fetch(`${api}/characters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(characterObject),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error posting character:", error);
    });
};

export const postKindredDistinction = (kindredDistinctionObject) => {
  return fetch(`${api}/kindredDistinctions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(kindredDistinctionObject),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error posting kindred distinction:", error);
    });
};
