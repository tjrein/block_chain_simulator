import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Block from './components/Block';
import BlockChain from './components/BlockChain';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={BlockChain} />
      </div>
    );
  }
}

export default App;
