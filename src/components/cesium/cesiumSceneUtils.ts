import buildingsData from '../../content/buildings/buildings.json';

const buildingsToShow = buildingsData
  .map((building) => building.elementId)
  .map((id) => ["${feature['elementId']} === " + id, true]);

export const OSM_SHOW_CONDITIONS = [...buildingsToShow, [true, false]];

export const OSM_DISTANCE_COLORS = [
  ['${distance} > 0.0155', "color('#08498a')"],
  ['${distance} > 0.015', "color('#085395')"],
  ['${distance} > 0.0145', "color('#085da0')"],
  ['${distance} > 0.014', "color('#0867ab')"],
  ['${distance} > 0.0135', "color('#0f6faf')"],
  ['${distance} > 0.013', "color('#1878b4')"],
  ['${distance} > 0.0125', "color('#2081b8')"],
  ['${distance} > 0.012', "color('#298abd')"],
  ['${distance} > 0.0115', "color('#3192c1')"],
  ['${distance} > 0.011', "color('#3a9cc7')"],
  ['${distance} > 0.0105', "color('#42a6cc')"],
  ['${distance} > 0.01', "color('#4bb0d1')"],
  ['${distance} > 0.0095', "color('#54b6d1')"],
  ['${distance} > 0.009', "color('#5fbdcd')"],
  ['${distance} > 0.0085', "color('#6bc3c9')"],
  ['${distance} > 0.008', "color('#76c9c6')"],
  ['${distance} > 0.0075', "color('#80cec2')"],
  ['${distance} > 0.007', "color('#8bd2bf')"],
  ['${distance} > 0.0065', "color('#97d6bb')"],
  ['${distance} > 0.006', "color('#a2dbb7')"],
  ['${distance} > 0.0055', "color('#abdeb6')"],
  ['${distance} > 0.005', "color('#b4e2ba')"],
  ['${distance} > 0.0045', "color('#bde5be')"],
  ['${distance} > 0.004', "color('#c6e9c2')"],
  ['${distance} > 0.0035', "color('#cdebc6')"],
  ['${distance} > 0.003', "color('#d2edcc')"],
  ['${distance} > 0.0025', "color('#d7efd1')"],
  ['${distance} > 0.002', "color('#dcf1d7')"],
  ['${distance} > 0.0015', "color('#e1f3dc')"],
  ['${distance} > 0.001', "color('#e6f6e1')"],
  ['${distance} > 0.0005', "color('#ecf8e6')"],
];
