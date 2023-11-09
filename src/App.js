import React from 'react';
import logo from './logo.svg';
import './App.css';
import OnePost from './blogpost';

function App() {
  return (
    <div className="App">
      <OnePost slug={'hello'} />
    </div>
  );
}

export default App;
