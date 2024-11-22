import { Routes, Route, Outlet } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import { NavBar } from "../components/navbars/NavBar";
import { CharacterList } from "../components/characters/CharacterList";
import { CharacterSheet } from "../components/characters/CharacterSheet";
import { CharacterCreate } from "../components/characters/CharacterCreate";
import { Welcome } from "../components/welcome/Welcome";
import RulesPage from "../components/rules/GameRules";

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
          </>
        }
      >
        {/* Index route for the home page */}
        <Route index element={<Welcome />} />

        {/* Characters routes */}
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
          path="characters/edit/:characterId"
          element={<CharacterCreate currentUser={currentUser} />}
        />

        {/* Rules page route */}
        <Route path="rules" element={<RulesPage />} />
      </Route>
    </Routes>
  );
};
