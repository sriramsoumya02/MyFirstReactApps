import React from 'react';

const InputSelect = ({
  name,
  label,
  nameProperty,
  idProperty,
  options,
  value,
  onChange,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        className="form-control"
        id={name}
        onChange={onChange}
        value={value}
      >
        {options.map((item) => (
          <option
            key={item[idProperty]}
            name={item[idProperty]}
            value={item[idProperty]}
          >
            {item[nameProperty]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelect;
