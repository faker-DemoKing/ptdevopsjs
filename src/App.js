import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/login';
import Layout from './layout';
import WebSSH from './pages/ssh';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Login} />
        {/* <Route path="/api/v1/host/ssh/:id" exact component={WebSSH} /> */}
        <Route component={Layout} />
      </Switch>
    );
  }
}

export default App;
