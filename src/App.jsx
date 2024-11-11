import "./App.css";

import { Routes, Route } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Authorized } from "./views/Authorized";
import React from "react";

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="*"
        element={
          //check if the user is authorized first
          <Authorized>
            {/* ApplicationViews is the child component of authorized */}
            <Login />
          </Authorized>
        }
      />
    </Routes>
  );
};
