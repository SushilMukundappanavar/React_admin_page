import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { API_ROOT } from '../api-config';
import logo from '../assets/img/logo.png';
// import './App.css';

class Login extends Component {
  constructor(props, context) {
    super(props, context),
    this.state = {
      userName: '',
      password: '',
      redirect: false
    }
    this.onChanglogin = this.onChanglogin.bind(this),
    this.loginSubmit = this.loginSubmit.bind(this)
  }

  onChanglogin(event){
    this.setState({ [event.target.name ]: event.target.value });
  }

  loginSubmit(event){
    event.preventDefault();
    // console.log(this.state);
    fetch(`${API_ROOT}/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log('Success:', response)
      if(response.userName){
        sessionStorage.setItem('userName', response.userName);
        this.setState({ redirect: true })
      }else {
        // console.log('ss')
      }
    
      this.setState({
        userName: '',
        password: ''
      })
    })
  }

  render() {
    if(this.state.redirect){
      return ( <Redirect to={'/home'} /> )
    }
    if(sessionStorage.getItem('userName')){
      return ( <Redirect to={'/home'} /> )
    }
    return (
      <div className="login-main-wrap">
        <div className="login-wrap container-fluid">
          <div className="container">
            <div className="row">
              <div className="login-section">
                <div className="login-logo-head">
                  <img src={logo} className="logo" alt="logo" />
                </div>
                <div className="login-mid-container">
                  <form className="login-form" onSubmit={this.loginSubmit}>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="User Name" 
                          name="userName"
                          onChange={this.onChanglogin}
                          value={this.state.userName}
                      />
                    </div>
                    <div className="form-group">
                      <input type="password" className="form-control" placeholder="Password" 
                          name="password"
                          onChange={this.onChanglogin}
                          value={this.state.password}
                      />
                    </div>
                    <div className="form-group">
                    <button type="submit" className="btn btn-primary link btn-login">SIGN IN</button>
                      {/* <button type="button" className="btn-login">
                        <Link to={'/Home'} className="btn btn-primary link">LOGIN</Link>
                      </button> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;