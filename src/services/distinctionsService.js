import { api } from "./Service";

export const getVocationDistinctionByCharacterId = (characterId) => {
  return fetch(
    `${api}/vocationDistinctions?characterId=${characterId}&_expand=job&_expand=adjective`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
};

export const updateVocationDistinction = (vocationDistinction) => {
  return fetch(`${api}/vocationDistinctions/${vocationDistinction.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vocationDistinction),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(
        `Failed to update vocationDistinction. Status: ${response.status}`
      );
    }
    return response.json(); // Assuming API returns a response body
  });
};

export const postVocationDistinction = (vocationDistinctionObject) => {
  return fetch(`${api}/vocationDistinctions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vocationDistinctionObject),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(
        `Failed to post vocation distinction. Status: ${response.status}`
      );
    }
    return response.json();
  });
};

export const getQuirkDistinctionByCharacterId = (characterId) => {
  return fetch(
    `${api}/quirkDistinctions?characterId=${characterId}&_expand=quirk`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
};

export const updateQuirkDistinction = (quirkDistinction) => {
  return fetch(`${api}/quirkDistinctions/${quirkDistinction.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quirkDistinction),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(
        `Failed to update quirkDistinction. Status: ${response.status}`
      );
    }
    return response.json(); // Assuming API returns a response body
  });
};

export const postQuirkDistinction = (quirkDistinctionObject) => {
  return fetch(`${api}/quirkDistinctions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quirkDistinctionObject),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(
        `Failed to post quirk distinction. Status: ${response.status}`
      );
    }
    return response.json();
  });
};

export const getQuirkSFX = () => {
  return fetch(`${api}/quirkSfx`).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
};

export const getQuirks = () => {
  return fetch(`${api}/quirks`).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
};
