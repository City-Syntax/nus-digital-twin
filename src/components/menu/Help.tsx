import React, { useEffect } from 'react';
import CloseButton from './CloseButton';
import Icons from '../Icons';
import type { NavType } from '../../types';
import ScrollContainer from '../primitives/ScrollContainer';

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
    setNavType(localStorage['helpControlType'] || 'mouse');
  }, []);

  return (
    <>
      <div className="menubar-content-header">
        <h2>Help</h2>
        <CloseButton page="help"></CloseButton>
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
          <div className="[&_svg]:size-5 [&_svg]:shrink-0">
            {navType === 'mouse' ? <MouseControls /> : <TouchControls />}
          </div>
        </div>
      </ScrollContainer>
    </>
  );
};

export default Help;

const MouseControls = () => {
  return (
    <div className="space-y-2">
      <div>
        <h3>Pan</h3>
        <div className="flex gap-1 items-center before:content-['•'] before:mr-0.5">
          <Icons.LeftClick /> Left Click + <Icons.Drag /> Drag
        </div>
      </div>
      <div>
        <h3>Zoom</h3>
        <div className="space-y-1">
          <div className="flex gap-1 items-center before:content-['•'] before:mr-0.5">
            <Icons.RightClick /> Right Click + <Icons.Drag /> Drag
          </div>
          <div className="flex gap-1 items-center before:content-['•'] before:mr-0.5">
            <Icons.Scroll /> Scroll
          </div>
        </div>
      </div>
      <div>
        <h3>Rotate</h3>
        <div className="space-y-1">
          <div className="flex gap-1 items-center before:content-['•'] before:mr-0.5">
            <Icons.MiddleClick /> Middle Click + <Icons.Drag /> Drag
          </div>
          <div className="flex gap-1 items-center before:content-['•'] before:mr-0.5">
            <kbd>CTRL</kbd> +
            <Icons.LeftClick /> Left Click +
            <Icons.Drag /> Drag
          </div>
        </div>
      </div>
    </div>
  );
};

const TouchControls = () => {
  return (
    <div className="space-y-2">
      <div>
        <h3>Pan</h3>
        <div className="flex gap-1 items-center before:content-['•'] before:mr-0.5">
          <Icons.DragOneFinger /> One finger drag
        </div>
      </div>
      <div>
        <h3>Zoom</h3>
        <div className="flex gap-1 items-center before:content-['•'] before:mr-0.5">
          <Icons.Pinch /> Pinch with two fingers
        </div>
      </div>
      <div>
        <h3>Tilt</h3>
        <div className="flex gap-1 items-center before:content-['•'] before:mr-0.5">
          <Icons.TapTwoFinger /> Two finger drag in the same direction
        </div>
      </div>
      <div>
        <h3>Rotate</h3>
        <div className="flex gap-1 items-center before:content-['•'] before:mr-0.5">
          <Icons.RotateTwoFinger /> Two finger drag in the opposite direction
        </div>
      </div>
    </div>
  );
};
