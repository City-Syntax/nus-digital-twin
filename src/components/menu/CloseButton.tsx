import React from 'react';
import Icons from '../Icons';
import { activePage, isSelectColorByDistance, buildingId } from '../../store';

const CloseButton = () => {
  return (
    <button
      type="button"
      onClick={() => {
        activePage.set('');
        buildingId.set('');
        isSelectColorByDistance.set(false);
      }}
    >
      <Icons.Close></Icons.Close>
      <span className="sr-only">Close</span>
    </button>
  );
};

export default CloseButton;
