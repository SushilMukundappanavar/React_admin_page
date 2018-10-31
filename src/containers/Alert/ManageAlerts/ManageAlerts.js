import React, { Component } from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import 'react-table/react-table.css'
import AlertsSubMenu from '../AlertsSubMenu';
import ManageAlertsList from './Update/ManageAlertsList';

class ManageAlerts extends Component {
    constructor(props){
        super(props);
        this.state = {
            // data: []
        }
    }
    
  render() {
    return (
        <div className="clearfix height-full">
            <AlertsSubMenu />
            <Switch>
                <Route path='alerts/managealerts' component={ManageAlertsList} />
                <Route component={ManageAlertsList} />
            </Switch>
        </div>
    );
  }
}

export default ManageAlerts;
