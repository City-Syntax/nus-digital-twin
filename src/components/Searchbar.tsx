import React, { useCallback, useEffect, useRef, useState } from 'react';
import fuzzysort from 'fuzzysort';
import { Command } from 'cmdk';
import Icons from './Icons';
import buildingsData from '../content/buildings/buildings.json';
import { activePage, buildingId, searchQuery } from '../store';
import { useStore } from '@nanostores/react';

const Searchbar = () => {
  const [open, setOpen] = useState(false);
  const $searchQuery = useStore(searchQuery);
  const listRef = useRef<HTMLDivElement>(null);

  // https://github.com/pacocoursey/cmdk/issues/234
  const scrollUpOnChange = useCallback(() => {
    requestAnimationFrame(() => {
      listRef!.current!.scrollTo({ top: 0 });
    });
  }, []);

  buildingId.listen((newId) => {
    if (newId === '') {
      return;
    }
    searchQuery.set(buildingsData.filter((d) => d.elementId == newId)[0].name);
  });

  useEffect(() => {
    const [desktopSearch, mobileSearch] = document.querySelectorAll('input');
    const down = (e: KeyboardEvent) => {
      if (desktopSearch == document.activeElement && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
        setOpen(true);
      }
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (window.innerWidth <= 878) {
          activePage.set('search');
          if (mobileSearch) {
            mobileSearch.focus();
          }
        } else {
          desktopSearch.focus();
          setOpen(true);
        }
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  let buildingsDataToShow;
  const fuzzyResults = fuzzysort.go($searchQuery, buildingsData, { key: 'name' });
  if ($searchQuery.length === 0) {
    buildingsDataToShow = buildingsData;
  } else {
    buildingsDataToShow = fuzzyResults.map((res) => res.obj);
  }
  const searchResults = fuzzyResults.map((res) => res.highlight((m, i) => <mark key={i}>{m}</mark>));

  return (
    <Command shouldFilter={false} label="Search buildings" loop>
      <div className="search">
        <Command.Input
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onBlur={(e) => {
            const selectedOption = e.relatedTarget?.querySelector(`div[data-selected="true"]`) || null;
            if (selectedOption) {
              activePage.set('building-info');
              buildingId.set(selectedOption.getAttribute('data-value') || '');
            }
            setOpen(false);
          }}
          value={$searchQuery}
          onValueChange={(value) => {
            searchQuery.set(value);
            scrollUpOnChange();
          }}
          placeholder="Search buildings"
        ></Command.Input>
        <Icons.Search></Icons.Search>
      </div>
      <Command.List className={open ? '' : 'hide'} ref={listRef}>
        <Command.Empty>No results found.</Command.Empty>
        {buildingsDataToShow.map((building, i) => {
          return (
            <Command.Item
              key={building.elementId}
              value={building.elementId}
              onSelect={() => {
                activePage.set('building-info');
                buildingId.set(building.elementId);
                setOpen(false);
              }}
            >
              {searchResults[i] ? searchResults[i] : building.name}
            </Command.Item>
          );
        })}
      </Command.List>
    </Command>
  );
};

export default Searchbar;
