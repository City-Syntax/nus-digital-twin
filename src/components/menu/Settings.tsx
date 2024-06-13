import React from 'react';
import CloseButton from './CloseButton';
import { useStore } from '@nanostores/react';
import { userSettings } from '../../store';

const Settings = () => {
  const $userSettings = useStore(userSettings);
  return (
    <>
      <div className="menubar-content-header">
        <h2>Settings</h2>
        <CloseButton></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div>
          <h3>Move camera on search</h3>
          <div className="hint">Adjust the camera view when selecting a building via the search bar.</div>
          <div className="btn-group">
            <button
              className={`${$userSettings.moveCameraOnSearch ? 'active' : ''}`}
              onClick={() => {
                userSettings.set({ ...$userSettings, moveCameraOnSearch: true });
              }}
            >
              Enable
            </button>
            <button
              className={`${!$userSettings.moveCameraOnSearch ? 'active' : ''}`}
              onClick={() => {
                userSettings.set({ ...$userSettings, moveCameraOnSearch: false });
              }}
            >
              Disable
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
