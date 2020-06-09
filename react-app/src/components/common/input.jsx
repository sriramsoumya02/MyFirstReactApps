import React from 'react';
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        autoFocus
        //ref={this.username}
        // onChange={onChange}
        // value={value}
        // type={type}
        {...rest}
        id={name}
        name={name}
        error={error}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
