import React from 'react';
import Styles from '../styles/Navigation.module.css';

interface LeftPanelProps {
  title: string;
  children?: React.ReactNode;
}

const LeftPanel = ({ title, children }: LeftPanelProps) => {
  return (
    <div className={Styles.leftpanel}>
      <div>
        <h2>{title}</h2>
      </div>
      <>{children}</>
    </div>
  );
};

const AboutNUSCampus = () => {
  return (
    <LeftPanel title="About NUS Campus">
      <div>Hello World!</div>
    </LeftPanel>
  );
};

const StreetCenterlines = () => {
  return (
    <LeftPanel title="Layers: Street Centerlines">
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

const BuildingFootprints = () => {
  return (
    <LeftPanel title="Layers: Building Footprints">
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

const GreenSpaces = () => {
  return (
    <LeftPanel title="Layers: Green Spaces">
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

const WaterBodies = () => {
  return (
    <LeftPanel title="Layers: Water Bodies">
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

const OSMBuildings = () => {
  return (
    <LeftPanel title="Layers: OSM Buildings">
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

const RhinoModels = () => {
  return (
    <LeftPanel title="Layers: Rhino Models">
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

const BIMModels = () => {
  return (
    <LeftPanel title="Layers: BIM Models">
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

const Buildings = () => {
  return (
    <LeftPanel title="Controls: Buildings">
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

const Energy = () => {
  return (
    <LeftPanel title="Controls: Energy">
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

const ThermalComfort = () => {
  return (
    <LeftPanel title="Controls: Thermal Comfort">
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

const Wind = () => {
  return (
    <LeftPanel title="Controls: Wind">
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

const Solar = () => {
  return (
    <LeftPanel title="Controls: Solar">
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

const Help = () => {
  return (
    <LeftPanel title="Help">
      <div>This feature is under construction.</div>
    </LeftPanel>
  );
};

const Settings = () => {
  return (
    <LeftPanel title="Settings">
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
