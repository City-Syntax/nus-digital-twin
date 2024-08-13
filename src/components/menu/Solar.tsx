import React from 'react';
import CloseButton from './CloseButton';

const Solar = () => {
  return (
    <>
      <div className="menubar-content-header">
        <h2>Controls: Solar</h2>
        <CloseButton page="solar"></CloseButton>
      </div>
      <div className="menubar-content-body">
        <p>This feature is under construction.</p>
      </div>
    </>
  );
};

export default Solar;
