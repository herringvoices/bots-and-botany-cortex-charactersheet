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

export const getCharactersByUserId = (userId) => {
  return fetch(`${api}/characters?userId=${userId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // This returns the fetched characters data for the specified userId
    })
    .catch((error) => {
      console.error("Error fetching characters:", error);
    });
};

export const deleteCharacter = (character) => {
  return fetch(`${api}/characters/${character.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to delete character. Status: ${response.status}`
        );
      }
      return response.json(); // Assuming the API returns a response body; if not, remove this line
    })
    .then((data) => {
      console.log("Character deleted successfully:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error deleting character:", error);
    });
};
