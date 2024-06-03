import React from 'react';
import Icons from '../Icons';
import { activeMenu, buildingId, isSelectColorByDistance, searchQuery } from '../../store';
import { useStore } from '@nanostores/react';
import type { MenuPages } from './menuUtils';

interface MenuLinkProps {
  label: string;
  toPage: MenuPages;
  iconName: keyof typeof Icons;
  isVertical?: boolean;
}

const MenuLink = ({ label, toPage, iconName, isVertical }: MenuLinkProps) => {
  const $activeMenu = useStore(activeMenu);
  return (
    <button
      className={`${$activeMenu === toPage ? 'active' : ''} ${isVertical ? 'vertical' : ''}`}
      type="button"
      onClick={() => {
        activeMenu.set(toPage);
        searchQuery.set('');
        buildingId.set('');
        isSelectColorByDistance.set(false);
      }}
    >
      {Icons[iconName]()}
      <span>{label}</span>
    </button>
  );
};

export default MenuLink;
