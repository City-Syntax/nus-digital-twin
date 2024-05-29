import React from 'react';
import Icons from '../Icons';
import { activeMenu, isSelectColorByDistance, searchQuery, buildingId } from '../../store';

interface MenuContentProps {
  title: string;
  children?: React.ReactNode;
}

const MenuContent = ({ title, children }: MenuContentProps) => {
  return (
    <div className="menubar-content">
      <div className="menubar-content-header">
        <h2>{title}</h2>
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
      </div>
      <div className="menubar-content-body">{children}</div>
    </div>
  );
};

export default MenuContent;
