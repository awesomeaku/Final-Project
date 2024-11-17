import React from 'react'
import { Link } from 'react-router-dom';

export const SearchResult = ( { result} ) => {
  return (
    // <div className='-Result'>{result.id}</div>
    <ul>
        <Link to={`/movie/${result.id}`} className ="search-Result-Image"> <img src = {result.poster} alt="" /></Link>
        <li><Link to={`/movie/${result.id}`} className="search-Result">{result.title}</Link></li>
    </ul>
  )
}
