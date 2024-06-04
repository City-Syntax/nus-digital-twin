import React from 'react';
import CloseButton from './CloseButton';
import CommandMenu from '../CommandMenu';

const Search = () => {
  return (
    <>
      <div className="menubar-content-header">
        <h2>Search</h2>
        <CloseButton></CloseButton>
      </div>
      <div className="menubar-content-body">
        <CommandMenu></CommandMenu>
      </div>
    </>
  );
};

export default Search;
