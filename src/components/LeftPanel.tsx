import React from 'react';
import Styles from '../styles/Navigation.module.css';
import Icons from './Icons';

interface LeftPanelProps {
  title: string;
  handleClick: () => void;
  children?: React.ReactNode;
}

interface LeftPanelChildProps {
  handleClick: () => void;
}

const LeftPanel = ({ title, handleClick, children }: LeftPanelProps) => {
  return (
    <div className={`${Styles['left-panel']} ${Styles['nav-content']}`}>
      <div>
        <h2>{title}</h2>
        <button type="button" onClick={handleClick}>
          <Icons.Close></Icons.Close>
        </button>
      </div>
      <>{children}</>
    </div>
  );
};

const AboutNUSCampus = ({ handleClick }: LeftPanelChildProps) => {
  return (
    <LeftPanel title="About NUS Campus" handleClick={handleClick}>
      <div>Hello World!</div>
    </LeftPanel>
  );
};

const StreetCenterlines = ({ handleClick }: LeftPanelChildProps) => {
  return (
    <LeftPanel title="Layers: Street Centerlines" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

const BuildingFootprints = ({ handleClick }: LeftPanelChildProps) => {
  return (
    <LeftPanel title="Layers: Building Footprints" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

const GreenSpaces = ({ handleClick }: LeftPanelChildProps) => {
  return (
    <LeftPanel title="Layers: Green Spaces" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

const WaterBodies = ({ handleClick }: LeftPanelChildProps) => {
  return (
    <LeftPanel title="Layers: Water Bodies" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

const OSMBuildings = ({ handleClick }: LeftPanelChildProps) => {
  return (
    <LeftPanel title="Layers: OSM Buildings" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

const RhinoModels = ({ handleClick }: LeftPanelChildProps) => {
  return (
    <LeftPanel title="Layers: Rhino Models" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

const BIMModels = ({ handleClick }: LeftPanelChildProps) => {
  return (
    <LeftPanel title="Layers: BIM Models" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

const Buildings = ({ handleClick }: LeftPanelChildProps) => {
  return (
    <LeftPanel title="Controls: Buildings" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

const Energy = ({ handleClick }: LeftPanelChildProps) => {
  return (
    <LeftPanel title="Controls: Energy" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

const ThermalComfort = ({ handleClick }: LeftPanelChildProps) => {
  return (
    <LeftPanel title="Controls: Thermal Comfort" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

const Wind = ({ handleClick }: LeftPanelChildProps) => {
  return (
    <LeftPanel title="Controls: Wind" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

const Solar = ({ handleClick }: LeftPanelChildProps) => {
  return (
    <LeftPanel title="Controls: Solar" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

const Help = ({ handleClick }: LeftPanelChildProps) => {
  return (
    <LeftPanel title="Help" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

const Settings = ({ handleClick }: LeftPanelChildProps) => {
  return (
    <LeftPanel title="Settings" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

export default {
  AboutNUSCampus,
  StreetCenterlines,
  BuildingFootprints,
  GreenSpaces,
  WaterBodies,
  OSMBuildings,
  RhinoModels,
  BIMModels,
  Buildings,
  Energy,
  ThermalComfort,
  Wind,
  Solar,
  Help,
  Settings,
};
