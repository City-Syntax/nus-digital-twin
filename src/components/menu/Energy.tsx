import React, { useEffect, useState } from 'react';
import CloseButton from './CloseButton';
import { ResponsiveBar, type BarDatum, type ComputedBarDatum, type ComputedDatum } from '@nivo/bar';
import buildingsData from '../../content/buildings/buildings.json';
import { useStore } from '@nanostores/react';
import { buildingId } from '../../store';
import Select from '../primitives/Select';
const energyData = import.meta.glob('../../content/energy/*.json');

type EnergyGraphType = 'eu' | 'eui';

const Energy = () => {
  const $buildingId = useStore(buildingId);
  const [data, setData] = useState<any>(null);
  const [graphType, setGraphType] = useState<EnergyGraphType>('eu');

  const handleSelect = (newId = $buildingId) => {
    const buildingProperties = buildingsData.filter((d) => d.elementId == newId)[0];
    console.log('hello');
    if (
      !newId ||
      (graphType === 'eu' && !buildingProperties.energyUse) ||
      (graphType === 'eui' && !buildingProperties.energyUseIntensity)
    ) {
      setData(null);
      return;
    }

    energyData[
      `../../content/energy/${graphType === 'eu' ? buildingProperties.energyUse : buildingProperties.energyUseIntensity}.json`
    ]().then((res: any) => {
      setData(res.default);
    });
  };

  useEffect(() => {
    handleSelect();
  }, [$buildingId, graphType]);

  const colors = {
    cooling: '#2563eb',
    lighting: '#eab308',
    equipment: '#6b7280',
    heating: '#f87171',
    hotWater: '#fecaca',
  };
  const getColor = (bar: ComputedDatum<BarDatum>) => {
    return colors[bar.id as keyof typeof colors];
  };

  return (
    <>
      <div className="menubar-content-header">
        <h2>Controls: Energy</h2>
        <CloseButton page="energy"></CloseButton>
      </div>
      <div className="menubar-content-body">
        <Select<EnergyGraphType>
          value={graphType}
          onValueChange={(value) => {
            setGraphType(value);
          }}
          options={[
            { id: 'eu', label: 'Energy Use' },
            { id: 'eui', label: 'Energy Use Intensity' },
          ]}
        ></Select>
        {$buildingId === '' ? (
          <p>No building selected.</p>
        ) : !data ? (
          <p>No data available for {buildingsData.filter((d) => d.elementId == $buildingId)[0].name}.</p>
        ) : (
          <div style={{ height: '208px' }}>
            <ResponsiveBar
              theme={{
                legends: {
                  text: {
                    fontFamily: 'inherit',
                    fill: 'rgba(var(--base-content))',
                  },
                },
                axis: {
                  ticks: {
                    text: {
                      fontFamily: 'inherit',
                      fill: 'rgba(var(--base-content))',
                    },
                  },
                  legend: {
                    text: {
                      fontFamily: 'inherit',
                      fill: 'rgba(var(--base-content))',
                    },
                  },
                },
              }}
              enableLabel={false}
              data={data}
              keys={['equipment', 'lighting', 'cooling', 'heating', 'hotWater']}
              indexBy="month"
              margin={{ top: 20, right: 30, bottom: 70, left: 80 }}
              padding={0.3}
              valueScale={{ type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              colors={getColor}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                truncateTickAt: 0,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'kWh',
                legendPosition: 'middle',
                legendOffset: -60,
                truncateTickAt: 0,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{
                from: 'color',
                modifiers: [['brighter', 2]],
              }}
              tooltip={({ id, value }) => {
                return (
                  <div className="tooltip">
                    {id}: {value}
                  </div>
                );
              }}
              legends={[
                {
                  dataFrom: 'keys',
                  anchor: 'bottom',
                  direction: 'row',
                  justify: false,
                  translateX: -25,
                  translateY: 68,
                  itemsSpacing: 2,
                  itemWidth: 70,
                  itemHeight: 30,
                  itemDirection: 'top-to-bottom',
                  itemOpacity: 0.85,
                  symbolSize: 10,
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              role="application"
              ariaLabel="Nivo bar chart demo"
              barAriaLabel={(e) => e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Energy;
