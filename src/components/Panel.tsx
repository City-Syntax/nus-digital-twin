import React from 'react';
import Styles from '../styles/Navigation.module.scss';
import Icons from './Icons';

interface PanelProps {
  title: string;
  handleClick: () => void;
  children?: React.ReactNode;
}

interface PanelChildProps {
  handleClick: () => void;
}

const Panel = ({ title, handleClick, children }: PanelProps) => {
  return (
    <div className={Styles['panel']}>
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

const AboutNUSCampus = ({ handleClick }: PanelChildProps) => {
  return (
    <Panel title="About NUS Campus" handleClick={handleClick}>
      <div>Hello World!</div>
    </Panel>
  );
};

const StreetCenterlines = ({ handleClick }: PanelChildProps) => {
  return (
    <Panel title="Layers: Street Centerlines" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </Panel>
  );
};

const BuildingFootprints = ({ handleClick }: PanelChildProps) => {
  return (
    <Panel title="Layers: Building Footprints" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </Panel>
  );
};

const GreenSpaces = ({ handleClick }: PanelChildProps) => {
  return (
    <Panel title="Layers: Green Spaces" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </Panel>
  );
};

const WaterBodies = ({ handleClick }: PanelChildProps) => {
  return (
    <Panel title="Layers: Water Bodies" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </Panel>
  );
};

const OSMBuildings = ({ handleClick }: PanelChildProps) => {
  return (
    <Panel title="Layers: OSM Buildings" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </Panel>
  );
};

const RhinoModels = ({ handleClick }: PanelChildProps) => {
  return (
    <Panel title="Layers: Rhino Models" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </Panel>
  );
};

const BIMModels = ({ handleClick }: PanelChildProps) => {
  return (
    <Panel title="Layers: BIM Models" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </Panel>
  );
};

const Buildings = ({ handleClick }: PanelChildProps) => {
  return (
    <Panel title="Controls: Buildings" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </Panel>
  );
};

const Energy = ({ handleClick }: PanelChildProps) => {
  return (
    <Panel title="Controls: Energy" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </Panel>
  );
};

const ThermalComfort = ({ handleClick }: PanelChildProps) => {
  return (
    <Panel title="Controls: Thermal Comfort" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </Panel>
  );
};

const Wind = ({ handleClick }: PanelChildProps) => {
  return (
    <Panel title="Controls: Wind" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </Panel>
  );
};

const Solar = ({ handleClick }: PanelChildProps) => {
  return (
    <Panel title="Controls: Solar" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </Panel>
  );
};

const Help = ({ handleClick }: PanelChildProps) => {
  return (
    <Panel title="Help" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </Panel>
  );
};

const Settings = ({ handleClick }: PanelChildProps) => {
  return (
    <Panel title="Settings" handleClick={handleClick}>
      <div>This feature is under construction.</div>
    </Panel>
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
