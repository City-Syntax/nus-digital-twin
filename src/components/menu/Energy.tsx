import React, { useEffect, useState } from 'react';
import CloseButton from './CloseButton';
import { ResponsiveBar, type BarDatum, type ComputedBarDatum, type ComputedDatum } from '@nivo/bar';
import buildingsData from '../../content/buildings/buildings.json';
import { useStore } from '@nanostores/react';
import { buildingId } from '../../store';
import Select from '../primitives/Select';
import DownloadButton from '../primitives/DownloadButton';
const energyData = import.meta.glob('../../content/energy/*.json');

type EnergyGraphType = 'eu' | 'eui';

const Energy = () => {
  const $buildingId = useStore(buildingId);
  const [data, setData] = useState<any>(null);
  const [graphType, setGraphType] = useState<EnergyGraphType>('eu');
  const buildingProperties = buildingsData.filter((d) => d.elementId == $buildingId)[0];

  useEffect(() => {
    if (
      !$buildingId ||
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
        {$buildingId === '' ? (
          <p>No building selected.</p>
        ) : (
          <>
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
            {!data ? (
              <p>
                No {graphType === 'eu' ? 'energy use' : 'energy use intensity'} data available for{' '}
                {buildingProperties.name}.
              </p>
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
                  margin={{ top: 20, right: 22, bottom: 70, left: 72 }}
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
                    tickSize: 3,
                    tickPadding: 2,
                    tickRotation: 0,
                    legend: graphType === 'eu' ? 'kWh' : <>kWhm&sup2;</>,
                    legendPosition: 'middle',
                    legendOffset: -60,
                    truncateTickAt: 0,
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
            {buildingProperties && buildingProperties.idfDownload && (
              <DownloadButton
                type="IDF"
                files={[{ filetype: '.idf', url: buildingProperties.idfDownload }]}
              ></DownloadButton>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Energy;
