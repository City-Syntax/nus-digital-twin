import React from 'react';
import Icons from '../Icons';
import { activePage, activePages, buildingId, isSelectColorByDistance } from '../../store';
import { useStore } from '@nanostores/react';
import type { MenuPages } from '../../types';

interface MenuLinkProps {
  label: string;
  toPage: MenuPages;
  iconName: keyof typeof Icons;
  isVertical?: boolean;
  isActive?: boolean;
  isBottom?: boolean;
  isLeft?: boolean;
  isRight?: boolean;
}

const MenuLink = ({ label, toPage, iconName, isVertical, isActive, isLeft, isRight, isBottom }: MenuLinkProps) => {
  const $activePage = useStore(activePage);
  const $activePages = useStore(activePages);
  const Icon = Icons[iconName];
  return (
    <button
      className={`menu-link ${$activePage === toPage ? 'active' : ''} ${isVertical ? 'vertical' : ''}`}
      type="button"
      onClick={() => {
        activePage.set(toPage);
        if (isBottom && !(isLeft || isRight)) {
          activePages.set({
            left: '',
            right: '',
            bottom: toPage,
          });
        } else {
          activePages.set({
            left: isLeft ? toPage : $activePages.left,
            right: isRight ? toPage : $activePages.right,
            bottom: isBottom ? toPage : $activePages.bottom,
          });
        }

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
