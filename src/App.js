import React, { Component } from 'react';
// import { render } from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Login from './containers/Login';
import Home from './containers/Home';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch> 
          <Route exact path='/' component={Login} />
          <Route path='/'  component={Home} />
        </Switch> 
      </Router>
    );
  }
}

export default App;
