import React from 'react';
import Icons from '../Icons';
import { activeMenu, isSelectColorByDistance, searchQuery, buildingId } from '../../store';

const CloseButton = () => {
  return (
    <button
      type="button"
      onClick={() => {
        activeMenu.set('');
        searchQuery.set('');
        buildingId.set('');
        isSelectColorByDistance.set(false);
      }}
    >
      <Icons.Close></Icons.Close>
    </button>
  );
};

export default CloseButton;
