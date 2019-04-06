import React, { Component } from "react";
import "./App.css";
import Form from './components/Form';
import { render } from "react-testing-library";

function App() {
  return (
    <div>
      <h1>Sjakkify</h1>
      <Form/>
    </div>
  );
}

export default App;
