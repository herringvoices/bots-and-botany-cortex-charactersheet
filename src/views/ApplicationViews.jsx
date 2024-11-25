import { Routes, Route, Outlet } from "react-router-dom";
import React, { useContext } from "react";
import { NavBar } from "../components/navbars/NavBar";
import { CharacterList } from "../components/characters/CharacterList";
import { CharacterSheet } from "../components/characters/CharacterSheet";
import { CharacterCreate } from "../components/characters/CharacterCreate";
import { Welcome } from "../components/welcome/Welcome";
import RulesPage from "../components/rules/GameRules";
import TechnologyPage from "../components/rules/TechnologyInfo";
import SpeciesPage from "../components/species/SpeciesPage"; // Import the SpeciesPage component
import { UserContext } from "./UserContext"; // Import UserContext for global user state

export const ApplicationViews = () => {
  const { user } = useContext(UserContext); // Access user state from UserContext

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
          <Route index element={<CharacterList currentUser={user} />} />
          <Route
            path=":characterId"
            element={<CharacterSheet currentUser={user} />}
          />
        </Route>
        <Route
          path="characters/create"
          element={<CharacterCreate currentUser={user} />}
        />
        <Route
          path="characters/edit/:characterId"
          element={<CharacterCreate currentUser={user} />}
        />

        {/* Rules page route */}
        <Route path="rules" element={<RulesPage />} />

        {/* Technology page route */}
        <Route path="technology" element={<TechnologyPage />} />

        {/* Species routes */}
        <Route path="species/:speciesName" element={<SpeciesPage />} />
      </Route>
    </Routes>
  );
};
