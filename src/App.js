import React, { Component } from "react";
import "./App.css";
import PlayerSelector from './components/PlayerSelector';
import Result from './components/Result';
import { render } from "react-testing-library";

function App() {
  return (
    <div>
      <h1>Sjakkify</h1>
      <div >
        <h3>Spiller A: </h3>
      <PlayerSelector />
      </div>
      <div>
        <h3>Spiller B: </h3>
      <PlayerSelector/>
      </div>
      <div>
        <h3>Resultat:</h3>
        <Result/>
      </div>
    </div>
  );
}

export default App;
