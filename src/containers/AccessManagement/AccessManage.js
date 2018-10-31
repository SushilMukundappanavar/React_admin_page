import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PrivilegesList from './ManagePrivileges/ManagePrivileges';
import ManageRoles from './ManageRoles/ManageRoles';
import ManageUsers from './ManageUsers/ManageUsers';

class AccessManagement extends Component {
  render() {
    return (
        <Switch>
          <Redirect exact path="/accessmanage" to="/accessmanage/privileges"/>
          <Route path='/accessmanage/privileges' component={PrivilegesList} />
          <Route path='/accessmanage/manageroles' component={ManageRoles} />
          <Route path='/accessmanage/manageusers' component={ManageUsers} />
          <Route component={PrivilegesList} />
        </Switch>
    );
  }
}

export default AccessManagement;
