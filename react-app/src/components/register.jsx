import React from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi';
import Form from './common/form';
import * as UserService from '../services/userService';
import auth from '../services/authService';
class Register extends Form {
  state = {
    data: { userName: '', password: '', name: '' },
    errors: {},
  };
  schema = {
    userName: Joi.string().email().required().label('UserName'),
    password: Joi.string().min(5).required().label('Password'),
    name: Joi.string().required().label('Name'),
  };
  doSubmit = async (e) => {
    //calls server and redirect to respective form
    console.log('form Registered');
    try {
      const response = await UserService.saveUser(this.state.data);
      auth.loginWithJwt(response.headers['x-auth-token']);
      window.location = '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        let errors = { ...this.state.errors };
        errors.userName = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <h1>Register</h1>
          {this.renderInput('userName', 'UserName', 'email')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'name')}
          {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}

export default Register;
