import { api } from "./Service";

export const getSpecialties = () => {
  return fetch(`${api}/specialties`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // Returns the fetched specialties data
    })
    .catch((error) => {
      console.error("Error fetching all specialties:", error);
    });
};

export const getSpecialtiesByCharacterId = (characterId) => {
  return fetch(`${api}/specialties?characterId=${characterId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // Returns the fetched specialties data by character ID
    })
    .catch((error) => {
      console.error("Error fetching specialties by character ID:", error);
    });
};

export const postSpecialty = (specialtyObject) => {
  return fetch(`${api}/specialties`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(specialtyObject),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to post specialty. Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Specialty created successfully:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error posting specialty:", error);
    });
};

export const updateSpecialty = (specialtyObject) => {
  return fetch(`${api}/specialties/${specialtyObject.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(specialtyObject),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to update specialty. Status: ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("Specialty updated successfully:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error updating specialty:", error);
    });
};

export const deleteSpecialty = (specialtyId) => {
  return fetch(`${api}/specialties/${specialtyId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to delete specialty. Status: ${response.status}`
        );
      }
      console.log("Specialty deleted successfully.");
    })
    .catch((error) => {
      console.error("Error deleting specialty:", error);
    });
};
