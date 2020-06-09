import React, { Component } from 'react';

class TabelHeader extends Component {
  rasiseSort = (column) => {
    const existingSortColumn = { ...this.props.selectedSort };
    let order = 'asc';
    if (existingSortColumn.column === column) {
      order = existingSortColumn.order === 'asc' ? 'desc' : 'asc';
    }
    return this.props.onSort({ column: column, order: order });
  };
  renderSort = (column) => {
    if (column.path !== this.props.selectedSort.column) return null;
    if (this.props.selectedSort.order === 'asc')
      return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };
  render() {
    const { headerValues } = this.props;
    return (
      <thead>
        <tr>
          {headerValues.map((header) => (
            <th
              style={{ cursor: 'pointer' }}
              key={header.displayName || header.key}
              onClick={() => this.rasiseSort(header.path)}
            >
              {header.displayName} &nbsp;
              {this.renderSort(header)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}
export default TabelHeader;
