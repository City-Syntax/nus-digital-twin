import React from 'react';
import MenuContent from './MenuContent';
import { searchQuery } from '../../store';
import { useStore } from '@nanostores/react';
import Icons from '../Icons';

const Search = () => {
  const $searchQuery = useStore(searchQuery);
  return (
    <MenuContent title="Search">
      <div className="search">
        <input
          type="text"
          placeholder="Search buildings"
          onChange={(e) => searchQuery.set(e.target.value)}
          value={$searchQuery}
        />
        <Icons.Search></Icons.Search>
      </div>
    </MenuContent>
  );
};

export default Search;
