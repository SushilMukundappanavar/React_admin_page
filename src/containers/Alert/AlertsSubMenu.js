import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';

class AlertsSubMenu extends Component {
  render() {
    return (
        <div className="submenus">
          <ul>
            <li><NavLink to="/alerts/managealerts" activeClassName="active"><i className="fas fa-user-secret icons-big"></i><span className="navtitle">Manage Alert</span></NavLink></li>
            {/* <li><NavLink to="/alerts/managealerts" activeClassName="active"><i className="fas fa-users icons-big"></i><span className="navtitle">Manage Alert</span></NavLink></li> */}
          </ul>
        </div>
    );
  }
}

export default AlertsSubMenu;
