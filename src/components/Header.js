import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import logo from '../assets/img/logo.png';

class Header extends Component {
  render() {
    return (
        <header>
          <div className="clearfix">
            <div className="col-xs-12 col-sm-4 col-md-4 mob-center">
              <Link to="/home"><img src={logo} className="logo" alt="logo" /></Link>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6">

            <nav className="navbar navbar-default mob-center">
                <div className="clearfix">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav1 navbar-nav1 navigate clearfix">
                            <li><NavLink to="/accessmanage" activeClassName="active">Access Management</NavLink></li>
                            <li><NavLink to="/alerts" activeClassName="active">Alerts</NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav>
            </div>
            <div className="col-xs-12 col-sm-2 col-md-2 clearfix">
              <div className="welcome-dropdown clearfix">
                <a className="userimg">
                  <i className="fas fa-align-justify"></i>
                </a>
                <ul className="user-dropdown">
                  <li><Link onClick={this.props.Logout} to="/">Logout</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </header>
    );
  }
}

export default Header;
