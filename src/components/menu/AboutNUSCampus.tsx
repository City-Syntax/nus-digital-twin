import React from 'react';
import CloseButton from './CloseButton';

const AboutNUSCampus = () => {
  return (
    <>
      <div className="menubar-content-header">
        <h2>About NUS Campus</h2>
        <CloseButton></CloseButton>
      </div>
      <div className="menubar-content-body">
        <p>
          The National University of Singapore (NUS) is Singapore's flagship university with its main campus located at
          Kent Ridge.
        </p>
        <div>
          <h3>Size</h3>
          <p>150 hectares</p>
        </div>
        <div>
          <h3>Website</h3>
          <a className="link" rel="noreferrer" target="_blank" href="https://nus.edu.sg">
            nus.edu.sg
          </a>
        </div>
      </div>
    </>
  );
};

export default AboutNUSCampus;
