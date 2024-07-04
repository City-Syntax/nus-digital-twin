import React, { useState } from 'react';
import CloseButton from './CloseButton';
import Icons from '../Icons';

const Help = () => {
  const [controlType, setControlType] = useState<'mouse' | 'touch'>('mouse');
  return (
    <>
      <div className="menubar-content-header">
        <h2>Help</h2>
        <CloseButton></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div className="btn-group">
          <button
            type="button"
            onClick={() => setControlType('mouse')}
            className={controlType === 'mouse' ? 'active' : ''}
          >
            Mouse
          </button>
          <button
            type="button"
            onClick={() => setControlType('touch')}
            className={controlType === 'touch' ? 'active' : ''}
          >
            Touch
          </button>
        </div>
        {controlType === 'mouse' ? <MouseControls /> : <TouchControls />}
      </div>
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
