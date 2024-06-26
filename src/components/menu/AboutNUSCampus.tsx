import React from 'react';
import CloseButton from './CloseButton';
import Carousel from '../primitives/Carousel';

const AboutNUSCampus = () => {
  return (
    <>
      <div className="menubar-content-header">
        <h2>About NUS Campus</h2>
        <CloseButton></CloseButton>
      </div>
      <div className="menubar-content-body">
        <p>Hello World!</p>
        <Carousel
          imageSources={[
            '/src/assets/mapbox-dark.png',
            '/src/assets/mapbox-satellite.png',
            '/src/assets/mapbox-street.png',
          ]}
        ></Carousel>
        <p>Hello World!</p>
      </div>
    </>
  );
};

export default AboutNUSCampus;
