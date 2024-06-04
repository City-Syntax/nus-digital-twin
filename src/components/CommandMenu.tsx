import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import Icons from './Icons';
import { searchQuery } from '../store';
import { useStore } from '@nanostores/react';

const CommandMenu = () => {
  const $searchQuery = useStore(searchQuery);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        document.querySelector('input')?.focus();
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
          value={$searchQuery}
          onValueChange={(value) => searchQuery.set(value)}
          placeholder="Search buildings"
        ></Command.Input>
        <Icons.Search></Icons.Search>
      </div>
      <Command.List className="CommandList">
        <Command.Empty>No results found.</Command.Empty>

        {values.map((val) => {
          return (
            <Command.Item key={val} onSelect={() => searchQuery.set(val)}>
              {val}
            </Command.Item>
          );
        })}
      </Command.List>
    </Command>
  );
};

export default CommandMenu;
