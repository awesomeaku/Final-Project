// import movie from '../../../api/models/neo4j/movie';
import settings from '../config/settings';
// import movies from '../redux/reducers/movies';
import axios from './axios';
import _ from 'lodash';

const {apiBaseURL} = settings;

export default class MoviesApi {
  static getGenres() {
    return axios.get(`${apiBaseURL}/genres`);
  }

  static getAllMovies() {
    return axios.get(`${apiBaseURL}/movies`);
  }

  static getMoviesByGenres(genreNames) {
    return MoviesApi.getGenres()
      .then(genres => {
        var movieGenres = _.filter(genres, g => {
          return genreNames.indexOf(g.name) > -1;
        });

        return Promise.all(
          movieGenres.map(genre => {
              return axios.get(`${apiBaseURL}/movies/genre/${genre.id}/`);
            }
          ))
          .then(genreResults => {
            var result = {};
            genreResults.forEach((movies, i) => {
              result[movieGenres[i].name] = movies;
            });

            return result;
          });
      });
  }

  // convert this to top 3 most rated movies
  static getFeaturedMovies() {
    return Promise.all([
      axios.get(`${apiBaseURL}/movies/13380`),
      axios.get(`${apiBaseURL}/movies/15292`),
      axios.get(`${apiBaseURL}/movies/11398`)
    ]);
  }

  static async getMovieByName(name) {
    if (name)
    {
      const movies = await this.getAllMovies();
      // const movieIds = movies.map(movie => movie.id);
      // const responses = await Promise.all(
      //   movieIds.map(id => (axios.get(`${apiBaseURL}/movies/${id}`))
      // ));
        
      // const allMovies = responses.flatMap(responses => responses.data);
      const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(name.toLowerCase()));
      // const filteredMovies = allMovies.map(movie => movie.title.toLowerCase().includes(name.toLowerCase()));
      console.log(filteredMovies)
      return filteredMovies.length > 0 ? filteredMovies : null;
    }
  }

  // static getMovieByName(name, page = 1, limit = 100) {
  //   // Function to fetch movies by page
  //   const fetchMoviesPage = (page) => {
  //     return axios.get(`${apiBaseURL}/movies`, { params: { page, limit } })
  //       // .then(response => response.data); // Assuming the API returns the movies in response.data
  //   };
  
  //   return fetchMoviesPage(page)
  //     .then(movies => {
  //       console.log(movies)
  //       const movieIds = movies.map(movie => movie.id);
        
  //       // Fetch movie details by IDs
  //       return Promise.all(
  //         movieIds.map(id => axios.get(`${apiBaseURL}/movies/${id}`))
  //       ).then(responses => {
  //         const allMovies = responses.flatMap(response => response.data);
          
  //         // Filter movies by the name
  //         const filteredMovies = allMovies.filter(movie => movie.title.toLowerCase().includes(name.toLowerCase()));
  //         console.log(`Found ${filteredMovies.length} matching movies on page ${page}`);
          
  //         // If no results are found on this page, return null
  //         if (filteredMovies.length > 0) {
  //           return filteredMovies;
  //         } else {
  //           // Check if there are more pages to search
  //           if (movies.length === limit) {
  //             // Recursively call the function to fetch the next page
  //             return this.getMovieByName(name, page + 1, limit);
  //           } else {
  //             // If no more pages, return null
  //             return null;
  //           }
  //         }
  //       });
  //     });
  // }
  

  static getMovie(id) {
      return axios.get(`${apiBaseURL}/movies/${id}`);
  }

  static rateMovie(id, rating) {
    return axios.post(`${apiBaseURL}/movies/${id}/rate`, {rating});
  }

  static deleteRating(id) {
    return axios.delete(`${apiBaseURL}/movies/${id}/rate`);
  }
}


