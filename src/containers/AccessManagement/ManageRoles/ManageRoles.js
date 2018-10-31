import React, { Component } from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import 'react-table/react-table.css'
import ManageSubMenu from '../ManageSubMenu';
import RolesList from './Update/List';

class ManageRoles extends Component {
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
                <Route path='/accessmanage/manageroles' component={RolesList} />
            </Switch>
        </div>
    );
  }
}

export default ManageRoles;
