import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ManageAlerts from './ManageAlerts/ManageAlerts';

class Alerts extends Component {
  render() {
    return (
        <Switch>
          <Redirect exact path="/alerts" to="/alerts/managealerts"/>
          <Route path='/alerts/managealerts' component={ManageAlerts} />
          {/* <Route path='/accessmanage/manageroles' component={ManageRoles} /> */}
          <Route component={ManageAlerts} />
        </Switch>
    );
  }
}

export default Alerts;

