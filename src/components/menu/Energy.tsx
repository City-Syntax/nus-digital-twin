import React, { useEffect, useState } from 'react';
import CloseButton from './CloseButton';
import { ResponsiveBar } from '@nivo/bar';
import buildingsData from '../../content/buildings/buildings.json';
import { useStore } from '@nanostores/react';
import { buildingId } from '../../store';
const energyData = import.meta.glob('../../content/energy/*.json');

const Energy = () => {
  const $buildingId = useStore(buildingId);
  const [data, setData] = useState<any>(null);
  const [isEnergyUse, setIsEnergyUse] = useState(false);

  const handleSelect = (newId = $buildingId) => {
    const buildingProperties = buildingsData.filter((d) => d.elementId == newId)[0];
    if (
      !newId ||
      (!isEnergyUse && !buildingProperties.energyUse) ||
      (isEnergyUse && !buildingProperties.energyUseIntensity)
    ) {
      setData(null);
      return;
    }

    energyData[
      `../../content/energy/${isEnergyUse ? buildingProperties.energyUseIntensity : buildingProperties.energyUse}.json`
    ]().then((res: any) => {
      setData(res.default);
    });
  };

  useEffect(() => {
    handleSelect();
  }, []);

  buildingId.listen((newId) => {
    if (!newId) {
      return;
    }
    handleSelect(newId);
  });

  const colors = {
    cooling: '#2563eb',
    lighting: '#eab308',
    equipment: '#6b7280',
    heating: '#f87171',
    hotWater: '#fecaca',
  };
  const getColor = (bar: any) => {
    return colors[bar.id as keyof typeof colors];
  };

  return (
    <>
      <div className="menubar-content-header">
        <h2>Controls: Energy</h2>
        <CloseButton page="energy"></CloseButton>
      </div>
      <div className="menubar-content-body">
        {$buildingId === '' ? (
          <p>No building selected.</p>
        ) : !data ? (
          <p>No data available for {buildingsData.filter((d) => d.elementId == $buildingId)[0].name}.</p>
        ) : (
          <div style={{ height: '208px' }}>
            <ResponsiveBar
              theme={{
                tooltip: {
                  wrapper: {
                    zIndex: 1000,
                  },
                },
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
              margin={{ top: 20, right: 10, bottom: 70, left: 70 }}
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
              tooltip={({ label, value }) => {
                return (
                  <div className="tooltip">
                    {label}: {value}
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
