import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';

class ManageSubMenu extends Component {
  render() {
    return (
        <div className="submenus">
          <ul>
            <li><NavLink to="/accessmanage/privileges" activeClassName="active"><i className="fas fa-user-secret icons-big"></i><span className="navtitle">Manage Privileges</span></NavLink></li>
            <li><NavLink to="/accessmanage/manageroles" activeClassName="active"><i className="fas fa-users icons-big"></i><span className="navtitle">Manage Roles</span></NavLink></li>
            <li><NavLink to="/accessmanage/manageusers" activeClassName="active"><i className="fas fa-user-circle icons-big"></i><span className="navtitle">Manage Users</span></NavLink></li>
          </ul>
        </div>
    );
  }
}

export default ManageSubMenu;
