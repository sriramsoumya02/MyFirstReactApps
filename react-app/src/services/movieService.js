import http from './httpService';
import config from '../config.json';
const movieUrl = config.apiBackend + '/movies';
function getMovieUrl(id) {
  return `${movieUrl}/${id}`;
}
export function getMovies() {
  return http.get(movieUrl);
}

export function getMovie(id) {
  return http.get(getMovieUrl(id));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(getMovieUrl(movie._id), body);
  }
  return http.post(movieUrl, movie);
}

export function deleteMovie(id) {
  return http.delete(getMovieUrl(id));
}
