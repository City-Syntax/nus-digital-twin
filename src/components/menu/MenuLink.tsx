import React from 'react';
import Icons from '../Icons';
import { activeMenu, searchQuery } from '../../store';
import { useStore } from '@nanostores/react';

interface MenuLinkProps {
  label: string;
  isVertical?: boolean;
  iconName?: string;
}

const MenuLink = ({ label, isVertical = false, iconName }: MenuLinkProps) => {
  const pageName = label.replace(/\s/g, '');
  const key = (iconName ? iconName : pageName) as keyof typeof Icons;
  const $activeMenu = useStore(activeMenu);
  return (
    <button
      className={`${$activeMenu === pageName ? 'active' : ''} ${isVertical ? 'vertical' : ''}`}
      type="button"
      onClick={() => {
        activeMenu.set(pageName);
        searchQuery.set('');
      }}
    >
      {Icons[key]()}
      <span>{label}</span>
    </button>
  );
};

export default MenuLink;
