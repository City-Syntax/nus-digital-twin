import React from 'react';
import CloseButton from './CloseButton';
import LazyImage from '../primitives/LazyImage';

const Solar = () => {
  return (
    <>
      <div className="menubar-content-header">
        <h2>Controls: Solar</h2>
        <CloseButton page="solar"></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div>
          <h3>Global Horizontal Radiation</h3>
          <div>
            <LazyImage ratio="13/7" img={{ src: '/src/assets/solar/GlobalHorizontalRadiation.png' }} />
          </div>
        </div>
        <div>
          <h3>Diffuse Horizontal Radiation</h3>
          <div>
            <LazyImage ratio="13/7" img={{ src: '/src/assets/solar/DiffuseHorizontalRadiation.png' }} />
          </div>
        </div>
        <div>
          <h3>Direct Normal Radiation</h3>
          <div>
            <LazyImage ratio="13/7" img={{ src: '/src/assets/solar/DirectNormalRadiation.png' }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Solar;
