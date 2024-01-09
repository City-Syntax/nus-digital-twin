import React from 'react';

const Sidenav = () => {
  return (
    <nav className="nav">
      <div className="nav-header">
        <h1>NUS Digital Twin</h1>
        <button>{`<<`}</button>
      </div>
      <div className="nav-group">
        <div>About</div>
        <button type="button">About NUS Campus</button>
      </div>
      <div className="nav-group">
        <div>GIS Layers</div>
        <button type="button">Street Centerlines</button>
        <button type="button">Building Footprints</button>
        <button type="button">Green Spaces</button>
        <button type="button">Water Bodies</button>
      </div>
      <div className="nav-group">
        <div>Building Data Layers</div>
        <button type="button">OSM Buildings</button>
        <button type="button">Rhino Models</button>
        <button type="button">BIM Models</button>
      </div>
      <div className="nav-group">
        <div>Controls</div>
        <button type="button">Buildings</button>
        <button type="button">Energy</button>
        <button type="button">Thermal Comfort</button>
        <button type="button">Wind</button>
        <button type="button">Solar</button>
      </div>
      <div className="nav-group">
        <button type="button">Help</button>
        <button type="button">Settings</button>
      </div>
    </nav>
  );
};

export default Sidenav;
