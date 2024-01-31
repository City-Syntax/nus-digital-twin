import React from 'react';
import Icons from '../Icons';
import { activeMenu } from '../../store';
import { useStore } from '@nanostores/react';

interface MenuLinkProps {
  label: string;
}

const MenuLink = ({ label }: MenuLinkProps) => {
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

export default MenuLink;
