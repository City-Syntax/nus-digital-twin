import React from 'react';
import Icons from './Icons';
import { activeMenu } from '../store';
import { useStore } from '@nanostores/react';

interface NavLinkProps {
  label: string;
  isLeftLink?: boolean;
}

interface NavLinkChildProps {
  label: string;
}

const NavLink = ({ label, isLeftLink = false }: NavLinkProps) => {
  const pageName = label.replace(/\s/g, '');
  const key = pageName as keyof typeof Icons;
  const $activeMenu = useStore(activeMenu);
  return (
    <button
      className={$activeMenu === pageName ? 'active' : ''}
      type="button"
      onClick={() => {
        activeMenu.set(pageName);
      }}
    >
      {Icons[key]()}
      {label}
    </button>
  );
};

export default NavLink;
