import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Block from './components/Block';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={Block} />
      </div>
    );
  }
}

export default App;
