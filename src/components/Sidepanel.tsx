import React from 'react';

interface SidepanelProps {
  title: string;
  children?: React.ReactNode;
}

const Sidepanel = ({ title, children }: SidepanelProps) => {
  return (
    <div className="sidepanel">
      <div>
        <h2>{title}</h2>
      </div>
      <>{children}</>
    </div>
  );
};

const AboutNUSCampus = () => {
  return (
    <Sidepanel title="About NUS Campus">
      <div>Hello World!</div>
    </Sidepanel>
  );
};

const StreetCenterlines = () => {
  return (
    <Sidepanel title="Layers: Street Centerlines">
      <div>This feature is under construction.</div>
    </Sidepanel>
  );
};

const BuildingFootprints = () => {
  return (
    <Sidepanel title="Layers: Building Footprints">
      <div>This feature is under construction.</div>
    </Sidepanel>
  );
};

const GreenSpaces = () => {
  return (
    <Sidepanel title="Layers: Green Spaces">
      <div>This feature is under construction.</div>
    </Sidepanel>
  );
};

const WaterBodies = () => {
  return (
    <Sidepanel title="Layers: Water Bodies">
      <div>This feature is under construction.</div>
    </Sidepanel>
  );
};

const OSMBuildings = () => {
  return (
    <Sidepanel title="Layers: OSM Buildings">
      <div>This feature is under construction.</div>
    </Sidepanel>
  );
};

const RhinoModels = () => {
  return (
    <Sidepanel title="Layers: Rhino Models">
      <div>This feature is under construction.</div>
    </Sidepanel>
  );
};

const BIMModels = () => {
  return (
    <Sidepanel title="Layers: BIM Models">
      <div>This feature is under construction.</div>
    </Sidepanel>
  );
};

const Buildings = () => {
  return (
    <Sidepanel title="Controls: Buildings">
      <div>This feature is under construction.</div>
    </Sidepanel>
  );
};

const Energy = () => {
  return (
    <Sidepanel title="Controls: Energy">
      <div>This feature is under construction.</div>
    </Sidepanel>
  );
};

const ThermalComfort = () => {
  return (
    <Sidepanel title="Controls: Thermal Comfort">
      <div>This feature is under construction.</div>
    </Sidepanel>
  );
};

const Wind = () => {
  return (
    <Sidepanel title="Controls: Wind">
      <div>This feature is under construction.</div>
    </Sidepanel>
  );
};

const Solar = () => {
  return (
    <Sidepanel title="Controls: Solar">
      <div>This feature is under construction.</div>
    </Sidepanel>
  );
};

const Help = () => {
  return (
    <Sidepanel title="Help">
      <div>This feature is under construction.</div>
    </Sidepanel>
  );
};

const Settings = () => {
  return (
    <Sidepanel title="Settings">
      <div>This feature is under construction.</div>
    </Sidepanel>
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
