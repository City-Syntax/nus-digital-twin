import React from 'react';
import Styles from '../styles/Navigation.module.scss';
import Icons from './Icons';
import { activePage, isLeftPanel } from '../navStore';
import { useStore } from '@nanostores/react';

interface NavLinkProps {
  label: string;
  isLeftLink?: boolean;
}

interface NavLinkChildProps {
  label: string;
}

const NavLink = ({ label, isLeftLink = false }: NavLinkProps) => {
  const pageName = label.replace(/\s/g, '');
  const key = pageName as keyof typeof Icons;
  const $activePage = useStore(activePage);
  return (
    <button
      className={$activePage === pageName ? Styles.active : ''}
      type="button"
      onClick={() => {
        isLeftPanel.set(isLeftLink);
        activePage.set(pageName);
      }}
    >
      {Icons[key]()}
      {label}
    </button>
  );
};

const Left = ({ label }: NavLinkChildProps) => {
  return <NavLink label={label} isLeftLink></NavLink>;
};

const Right = ({ label }: NavLinkChildProps) => {
  return <NavLink label={label}></NavLink>;
};

export default { Left, Right };
