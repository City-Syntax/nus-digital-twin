import React from 'react';
import Icons from '../Icons';
import { activePages, isSelectColorByDistance, buildingId } from '../../store';
import { MENU_PAGES } from './menuUtils';
import type { MenuPages } from '../../types';

const CloseButton = ({ page }: { page: MenuPages }) => {
  return (
    <button
      type="button"
      onClick={() => {
        if (window.innerWidth <= 1252) {
          activePages.set({
            left: '',
            right: '',
            bottom: '',
          });
          buildingId.set('');
          isSelectColorByDistance.set(false);
          return;
        }

        const isLeft = MENU_PAGES.LEFT.includes(page);
        activePages.set({
          left: isLeft ? '' : activePages.get().left,
          right: !isLeft ? '' : activePages.get().right,
          bottom: isLeft ? activePages.get().right : activePages.get().left,
        });

        if (isLeft) {
          buildingId.set('');
        }

        if (page === 'distance') {
          isSelectColorByDistance.set(false);
        }
      }}
    >
      <Icons.Close></Icons.Close>
      <span className="sr-only">Close</span>
    </button>
  );
};

export default CloseButton;
