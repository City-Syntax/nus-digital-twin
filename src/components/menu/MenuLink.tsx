import React from 'react';
import Icons from '../Icons';
import { activePage, buildingId, isSelectColorByDistance } from '../../store';
import { useStore } from '@nanostores/react';
import type { MenuPages } from '../../types';

interface MenuLinkProps {
  label: string;
  toPage: MenuPages;
  iconName: keyof typeof Icons;
  isVertical?: boolean;
  isActive?: boolean;
}

const MenuLink = ({ label, toPage, iconName, isVertical, isActive }: MenuLinkProps) => {
  const $activePage = useStore(activePage);
  const Icon = Icons[iconName];
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
      {Icon && <Icon></Icon>}
      <span>{label}</span>
      <span className={`active-indicator ${isActive ? 'show' : ''}`}></span>
    </button>
  );
};

export default MenuLink;
