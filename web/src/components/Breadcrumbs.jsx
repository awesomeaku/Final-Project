import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { Searchbar } from './Searchbar';
// import { SearchResults } from './SearchResults';

export default class Breadcrumbs extends React.Component {
  
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     results: [] // Initialize the state here
  //   };

  //   this.setResults = this.setResults.bind(this); // Bind the setResults method
  // }

  // setResults(newResults) {
  //   this.setState({ results: newResults }); // Update state using setState
  // }
  
  render() {
    var {movie, person} = this.props;
    // const { results } = this.state;
    // const [results, setResults] = useState([])
    return (
      <div className='breadcrums'>
        <ul className="breadcrumbs-current">
          <li><Link to="/" className={movie ? '' : 'current'}>Home</Link></li>
          {
            movie ?
              <li><Link to={`/movie/${movie.id}`} className="current">{movie.title}</Link></li>
              : null
          }
          {
            person ?
              <li><Link to={`/person/${person.id}`} className="current">{person.name}</Link></li>
              : null
          }
          {/* <div className='breadcrumbs-search'>
            <Searchbar setResults={this.setResults} />
            <SearchResults results={results} />
          </div> */}
        </ul>
      </div>
    );
  }
}



Breadcrumbs.displayName = 'Breadcrumbs';
Breadcrumbs.propTypes = {
  movie: PropTypes.object,
  person: PropTypes.object
};
