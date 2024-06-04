import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import Icons from './Icons';
import buildingsData from '../content/buildings/buildings.json';
import { activePage, buildingId, searchQuery } from '../store';
import { useStore } from '@nanostores/react';

const CommandMenu = () => {
  const [open, setOpen] = useState(false);
  const $searchQuery = useStore(searchQuery);

  useEffect(() => {
    const searchInput = document.querySelector('input')!;
    const down = (e: KeyboardEvent) => {
      if (searchInput == document.activeElement && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
        setOpen(true);
      }

      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        searchInput.focus();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const buildingsDataToShow = buildingsData.filter((building) =>
    building.name.toLowerCase().startsWith($searchQuery.toLowerCase()),
  );

  return (
    <Command shouldFilter={false} label="Search buildings" loop>
      <div className="search">
        <Command.Input
          onFocus={() => setOpen(true)}
          onBlur={(e) => {
            const selectedOption = e.relatedTarget?.querySelector(`div[data-selected="true"]`) || null;
            if (selectedOption) {
              activePage.set('building-info');
              buildingId.set(selectedOption.getAttribute('data-value') || '');
            }
            setOpen(false);
          }}
          value={$searchQuery}
          onValueChange={(value) => searchQuery.set(value)}
          placeholder="Search buildings"
        ></Command.Input>
        <Icons.Search></Icons.Search>
      </div>
      <Command.List hidden={!open}>
        <Command.Empty>No results found.</Command.Empty>
        {buildingsDataToShow.map((building) => {
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
              {building.name}
            </Command.Item>
          );
        })}
      </Command.List>
    </Command>
  );
};

export default CommandMenu;
