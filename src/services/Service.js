export const api = "https://bots-and-botany-api-2sjax.ondigitalocean.app";

/**
 * Species Services
 */
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
      return data; // This returns the fetched species SFX data
    })
    .catch((error) => {
      console.error("Error fetching speciesSfx:", error);
    });
};

/**
 * Background Services
 */
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
      return data; // This returns the fetched background SFX data
    })
    .catch((error) => {
      console.error("Error fetching backgroundSfx:", error);
    });
};

/**
 * Kindred Distinction Services
 */
export const getKindredDistinctionByCharacterId = (characterId) => {
  return fetch(
    `${api}/kindredDistinctions?characterId=${characterId}&_expand=species&_expand=background`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // Returns the fetched kindredDistinctions data with species and background expanded
    })
    .catch((error) => {
      console.error("Error fetching kindredDistinctions:", error);
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

export const updateKindredDistinction = (kindredDistinction) => {
  return fetch(`${api}/kindredDistinctions/${kindredDistinction.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(kindredDistinction),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to update kindredDistinction. Status: ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("KindredDistinction updated successfully:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error updating kindredDistinction:", error);
    });
};

/**
 * Character Services
 */
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

export const getCharacterById = (id) => {
  return fetch(`${api}/characters/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // This returns the fetched character data
    })
    .catch((error) => {
      console.error("Error fetching character:", error);
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

export const updateCharacter = (character) => {
  return fetch(`${api}/characters/${character.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(character),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to update character: ${response.statusText}`);
      }
      return response.json();
    })
    .then((updatedCharacter) => {
      return updatedCharacter; // Return the updated character data
    })
    .catch((error) => {
      console.error("Error updating character:", error);
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
      return response.json();
    })
    .then((data) => {
      console.log("Character deleted successfully:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error deleting character:", error);
    });
};

/**
 * Adjective Services
 */
export const getAdjectives = () => {
  return fetch(`${api}/adjectives`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // This returns the fetched adjectives data
    })
    .catch((error) => {
      console.error("Error fetching adjectives:", error);
    });
};

export const getAdjectiveSFX = () => {
  return fetch(`${api}/adjectiveSfx`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // This returns the fetched adjective SFX data
    })
    .catch((error) => {
      console.error("Error fetching adjectiveSfx:", error);
    });
};

/**
 * Job Services
 */
export const getJobs = () => {
  return fetch(`${api}/jobs`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // This returns the fetched jobs data
    })
    .catch((error) => {
      console.error("Error fetching jobs:", error);
    });
};

export const getJobSFX = () => {
  return fetch(`${api}/jobSfx`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // This returns the fetched job SFX data
    })
    .catch((error) => {
      console.error("Error fetching jobSfx:", error);
    });
};

/**
 * Other Services
 */
export const getSFX = () => {
  return fetch(`${api}/sfx`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // This returns the fetched SFX data
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
      return data; // This returns the fetched values data
    })
    .catch((error) => {
      console.error("Error fetching values:", error);
    });
};

