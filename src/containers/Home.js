import React, { Component } from 'react';
// import { render } from 'react-dom'
// import { Router, Route, Switch } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Header from '../components/Header';
import Alerts from './Alert/Alert';
import AccessManagement from './AccessManagement/AccessManage';
import Footer from '../components/Footer';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false
    }
    this.logout = this.logout.bind(this);
  }

  componentWillMount(){
    if(sessionStorage.getItem('userName')){
      // console.log('call user feed');
    } else {
      this.setState({ redirect: true })
    }
  }
  logout(){
    sessionStorage.setItem('userName', '');
    sessionStorage.clear();
  }

  render() {
    if(this.state.redirect){
      return ( <Redirect to={'/'} /> )
    }

    return (
      <div className="main-wrapper container-fluid">
        <Header Logout={this.logout} />
          <div className="mid-container">
            <Switch>
              <Redirect exact path="/home" to="/accessmanage"/>
              <Route path='/alerts' component={Alerts} />
              <Route path='/accessmanage' component={AccessManagement} />
              <Route component={AccessManagement} />
            </Switch>
          </div>
        <Footer />
      </div> 
    );
  }
}

export default Home;
