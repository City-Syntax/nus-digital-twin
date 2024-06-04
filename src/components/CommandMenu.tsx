import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import Icons from './Icons';
import { searchQuery } from '../store';
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

  const values = ['COM1', 'COM2', 'COM3'];

  return (
    <Command label="Search buildings">
      <div className="search">
        <Command.Input
          onFocus={() => setOpen(true)}
          onBlur={(e) => {
            const selectedOption = e.relatedTarget?.querySelector(`div[data-selected="true"]`) || null;
            if (selectedOption) {
              searchQuery.set(selectedOption.getAttribute('data-value') || '');
            }
            setOpen(false);
          }}
          value={$searchQuery}
          onValueChange={(value) => searchQuery.set(value)}
          placeholder="Search buildings"
        ></Command.Input>
        <Icons.Search></Icons.Search>
      </div>
      <Command.List className={`CommandList ${open ? '' : 'hide'}`}>
        <Command.Empty>No results found.</Command.Empty>

        {values.map((val) => {
          return (
            <Command.Item
              key={val}
              onSelect={() => {
                searchQuery.set(val);
                setOpen(false);
              }}
            >
              {val}
            </Command.Item>
          );
        })}
      </Command.List>
    </Command>
  );
};

export default CommandMenu;
