import React from "react";
import { useParams } from "react-router-dom";
import SpeciesInfo from "./SpeciesInfo"; // Import the SpeciesInfo component

const SpeciesPage = () => {
  const { speciesName } = useParams();

  return <SpeciesInfo species={speciesName} />;
};

export default SpeciesPage;
