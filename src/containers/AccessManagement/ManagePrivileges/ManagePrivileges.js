import React, { Component } from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import 'react-table/react-table.css'
import ManageSubMenu from '../ManageSubMenu';
import PrivilegesList from './Update/ListPrivilege';

class ManagePrivileges extends Component {
    constructor(props){
        super(props);
        this.state = {
            // data: []
        }
    }

  render() {
    return (
        <div className="clearfix height-full">
            <ManageSubMenu />
            <Switch>
                <Route path='accessmanage/privileges' component={PrivilegesList} />
                <Route component={PrivilegesList} />
            </Switch>
        </div>
    );
  }
}

export default ManagePrivileges;
