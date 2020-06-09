import React from 'react';
import PropTypes from 'prop-types';

const Filter = (props) => {
  const {
    listItems,
    textProperty,
    valueProperty,
    handleListItem,
    currrentListgroupItem,
  } = props;
  return (
    <ul className="list-group">
      {listItems.map((item) => (
        <li
          key={item[valueProperty]}
          className={
            currrentListgroupItem === item
              ? 'list-group-item active'
              : 'list-group-item'
          }
          onClick={() => handleListItem(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};
Filter.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id',
};
Filter.propTypes = {
  listItems: PropTypes.array.isRequired,
  handleListItem: PropTypes.func.isRequired,
  currrentListgroupItem: PropTypes.object,
};
export default Filter;
