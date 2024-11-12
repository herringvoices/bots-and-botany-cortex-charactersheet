import { Routes, Route, Outlet } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import { NavBar } from "../components/navbars/NavBar";
import { CharacterList } from "../components/characters/CharacterList";
import { CharacterSheet } from "../components/characters/CharacterSheet";
import { CharacterCreate } from "../components/characters/CharacterCreate";
import { Welcome } from "../components/welcome/Welcome";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localUser = localStorage.getItem("bnb_user");
    const localUserObject = JSON.parse(localUser);
    setCurrentUser(localUserObject);
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
            {/* Outlet will render the index route or other nested routes */}
          </>
        }
      >
        {/* Index route for the home page */}
        <Route index element={<Welcome />} />

        {/* Other nested routes */}
        <Route path="characters/view">
          <Route index element={<CharacterList currentUser={currentUser} />} />
          <Route
            path=":characterId"
            element={<CharacterSheet currentUser={currentUser} />}
          />
        </Route>
        <Route
          path="characters/create"
          element={<CharacterCreate currentUser={currentUser} />}
        />
        <Route
          path="orders/edit/:characterId"
          element={<CharacterCreate currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
