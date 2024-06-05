import React from 'react';
import Icons from '../Icons';
import { activePage, buildingId, isSelectColorByDistance } from '../../store';
import { useStore } from '@nanostores/react';
import type { MenuPages } from './menuUtils';

interface MenuLinkProps {
  label: string;
  toPage: MenuPages;
  iconName: keyof typeof Icons;
  isVertical?: boolean;
  isActive?: boolean;
}

const MenuLink = ({ label, toPage, iconName, isVertical, isActive }: MenuLinkProps) => {
  const $activePage = useStore(activePage);
  return (
    <button
      className={`${$activePage === toPage ? 'active' : ''} ${isVertical ? 'vertical' : ''}`}
      type="button"
      onClick={() => {
        activePage.set(toPage);
        buildingId.set('');
        isSelectColorByDistance.set(false);
      }}
    >
      {Icons[iconName]()}
      <span>{label}</span>
      <span className={`active-indicator ${isActive ? 'show' : ''}`}></span>
    </button>
  );
};

export default MenuLink;
