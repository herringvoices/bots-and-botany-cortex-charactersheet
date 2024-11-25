import { Navigate, useLocation } from "react-router-dom";
import React, { useContext } from "react";
import { UserContext } from "./UserContext"; // Import the context to access user state

export const Authorized = ({ children }) => {
  let location = useLocation();
  const { user } = useContext(UserContext); // Access the logged-in user from UserContext

  // If the user is logged in, render the child components
  if (user) {
    return children;
  }

  // If the user is NOT logged in, redirect them to the login page
  else {
    return <Navigate to={`/login`} state={{ from: location }} replace />;
  }
};
