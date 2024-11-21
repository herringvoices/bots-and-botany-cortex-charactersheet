import { api } from "./Service";

export const getAssets = () => {
  return fetch(`${api}/assets`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // Returns the fetched assets data
    })
    .catch((error) => {
      console.error("Error fetching all assets:", error);
    });
};

export const getAssetsByCharacterId = (characterId) => {
  return fetch(`${api}/assets?characterId=${characterId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // Returns the fetched assets data by character ID
    })
    .catch((error) => {
      console.error("Error fetching assets by character ID:", error);
    });
};

export const postAsset = (assetObject) => {
  return fetch(`${api}/assets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(assetObject),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to post asset. Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Asset created successfully:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error posting asset:", error);
    });
};

export const updateAsset = (assetObject) => {
  return fetch(`${api}/assets/${assetObject.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(assetObject),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to update asset. Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Asset updated successfully:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error updating asset:", error);
    });
};

export const deleteAsset = (assetId) => {
  return fetch(`${api}/assets/${assetId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to delete asset. Status: ${response.status}`);
      }
      console.log("Asset deleted successfully.");
    })
    .catch((error) => {
      console.error("Error deleting asset:", error);
    });
};
