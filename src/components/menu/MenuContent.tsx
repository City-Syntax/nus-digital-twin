import React from 'react';
import Icons from '../Icons';
import { activeMenu, isSelectColorByDistance, searchQuery } from '../../store';

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
            isSelectColorByDistance.set(false);
          }}
        >
          <Icons.Close></Icons.Close>
        </button>
      </div>
      <>{children}</>
    </div>
  );
};

export default MenuContent;
