import React from 'react';
import CloseButton from './CloseButton';
import { useStore } from '@nanostores/react';
import { userSettings } from '../../store';
import ScrollContainer from '../primitives/ScrollContainer';

const Settings = () => {
  const $userSettings = useStore(userSettings);
  return (
    <>
      <div className="menubar-content-header">
        <h2>Settings</h2>
        <CloseButton page="settings"></CloseButton>
      </div>
      <ScrollContainer>
        <div className="menubar-content-body">
          <div>
            <h3>Move camera on search</h3>
            <div className="hint">Adjust the camera view when selecting a building via the search bar.</div>
            <div className="btn-group">
              <button
                className={`${$userSettings.moveCameraOnSearch ? 'active' : ''}`}
                onClick={() => userSettings.setKey('moveCameraOnSearch', true)}
              >
                Enable
              </button>
              <button
                className={`${!$userSettings.moveCameraOnSearch ? 'active' : ''}`}
                onClick={() => userSettings.setKey('moveCameraOnSearch', false)}
              >
                Disable
              </button>
            </div>
          </div>
          <div>
            <h3>Motion effects</h3>
            <div className="hint">
              Control animations on the application. Turning off motion effects may increase performance.
            </div>
            <div className="btn-group">
              <button
                className={`${!$userSettings.reducedMotion ? 'active' : ''}`}
                onClick={() => userSettings.setKey('reducedMotion', false)}
              >
                On
              </button>
              <button
                className={`${$userSettings.reducedMotion ? 'active' : ''}`}
                onClick={() => userSettings.setKey('reducedMotion', true)}
              >
                Off
              </button>
            </div>
          </div>
        </div>
      </ScrollContainer>
    </>
  );
};

export default Settings;
