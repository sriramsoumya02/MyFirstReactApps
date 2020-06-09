import React from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi';
import Form from './common/form';
import auth from '../services/authService';
class Login extends Form {
  state = {
    data: {
      username: 'aaa',
      password: '',
    },
    errors: {},
  };
  schema = {
    username: Joi.string().required().label('UserName'),
    password: Joi.string().required().label('Password'),
  };
  //this is only to show how to work with DOM elements
  // username = React.createRef();
  // componentDidMount() {
  //   this.username.current.focus();
  // }
  // validate = () => {
  //   const options = { abortEarly: false };
  //   const { error } = Joi.validate(this.state.data, this.schema, options);
  //   const errors = {};
  //   if (!error) return null;
  //   error.details.map((item) => (errors[item.path[0]] = item.message));
  //   return errors;
  //   /*const { data } = this.state;
  //   const errors = {};
  //   if (data.username === '') {
  //     errors.username = 'userName required';
  //   }
  //   if (data.password === '') {
  //     errors.password = 'password required';
  //   }
  //   return Object.keys(errors).length === 0 ? null : errors;*/
  // };

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   const errors = this.validate();
  //   console.log(errors);
  //   this.setState({ errors: errors || {} });
  //   if (this.errors) return;
  //   //calls server and redirect to respective form
  //   console.log('form submitted');
  // };
  doSubmit = async () => {
    //calls server and redirect to respective form
    try {
      await auth.login(this.state.data.username, this.state.data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        let errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  // validateProperty = ({ name, value }) => {
  //   const propertyObj = { [name]: value };
  //   const schema = { [name]: this.schema[name] };
  //   Joi.validate(propertyObj, schema);
  //   /* if (name === 'username') {
  //     if (value.trim() === '') return 'UserName is required';
  //   }
  //   if (name === 'password') {
  //     if (value.trim() === '') return 'Password is required';
  //   }*/
  // };
  //handleChange = (e) => {
  // handleChange = ({ currentTarget: input }) => {
  //   const errors = { ...this.state.errors };
  //   const data = { ...this.state.data };
  //   const errorMessage = this.validateProperty(input);
  //   if (errorMessage) errors[input.name] = errorMessage;
  //   else delete errors[input.name];
  //   //data[e.currentTarget.name] = e.currentTarget.value;
  //   data[input.name] = input.value;
  //   this.setState({ data, errors });
  // };
  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'UserName')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}
export default Login;
