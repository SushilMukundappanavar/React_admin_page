import React, { Component } from 'react';
import ManageSubMenu from '../ManageSubMenu';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import 'react-table/react-table.css'

import UsersList from './Update/UserList';

class ManageUsers extends Component {

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
                <Route exact path='/accessmanage/manageusers' component={UsersList} />
            </Switch>
        </div>
    );
  }
}

export default ManageUsers;