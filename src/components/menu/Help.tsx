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
        <div>
          <h3>Pan</h3>
          {controlType === 'mouse' ? (
            <ul className="help__content list--bullet">
              <li>
                <Icons.LeftClick /> Left Click + <Icons.Drag /> Drag
              </li>
              <li>
                <Icons.Scroll /> Scroll
              </li>
            </ul>
          ) : (
            <p>Drag with one finger</p>
          )}
        </div>
        <div>
          <h3>Zoom</h3>
          {controlType === 'mouse' ? (
            <ul className="help__content list--bullet">
              <li>
                <Icons.RightClick /> Right Click + <Icons.Drag /> Drag
              </li>
            </ul>
          ) : (
            <div className="help__content">
              <p>Drag with one finger</p>
            </div>
          )}
        </div>
        <div>
          <h3>Rotate</h3>
          {controlType === 'mouse' ? (
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
          ) : (
            <p>Drag with one finger</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Help;
