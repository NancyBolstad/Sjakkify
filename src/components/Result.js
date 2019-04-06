import React, { Component } from "react";

const Result = () => (
    <select>
          <option value="" disabled selected>Choose your option</option>
            {
            ["Tap Spiller A","Uavgjort", "Seier Spiller A"].map(item => (
            <option value={item}>
              {item}
            </option>
          ))
            }
          </select>
  );

  export default Result;