import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import fuzzysort from 'fuzzysort';
import { Command } from 'cmdk';
import Icons from '../Icons';
import buildingsData from '../../content/buildings/buildings.json';
import { activePages, buildingId, flyToPosition } from '../../store';

const Searchbar = () => {
  const [open, setOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const clearBtnRef = useRef<HTMLButtonElement>(null);
  const uniqueBuildingData = useMemo(() => {
    const seenNames = new Set();
    return buildingsData.filter((building) => {
      if (!seenNames.has(building.name)) {
        seenNames.add(building.name);
        return true;
      }
      return false;
    });
  }, [buildingsData]);

  // Force the component to render once first, else the group label is not included
  useEffect(() => {
    setOpen(false);
  }, []);

  // https://github.com/pacocoursey/cmdk/issues/234
  const scrollUpOnChange = useCallback(() => {
    requestAnimationFrame(() => {
      if (listRef && listRef.current) {
        listRef.current.scrollTo({ top: 0 });
      }
    });
  }, []);

  const focusOnInput = useCallback(() => {
    const [desktopSearch, mobileSearch] = document.querySelectorAll('input');
    if (window.innerWidth <= 1252) {
      mobileSearch.focus();
    } else {
      desktopSearch.focus();
    }
  }, []);

  buildingId.listen((newId) => {
    if (newId === '') {
      scrollUpOnChange();
      setSearchQuery('');
      return;
    }
    setSearchQuery(buildingsData.filter((d) => d.elementId == newId)[0].name);
  });

  // Overrides how cmdk handles the enter key on nested buttons
  const clearSearchOnEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      (e.target as HTMLButtonElement).click();
    }
  };

  useEffect(() => {
    const [desktopSearch, mobileSearch] = document.querySelectorAll('input');
    const down = (e: KeyboardEvent) => {
      if (desktopSearch == document.activeElement && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
        setOpen(true);
      }
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (window.innerWidth <= 1252) {
          activePages.set({
            left: '',
            right: '',
            bottom: 'search',
          });
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
  const fuzzyResults = fuzzysort.go(searchQuery, uniqueBuildingData, { key: 'name' });
  if (searchQuery === '') {
    buildingsDataToShow = uniqueBuildingData;
  } else {
    buildingsDataToShow = fuzzyResults.map((res) => res.obj);
  }
  const searchResults = fuzzyResults.map((res) => res.highlight((m, i) => <mark key={i}>{m}</mark>));

  return (
    <Command shouldFilter={false} label="Search buildings" loop>
      <div className="search">
        <Command.Input
          onFocus={() => {
            setOpen(true);
            scrollUpOnChange();
          }}
          onClick={() => {
            setOpen(true);
            scrollUpOnChange();
          }}
          onBlur={(e) => {
            if (e.relatedTarget?.contains(document.querySelector('[cmdk-list]'))) {
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
        <button
          ref={clearBtnRef}
          className="clear-btn"
          type="button"
          onFocus={() => document.addEventListener('keydown', clearSearchOnEnter)}
          onBlur={() => document.removeEventListener('keydown', clearSearchOnEnter)}
          onClick={() => {
            setSearchQuery('');
            scrollUpOnChange();
            focusOnInput();
          }}
        >
          <Icons.Close></Icons.Close>
        </button>
      </div>
      <Command.List className={open ? '' : 'hide'} ref={listRef} tabIndex={-1}>
        <Command.Group heading={`Search results (${buildingsDataToShow.length})`}>
          <Command.Empty>No results found.</Command.Empty>
          {buildingsDataToShow.map((building, i) => {
            return (
              <Command.Item
                key={building.elementId}
                value={building.elementId}
                onSelect={() => {
                  if (clearBtnRef.current === document.activeElement) {
                    return;
                  }
                  activePages.set({
                    ...activePages.get(),
                    left: 'building-info',
                    bottom: 'building-info',
                  });
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
