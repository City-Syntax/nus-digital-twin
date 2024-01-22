import React from 'react';
import Styles from '../styles/Navigation.module.scss';
import Icons from './Icons';

interface NavLinkProps {
  activePage: string;
  label: string;
  handleClick: (page: string) => void;
}

const NavLink = ({ activePage, label, handleClick }: NavLinkProps) => {
  const pageName = label.replace(/\s/g, '');
  const key = pageName as keyof typeof Icons;
  return (
    <button
      className={activePage === pageName ? Styles.active : ''}
      type="button"
      onClick={() => handleClick(pageName)}
    >
      {Icons[key]()}
      {label}
    </button>
  );
};

export default NavLink;
