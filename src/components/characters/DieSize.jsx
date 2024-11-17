import React from "react";
export const DieSize = ({ dieSize }) => {
  return (
    <div
      className={
        dieSize === 6 || dieSize === 4
          ? "square"
          : dieSize === 12
          ? "hexagon"
          : "diamond"
      }
    >
      <div>{dieSize}</div>
    </div>
  );
};
