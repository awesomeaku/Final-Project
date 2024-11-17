import React from 'react';
import {Link} from 'react-router-dom';
import {logout} from '../redux/actions/AuthActions';
import {connect} from 'react-redux';
import _ from 'lodash';
import logoImg from '../assets/cllogo.jpeg';

class Header extends React.Component {
  render() {
    var {props} = this;
    var profile = _.get(props, 'profile');
    var isLoggedIn = !!_.get(props, 'auth.token');
    // const { results } = this.state;

    return (
      <nav className="nt-app-header">
        <div className="nt-app-header-logo">
          <Link to="/">
            <img src={logoImg} alt="" />
          </Link>
        </div>

        {/* <div className='nt-app-header-top-right' /> */}
          <div className="nt-app-header-profile-links">
          <div className="right">
            {
              profile ?
                <div className="nt-app-header-avatar" style={this.getAvatarStyle(profile)}>
                  <Link to="/profile" title={`profile: ${profile.username}`}/>
                </div>
                : null
            }
            <div className="log-container">
              {isLoggedIn ? <button onClick={this.logout.bind(this)} className="buttonLink logout">Log out</button> : <Link to="/login">Log in</Link>}
            </div>
            <div>
              {isLoggedIn ? null : <Link to="/signup">Sign up</Link>}
            </div>
          </div>
          </div>

          {/* <div className='breadcrumbs-search'>
              <div className='breadcrumbs-search-bar' /><Searchbar setResults={this.setResults} />
              <div className='breadcrumbs-search-results' /><SearchResults results={results} />
          </div> */}
      </nav>
    );
  }

  getAvatarStyle(profile) {
    return {background: `url(${_.get(profile, 'avatar.fullSize')}) center`};
  }

  logout() {
    this.props.dispatch(logout());
  }
}

Header.displayName = 'Header';

export default connect()(Header);
