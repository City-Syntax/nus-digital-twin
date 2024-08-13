import React from 'react';
import Icons from '../Icons';
import { activePages, isSelectColorByDistance, buildingId } from '../../store';

const CloseButton = () => {
  return (
    <button
      type="button"
      onClick={() => {
        activePages.set({
          left: '',
          right: '',
          bottom: '',
        });
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
