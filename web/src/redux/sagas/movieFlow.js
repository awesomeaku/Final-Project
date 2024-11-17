import {all, call, put, takeEvery} from 'redux-saga/effects';
import MoviesApi from '../../api/MoviesApi';
import * as Actions from '../actions/MovieActions';
import * as Types from '../actions/MovieActionTypes';

export default function* movieFlow() {
  yield all([
    takeEvery(Types.MOVIE_GENRES_GET_REQUEST, getGenres),
    takeEvery(Types.MOVIE_GET_REQUEST, getAllMovies),
    takeEvery(Types.MOVIES_BY_GENRES_GET_REQUEST, getMoviesByGenre),
    takeEvery(Types.MOVIES_BY_NAMES_GET_REQUEST, getMovieByName),
    takeEvery(Types.MOVIES_FEATURED_GET_REQUEST, getFeaturedMovies),
    takeEvery(Types.MOVIE_DETAIL_GET_REQUEST, getMovie),
    takeEvery(Types.MOVIE_RATE, rateMovie),
    takeEvery(Types.MOVIE_DELETE_RATING, deleteRating),
  ]);
}

function* getGenres() {
  try {
    const response = yield call(MoviesApi.getGenres);
    yield put(Actions.getGenresSuccess(response));
  }
  catch (error) {
    yield put(Actions.getGenresFailure(error));
  }
}

function* getAllMovies() {
  try {
    const response = yield call(MoviesApi.getAllMovies);
    yield put(Actions.getAllMoviesSuccess(response));
  }
  catch (error) {
    yield put(Actions.getAllMoviesFailure(error));
  }
}

function* getMoviesByGenre(action) {
  var {names} = action;
  try {
    const response = yield call(MoviesApi.getMoviesByGenres, names);
    yield put(Actions.getMoviesByGenresSuccess(response));
  }
  catch (error) {
    yield put(Actions.getMoviesByGenresFailure(error));
  }
}

function* getFeaturedMovies() {
  try {
    const response = yield call(MoviesApi.getFeaturedMovies);
    yield put(Actions.getFeaturedMoviesSuccess(response));
  }
  catch (error) {
    yield put(Actions.getFeaturedMoviesFailure(error));
  }
}

function* getMovie(action) {
  var {id} = action;
  try {
    const response = yield call(MoviesApi.getMovie, id);
    yield put(Actions.getMovieSuccess(response));
  }
  catch (error) {
    yield put(Actions.getMovieFailure(error));
  }
}

function* getMovieByName(action) {
  var {name} = action;
  try {
    const response = yield call(MoviesApi.getMovieByName, name);
    // console.log(response);
    yield put(Actions.getMovieByNameSuccess(response));
  }
  catch (error) {
    yield put(Actions.getMovieByNameFailure(error));
  }
}

function* rateMovie(action) {
  var {id, rating} = action;
  try {
    const response = yield call(MoviesApi.rateMovie, id, rating);
    yield put(Actions.rateMovieSuccess(response));
    yield put(Actions.getMovie(id));
  }
  catch (error) {
    yield put(Actions.rateMovieFailure(error));
  }
}

function* deleteRating(action) {
  var {id} = action;
  try {
    const response = yield call(MoviesApi.deleteRating, id);
    yield put(Actions.deleteMovieRatingSuccess(response));
    yield put(Actions.getMovie(id));
  }
  catch (error) {
    yield put(Actions.deleteMovieRatingFailure(error));
  }
}
