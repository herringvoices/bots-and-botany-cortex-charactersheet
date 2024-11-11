import { api } from "./Service";

export const getUserByUsername = (username) => {
  return fetch(`${api}/users?username=${username}`).then((res) => res.json());
};

export const createUser = (user) => {
  return fetch(`${api}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};
