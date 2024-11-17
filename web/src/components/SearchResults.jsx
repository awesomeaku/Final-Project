import React from 'react';
import { SearchResult } from './SearchResult';

export const SearchResults = ({results}) => {
  // return <div>SearchResults</div>
  return (
        <div className='results-List'>
          {
              results.map((result, id) => {
                console.log(result.title);
                return <SearchResult result={result} key={id}/>
              })
          }
          {/* <div>A</div>
          <div>A</div>
          <div>A</div> */}
        </div>);
}
