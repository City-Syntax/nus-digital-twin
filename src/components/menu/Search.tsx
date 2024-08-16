import React from 'react';
import CloseButton from './CloseButton';
import Searchbar from './Searchbar';

const Search = () => {
  return (
    <>
      <div className="menubar-content-header">
        <h2>Search</h2>
        <CloseButton page="search"></CloseButton>
      </div>
      <div className="menubar-content-body">
        <Searchbar />
      </div>
    </>
  );
};

export default Search;
