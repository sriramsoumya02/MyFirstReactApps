import React, { Component } from 'react';
import ProtoTypes from 'prop-types';
import Table from './common/table';
import Like from './common/like';
import { Link } from 'react-router-dom';
import auth from '../services/authService';

class MoviesTable extends Component {
  headerValues = [
    {
      displayName: 'Title',
      path: 'title',
      content: (movie) => {
        if (this.props.user)
          return <Link to={`/movies/${movie._id}`}>{movie.title}</Link>;
        else return movie.title;
      },
    },
    { displayName: 'Genre', path: 'genre.name' },
    { displayName: 'Stock', path: 'numberInStock' },
    { displayName: 'Rate', path: 'dailyRentalRate' },
    {
      displayName: 'Like',
      content: (movie) => (
        <Like
          isLiked={movie.isLike}
          onLike={() => this.props.onRowLike(movie._id)}
        />
      ),
    },
  ];
  deleteColumn = {
    key: 'Delete',
    content: (movie) => (
      <button
        className="btn btn-danger"
        onClick={() => this.props.onDeleteClick(movie._id)}
      >
        Delete
      </button>
    ),
  };
  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.headerValues.push(this.deleteColumn);
  }
  render() {
    const { availableMovies, onSort, selectedSort } = this.props;

    return (
      <Table
        headerValues={this.headerValues}
        selectedSort={selectedSort}
        data={availableMovies}
        onSort={onSort}
      />
    );
  }
}

MoviesTable.prototypes = {
  availableMovies: ProtoTypes.array.isRequired,
  onRowLike: ProtoTypes.func.isRequired,
  onDeleteClick: ProtoTypes.func.isRequired,
  onSort: ProtoTypes.func,
};
export default MoviesTable;
