import React from 'react';
import Joi from 'joi';

import { getGenres } from '../services/genreService';
import { saveMovie, getMovie } from '../services/movieService';
import Form from './common/form';
import { Redirect } from 'react-router-dom';

class NewMovie extends Form {
  state = {
    data: {
      _id: null,
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: '',
    },
    genres: [],
    errors: {},
    redirectToReferrer: false,
  };
  async componentDidMount() {
    try {
      let { data: genres } = await getGenres();
      this.setState({ genres, data: { genreId: genres[0]._id } });
      const movieId = this.props.match.params._id;
      if (movieId !== 'new') {
        let { data: movie } = await getMovie(movieId);
        if (movie) {
          this.setState(this.mapToViewModel(movie));
        }
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace('/not-found');
    }
  }
  mapToViewModel(movie) {
    const { _id, title, genre, numberInStock, dailyRentalRate } = movie;
    return {
      data: {
        _id,
        title,
        genreId: genre._id,
        numberInStock,
        dailyRentalRate,
      },
    };
  }
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number()
      .greater(-1)
      .less(101)
      .integer()
      .required()
      .label('Stock'),
    dailyRentalRate: Joi.number()
      .greater(0)
      .less(10.1)
      .precision(1)
      .required()
      .label('Rate'),
  };
  doSubmit = async () => {
    /*const {
      _id,
      genreId,
      title,
      numberInStock,
      dailyRentalRate,
    } = this.state.data;
    const mygenre = this.state.genres.find((g) => g._id === genreId);
    const movie = {
      _id: _id,
      title: title,
      genre: mygenre,
      numberInStock: numberInStock,
      dailyRentalRate: dailyRentalRate,
      isLike: false,
    };*/
    const { data: myMovie } = await saveMovie(this.state.data);
    if (myMovie) {
      this.setState({ redirectToReferrer: true });
    }
  };
  render() {
    if (this.state.redirectToReferrer) return <Redirect to="/movies" />;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <h1>Movie Form</h1>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number In Stock')}
          {this.renderInput('dailyRentalRate', 'Rate')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}
export default NewMovie;
