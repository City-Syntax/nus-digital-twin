import React, { useCallback, useEffect, useRef, useState } from 'react';
import fuzzysort from 'fuzzysort';
import { Command } from 'cmdk';
import Icons from './Icons';
import buildingsData from '../content/buildings/buildings.json';
import { activePage, buildingId, flyToPosition } from '../store';

const Searchbar = () => {
  const [open, setOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  // Force the component to render once first, else the group label is not included
  useEffect(() => {
    setOpen(false);
  }, []);

  // https://github.com/pacocoursey/cmdk/issues/234
  const scrollUpOnChange = useCallback(() => {
    requestAnimationFrame(() => {
      listRef!.current!.scrollTo({ top: 0 });
    });
  }, []);

  const focusOnInput = useCallback(() => {
    const [desktopSearch, mobileSearch] = document.querySelectorAll('input');
    if (window.innerWidth <= 878) {
      mobileSearch.focus();
    } else {
      desktopSearch.focus();
    }
  }, []);

  buildingId.listen((newId) => {
    if (newId === '') {
      setSearchQuery('');
      return;
    }
    setSearchQuery(buildingsData.filter((d) => d.elementId == newId)[0].name);
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
  const fuzzyResults = fuzzysort.go(searchQuery, buildingsData, { key: 'name' });
  if (searchQuery === '') {
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
            if (e.relatedTarget?.contains(document.querySelector('[cmdk-root]'))) {
              setOpen(true);
              return;
            }
            setOpen(false);
          }}
          value={searchQuery}
          onValueChange={(value) => {
            setOpen(true);
            setSearchQuery(value);
            scrollUpOnChange();
          }}
          placeholder="Search buildings"
        ></Command.Input>
        <Icons.Close
          onClick={() => {
            setSearchQuery('');
            scrollUpOnChange();
            focusOnInput();
          }}
        ></Icons.Close>
      </div>
      <Command.List className={open ? '' : 'hide'} ref={listRef}>
        <Command.Group heading={`Search results (${buildingsDataToShow.length})`}>
          <Command.Empty>No results found.</Command.Empty>
          {buildingsDataToShow.map((building, i) => {
            return (
              <Command.Item
                key={building.elementId}
                value={building.elementId}
                onSelect={() => {
                  activePage.set('building-info');
                  buildingId.set(''); // Force the listener on buildingId to trigger
                  buildingId.set(building.elementId);
                  flyToPosition.set({
                    longitude: building.longitude,
                    latitude: building.latitude,
                  });
                  setOpen(false);
                }}
              >
                {searchResults[i] ? searchResults[i] : building.name}
              </Command.Item>
            );
          })}
        </Command.Group>
      </Command.List>
    </Command>
  );
};

export default Searchbar;
