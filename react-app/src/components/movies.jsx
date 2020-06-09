import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import * as moviesAPI from '../services/movieService';
import { getGenres } from '../services/genreService';
import Pagination from './common/pagination';
import Filter from './common/filter';
import MoviesTable from './moviesTable';
import SearchBox from './common/searchbox';
class Movies extends Component {
  state = {
    recordsPerPage: 4,
    currentPage: 1,
    movies: [],
    genres: [],
    currentGener: null,
    selectedSort: { column: 'title', order: 'asc' },
    selectedSearch: ''.trim(),
  };
  async componentDidMount() {
    const { data: mygenres } = await getGenres();
    let genres = [{ _id: 'all', name: 'All Genres' }, ...mygenres];
    //genres.unshift({ _id: 'all', name: 'All Genres' });
    const { data: movies } = await moviesAPI.getMovies();
    this.setState({
      movies: movies, //.slice(0, this.state.recordsPerPage)
      genres: genres,
      currentGener: genres[0],
      selectedSearch: ''.trim(),
    });
  }

  handleMovies = async (movieId) => {
    const originalMovies = this.state.movies;
    let movies = originalMovies.filter((movie) => movie._id !== movieId);
    this.setState({ movies });
    try {
      await moviesAPI.deleteMovie(movieId);
    } catch {
      this.setState({ movies: originalMovies });
    }
  };
  handleLiked = async (movieId) => {
    let { data: movie } = await moviesAPI.getMovie(movieId);
    let like = movie.isLike;
    movie.isLike = !like;
    //moviesAPI.saveMovie(movie);
    this.setState({ movies: this.state.movies });
  };
  handlePageClick = (page) => {
    console.log(page + ': page');
    this.setState({ currentPage: page }); //movies: newMovies,
  };
  pagination = (movies) => {
    let start = (this.state.currentPage - 1) * this.state.recordsPerPage;
    let newMovies = movies.slice(start, start + this.state.recordsPerPage);
    return newMovies;
  };
  handleGenerFilter = (filterObj) => {
    this.setState({
      currentGener: filterObj,
      currentPage: 1,
      selectedSearch: ''.trim(),
    });
  };
  filterByGener = () => {
    let movies = this.state.movies;
    if (
      this.state.currentGener &&
      this.state.currentGener.name !== 'All Genres'
    ) {
      movies = movies.filter(
        (movie) => movie.genre.name === this.state.currentGener.name
      );
    }
    return movies;
  };
  handleSort = (selectedSort) => {
    console.log('selectedSort', selectedSort);

    this.setState({ selectedSort });
  };
  handleSearch = (value) => {
    this.setState({
      selectedSearch: value.toString().trim(),
      currentPage: 1,
    });
  };

  getPageData = () => {
    let filteredmovied = this.filterByGener();
    let searched = filteredmovied.filter((movie) => {
      let movieStringify =
        movie.title +
        ' ' +
        movie.genre.name +
        ' ' +
        movie.numberInStock +
        ' ' +
        movie.dailyRentalRate;
      return (
        movieStringify
          .toLowerCase()
          .indexOf(this.state.selectedSearch.toLowerCase()) !== -1
      );
    });
    let sort = this.state.selectedSort;
    const sorted = _.orderBy(searched, [sort.column], sort.order);
    let availableMovies = this.pagination(sorted);
    return {
      totalrecords: sorted.length,
      availableMovies: availableMovies,
    };
  };

  render() {
    //const { length: count } = this.state.movies;

    /*if (sort) {
      filteredmovied.sort((a, b) => {
        let x = eval('a.' + sort);
        let y = eval('b.' + sort);
        return x < y ? -1 : x > y ? 1 : 0;
      });
      console.log(filteredmovied, ' sordted filteredmovied');
    }*/

    const { totalrecords, availableMovies } = this.getPageData();
    const { user } = this.props;
    const {
      genres,
      currentGener,
      selectedSort,
      currentPage,
      recordsPerPage,
      selectedSearch,
    } = this.state;
    let noofRecord;
    if (totalrecords === 0)
      noofRecord = <p className="lead">No Movies Avialable</p>;
    else
      noofRecord = (
        <div>
          <MoviesTable
            availableMovies={availableMovies}
            onRowLike={this.handleLiked}
            onDeleteClick={this.handleMovies}
            onSort={this.handleSort}
            selectedSort={selectedSort}
          />
          <Pagination
            totalrecords={totalrecords}
            recordsPerPage={recordsPerPage}
            currentPage={currentPage}
            pageClicked={this.handlePageClick}
          />
        </div>
      );

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Filter
              listItems={genres}
              handleListItem={this.handleGenerFilter}
              currrentListgroupItem={currentGener}
            />
          </div>
          <div className="col">
            {user && (
              <Link
                to="/movies/new"
                className="btn btn-primary"
                style={{ marginBottom: 20 }}
              >
                New Movie
              </Link>
            )}
            {/* <Route path="/movies/new" component={NewMovie} /> */}
            <p className="lead">
              showing {totalrecords} movies in the database
            </p>
            <SearchBox value={selectedSearch} onChange={this.handleSearch} />
            {noofRecord}
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
