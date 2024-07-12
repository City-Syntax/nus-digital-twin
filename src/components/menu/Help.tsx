import React, { useEffect } from 'react';
import CloseButton from './CloseButton';
import Icons from '../Icons';
import type { NavType } from '../../types';
import ScrollContainer from '../primitives/ScrollContainer';
import { isNavType } from '../../utils';

type HelpProps = {
  navType: NavType;
  setNavType: (navType: NavType) => void;
};

const Help = ({ navType, setNavType }: HelpProps) => {
  const handleClick = (controlType: NavType) => () => {
    setNavType(controlType);
    localStorage.setItem('helpControlType', controlType);
  };

  useEffect(() => {
    if (!isNavType(localStorage['helpControlType'])) {
      localStorage.setItem('helpControlType', 'mouse');
    }

    setNavType(localStorage['helpControlType'] || 'mouse');
  }, []);

  return (
    <>
      <div className="menubar-content-header">
        <h2>Help</h2>
        <CloseButton></CloseButton>
      </div>
      <ScrollContainer>
        <div className="menubar-content-body">
          <div className="btn-group">
            <button type="button" onClick={handleClick('mouse')} className={navType === 'mouse' ? 'active' : ''}>
              Mouse
            </button>
            <button type="button" onClick={handleClick('touch')} className={navType === 'touch' ? 'active' : ''}>
              Touch
            </button>
          </div>
          {navType === 'mouse' ? <MouseControls /> : <TouchControls />}
        </div>
      </ScrollContainer>
    </>
  );
};

export default Help;

const MouseControls = () => {
  return (
    <>
      <div>
        <h3>Pan</h3>
        <ul className="help__content list--bullet">
          <li>
            <Icons.LeftClick /> Left Click + <Icons.Drag /> Drag
          </li>
        </ul>
      </div>
      <div>
        <h3>Zoom</h3>
        <ul className="help__content list--bullet">
          <li>
            <Icons.RightClick /> Right Click + <Icons.Drag /> Drag
          </li>
          <li>
            <Icons.Scroll /> Scroll
          </li>
        </ul>
      </div>
      <div>
        <h3>Rotate</h3>
        <ul className="help__content list--bullet">
          <li>
            <Icons.MiddleClick /> Middle Click + <Icons.Drag /> Drag
          </li>
          <li>
            <kbd>CTRL</kbd> +
            <Icons.LeftClick /> Left Click +
            <Icons.Drag /> Drag
          </li>
        </ul>
      </div>
    </>
  );
};

const TouchControls = () => {
  return (
    <>
      <div>
        <h3>Pan</h3>
        <ul className="help__content list--bullet">
          <li>
            <Icons.DragOneFinger /> One finger drag
          </li>
        </ul>
      </div>
      <div>
        <h3>Zoom</h3>
        <ul className="help__content list--bullet">
          <li>
            <Icons.Pinch /> Pinch with two fingers
          </li>
        </ul>
      </div>
      <div>
        <h3>Tilt</h3>
        <ul className="help__content list--bullet">
          <li>
            <Icons.TapTwoFinger /> Two finger drag in the same direction
          </li>
        </ul>
      </div>
      <div>
        <h3>Rotate</h3>
        <ul className="help__content list--bullet">
          <li>
            <Icons.RotateTwoFinger /> Two finger drag in the opposite direction
          </li>
        </ul>
      </div>
    </>
  );
};
