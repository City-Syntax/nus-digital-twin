import React from 'react';
import Styles from '../styles/Navigation.module.scss';
import Icons from './Icons';
import { activePage } from '../navStore';

interface PanelProps {
  title: string;
  children?: React.ReactNode;
}

const Panel = ({ title, children }: PanelProps) => {
  return (
    <div className={Styles['panel']}>
      <div>
        <h2>{title}</h2>
        <button type="button" onClick={() => activePage.set('')}>
          <Icons.Close></Icons.Close>
        </button>
      </div>
      <>{children}</>
    </div>
  );
};

const AboutNUSCampus = () => {
  return (
    <Panel title="About NUS Campus">
      <div>Hello World!</div>
    </Panel>
  );
};

const StreetCenterlines = () => {
  return (
    <Panel title="Layers: Street Centerlines">
      <div>This feature is under construction.</div>
    </Panel>
  );
};

const BuildingFootprints = () => {
  return (
    <Panel title="Layers: Building Footprints">
      <div>This feature is under construction.</div>
    </Panel>
  );
};

const GreenSpaces = () => {
  return (
    <Panel title="Layers: Green Spaces">
      <div>This feature is under construction.</div>
    </Panel>
  );
};

const WaterBodies = () => {
  return (
    <Panel title="Layers: Water Bodies">
      <div>This feature is under construction.</div>
    </Panel>
  );
};

const OSMBuildings = () => {
  return (
    <Panel title="Layers: OSM Buildings">
      <div>This feature is under construction.</div>
    </Panel>
  );
};

const RhinoModels = () => {
  return (
    <Panel title="Layers: Rhino Models">
      <div>This feature is under construction.</div>
    </Panel>
  );
};

const BIMModels = () => {
  return (
    <Panel title="Layers: BIM Models">
      <div>This feature is under construction.</div>
    </Panel>
  );
};

const Buildings = () => {
  return (
    <Panel title="Controls: Buildings">
      <div>This feature is under construction.</div>
    </Panel>
  );
};

const Energy = () => {
  return (
    <Panel title="Controls: Energy">
      <div>This feature is under construction.</div>
    </Panel>
  );
};

const ThermalComfort = () => {
  return (
    <Panel title="Controls: Thermal Comfort">
      <div>This feature is under construction.</div>
    </Panel>
  );
};

const Wind = () => {
  return (
    <Panel title="Controls: Wind">
      <div>This feature is under construction.</div>
    </Panel>
  );
};

const Solar = () => {
  return (
    <Panel title="Controls: Solar">
      <div>This feature is under construction.</div>
    </Panel>
  );
};

const Help = () => {
  return (
    <Panel title="Help">
      <div>This feature is under construction.</div>
    </Panel>
  );
};

const Settings = () => {
  return (
    <Panel title="Settings">
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
