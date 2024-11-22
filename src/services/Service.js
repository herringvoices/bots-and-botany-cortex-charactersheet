export const api = "https://bots-and-botany-api-2sjax.ondigitalocean.app";

/**
 * Species Services
 */
export const getSpecies = () => {
  return fetch(`${api}/species`).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
};

export const getSpeciesSFX = () => {
  return fetch(`${api}/speciesSfx`).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
};

/**
 * Background Services
 */
export const getBackground = () => {
  return fetch(`${api}/backgrounds`).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
};

export const getBackgroundSFX = () => {
  return fetch(`${api}/backgroundSfx`).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
};

/**
 * Kindred Distinction Services
 */
export const getKindredDistinctionByCharacterId = (characterId) => {
  return fetch(
    `${api}/kindredDistinctions?characterId=${characterId}&_expand=species&_expand=background`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
};

export const postKindredDistinction = (kindredDistinctionObject) => {
  return fetch(`${api}/kindredDistinctions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(kindredDistinctionObject),
  }).then((response) => response.json());
};

export const updateKindredDistinction = (kindredDistinction) => {
  return fetch(`${api}/kindredDistinctions/${kindredDistinction.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(kindredDistinction),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(
        `Failed to update kindredDistinction. Status: ${response.status}`
      );
    }
    return response.json();
  });
};

/**
 * Character Services
 */
export const getCharactersByUserId = (userId) => {
  return fetch(`${api}/characters?userId=${userId}`).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
};

export const getCharacterById = (id) => {
  return fetch(`${api}/characters/${id}`).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
};

export const postCharacter = (characterObject) => {
  return fetch(`${api}/characters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(characterObject),
  }).then((response) => response.json());
};

export const updateCharacter = (character) => {
  return fetch(`${api}/characters/${character.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(character),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to update character: ${response.statusText}`);
    }
    return response.json();
  });
};

export const deleteCharacter = (character) => {
  return fetch(`${api}/characters/${character.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to delete character. Status: ${response.status}`);
    }
    return response.json();
  });
};

/**
 * Adjective Services
 */
export const getAdjectives = () => {
  return fetch(`${api}/adjectives`).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
};

export const getAdjectiveSFX = () => {
  return fetch(`${api}/adjectiveSfx`).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
};

/**
 * Job Services
 */
export const getJobs = () => {
  return fetch(`${api}/jobs`).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
};

export const getJobSFX = () => {
  return fetch(`${api}/jobSfx`).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
};

/**
 * Other Services
 */
export const getSFX = () => {
  return fetch(`${api}/sfx`).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
};

export const getValues = () => {
  return fetch(`${api}/values`).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
};
