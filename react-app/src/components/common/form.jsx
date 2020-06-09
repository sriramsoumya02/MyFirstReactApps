import React, { Component } from 'react';

import Joi from 'joi';
import Input from './input';
import InputSelect from './inputSelect';
class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    const errors = {};
    if (!error) return null;
    error.details.map((item) => (errors[item.path[0]] = item.message));
    return errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    if (this.errors) return;
    this.doSubmit();
  };
  validateProperty = ({ name, value }) => {
    const propertyObj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(propertyObj, schema);
    return error ? error.details[0].message : null;
  };
  //handleChange = (e) => {
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
  renderSelect(
    name,
    label,
    options,
    nameProperty = 'name',
    idProperty = '_id'
  ) {
    return (
      <InputSelect
        name={name}
        label={label}
        options={options}
        value={this.state.data.genreId}
        nameProperty={nameProperty}
        idProperty={idProperty}
        onChange={this.handleChange}
      />
    );
  }
  renderInput(name, label, type = 'text') {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        type={type}
        error={errors[name]}
      />
    );
  }
}

export default Form;
