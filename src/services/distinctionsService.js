import { api } from "./Service";

export const getVocationDistinctionByCharacterId = (characterId) => {
  return fetch(
    `${api}/vocationDistinctions?characterId=${characterId}&_expand=job&_expand=adjective`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // Returns the fetched vocationDistinctions data with vocation and background expanded
    })
    .catch((error) => {
      console.error("Error fetching vocationDistinctions:", error);
    });
};

export const updateVocationDistinction = (vocationDistinction) => {
  return fetch(`${api}/vocationDistinctions/${vocationDistinction.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vocationDistinction),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to update vocationDistinction. Status: ${response.status}`
        );
      }
      return response.json(); // Assuming API returns a response body
    })
    .then((data) => {
      console.log("VocationDistinction updated successfully:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error updating vocationDistinction:", error);
    });
};

export const postVocationDistinction = (vocationDistinctionObject) => {
  return fetch(`${api}/vocationDistinctions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vocationDistinctionObject),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to post vocation distinction. Status: ${response.status}`
        );
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error posting vocation distinction:", error);
    });
};

export const getQuirkDistinctionByCharacterId = (characterId) => {
  return fetch(
    `${api}/quirkDistinctions?characterId=${characterId}&_expand=quirk`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // Returns the fetched quirkDistinctions data with quirk and background expanded
    })
    .catch((error) => {
      console.error("Error fetching quirkDistinctions:", error);
    });
};

export const updateQuirkDistinction = (quirkDistinction) => {
  return fetch(`${api}/quirkDistinctions/${quirkDistinction.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quirkDistinction),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to update quirkDistinction. Status: ${response.status}`
        );
      }
      return response.json(); // Assuming API returns a response body
    })
    .then((data) => {
      console.log("QuirkDistinction updated successfully:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error updating quirkDistinction:", error);
    });
};

export const postQuirkDistinction = (quirkDistinctionObject) => {
  return fetch(`${api}/quirkDistinctions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quirkDistinctionObject),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to post quirk distinction. Status: ${response.status}`
        );
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error posting quirk distinction:", error);
    });
};

export const getQuirkSFX = () => {
  return fetch(`${api}/quirkSfx`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // This returns the fetched quirk SFX data
    })
    .catch((error) => {
      console.error("Error fetching quirkSfx:", error);
    });
};

export const getQuirks = () => {
  return fetch(`${api}/quirks`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // This returns the fetched quirks data
    })
    .catch((error) => {
      console.error("Error fetching quirks:", error);
    });
};

