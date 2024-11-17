import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading.jsx';
import Carousel from '../components/Carousel.jsx';
import _ from 'lodash';

import * as MovieActions from '../redux/actions/MovieActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Searchbar } from './Searchbar';
import { SearchResults } from './SearchResults';
// import genre from '../../../api/models/neo4j/genre.js';

class Home extends React.Component {
  constructor(props) {
    super(props);
    
    // Initialize the results state and bind the setResults method
    this.state = {
      results: []
    };
    
    this.setResults = this.setResults.bind(this);
    this.renderFeatured = this.renderFeatured.bind(this);
    this.renderByGenre = this.renderByGenre.bind(this);
  }

  componentWillMount() {
    this.props.getFeaturedMovies();
    // this.props.genreList = 
    this.props.getMoviesByGenres(['Adventure', 'Drama', 'Action']);
  }

  setResults(newResults) {
    this.setState({ results: newResults });
  }

  render() {
    var {movies} = this.props;
    // const { results } = this.state;

    return (
      <div className="nt-home">
        <div className="row">
          <div className="large-12 columns">
            {movies.isFetching ? <Loading/> : null}
            {this.renderFeatured()}
          </div>
          <div className="large-12 columns">
            {console.log(this.props.genreList)}
            {/* {this.props.genreList.map((genre) => this.renderByGenre(genre) )} */}
            
            {this.renderByGenre('Adventure')}
            {this.renderByGenre('Drama')}
            {this.renderByGenre('Action')}
          </div>
        </div>
      </div>
    );
  }

  renderFeatured() {
    var {movies} = this.props;
    const { results } = this.state;

    return (
      
      <div className="nt-home-featured">
        <div className='breadcrumbs-search'>
              <Searchbar setResults={this.setResults} />
              <SearchResults results={results} />
          </div>
        <h3 className="nt-home-header">Featured Movies</h3>
        <ul>
          { _.compact(movies.featured).map(f => {
            return (
              <li key={f.id}>
                <Link to={`/movie/${f.id}`}>
                  <img src={f.posterImage} alt="" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  renderByGenre(name) {
    var {movies} = this.props;
    var moviesByGenre = movies.byGenre[name];

    if (_.isEmpty(moviesByGenre)) {
      return null;
    }

    return (
      <div className="nt-home-by-genre">
        <div className="nt-box">
          <div className="nt-box-title">
            {name}
          </div>
          <Carousel>
            { moviesByGenre.map(m => {
              return (
                <div key={m.id}>
                  <Link to={`/movie/${m.id}`}>
                    <img src={m.posterImage} alt="" />
                  </Link>
                  <div className="nt-carousel-movie-title">
                    <Link to={`/movie/${m.id}`}>{m.title}</Link>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>);
  }
}
Home.displayName = 'Home';

function mapStateToProps(state) {
  return {
    genres: state.genres.items,
    movies: state.movies
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MovieActions, dispatch);
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Home);
