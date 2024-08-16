import React from 'react';
import Icons from '../Icons';
import { activePages, buildingId, isSelectColorByDistance } from '../../store';
import { useStore } from '@nanostores/react';
import type { MenuDir, MenuPages } from '../../types';

interface MenuLinkProps {
  label: string;
  toPage: MenuPages;
  iconName: keyof typeof Icons;
  dir: MenuDir;
  isVertical?: boolean;
  isActive?: boolean;
  isBottom?: boolean;
  isLeft?: boolean;
  isRight?: boolean;
}

const MenuLink = ({ label, toPage, iconName, dir, isVertical, isActive, isLeft, isRight, isBottom }: MenuLinkProps) => {
  const $activePages = useStore(activePages);
  const Icon = Icons[iconName];
  return (
    <button
      className={`menu-link ${$activePages[dir] === toPage ? 'active' : ''} ${isVertical ? 'vertical' : ''}`}
      type="button"
      onClick={() => {
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

        if (dir === 'left') {
          buildingId.set('');
        }

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
