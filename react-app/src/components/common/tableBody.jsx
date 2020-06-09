import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {
  state = {};
  renserCellContent = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };
  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };
  render() {
    const { data, headerValues } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {headerValues.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renserCellContent(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
