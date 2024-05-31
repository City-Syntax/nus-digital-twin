import React from 'react';
import CloseButton from './CloseButton';
import { searchQuery } from '../../store';
import { useStore } from '@nanostores/react';
import Icons from '../Icons';

const Search = () => {
  const $searchQuery = useStore(searchQuery);
  return (
    <>
      <div className="menubar-content-header">
        <h2>Search</h2>
        <CloseButton></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div className="search">
          <input
            type="text"
            placeholder="Search buildings"
            onChange={(e) => searchQuery.set(e.target.value)}
            value={$searchQuery}
            name="search"
          />
          <Icons.Search></Icons.Search>
        </div>
      </div>
    </>
  );
};

export default Search;
