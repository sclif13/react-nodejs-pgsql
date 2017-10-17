import React, { Component } from 'react';
import Login from './Login';
import CheckPhone from './CheckPhone';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="Nav">
          <Login />
        </nav>
        <div className="App">
          <CheckPhone />
        </div>
      </div>
    );
  }
}

export default App;
