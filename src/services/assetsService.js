import { api } from "./Service";

export const getAssets = () => {
  return fetch(`${api}/assets`).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
};

export const getAssetsByCharacterId = (characterId) => {
  return fetch(`${api}/assets?characterId=${characterId}`).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
};

export const postAsset = (assetObject) => {
  return fetch(`${api}/assets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(assetObject),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to post asset. Status: ${response.status}`);
    }
    return response.json();
  });
};

export const updateAsset = (assetObject) => {
  return fetch(`${api}/assets/${assetObject.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(assetObject),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to update asset. Status: ${response.status}`);
    }
    return response.json();
  });
};

export const deleteAsset = (assetId) => {
  return fetch(`${api}/assets/${assetId}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to delete asset. Status: ${response.status}`);
    }
  });
};
