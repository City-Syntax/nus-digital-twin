import React from 'react';
import { Command } from 'cmdk';
import Icons from './Icons';

const CommandMenu = () => {
  return (
    <Command label="Search buildings">
      <div className="search">
        <Command.Input placeholder="Search buildings"></Command.Input>
        <Icons.Search></Icons.Search>
      </div>
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>

        <Command.Group heading="Letters">
          <Command.Item>a</Command.Item>
          <Command.Item>b</Command.Item>
          <Command.Separator />
          <Command.Item>c</Command.Item>
        </Command.Group>

        <Command.Item>Apple</Command.Item>
      </Command.List>
    </Command>
  );
};

export default CommandMenu;
