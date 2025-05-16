import { useEffect, useState } from 'react';
import CloseButton from './CloseButton';
import { ResponsiveBar, type BarDatum, type ComputedDatum } from '@nivo/bar';
import buildingsData from '../../content/buildings/buildings.json';
import { useStore } from '@nanostores/react';
import { activePages, buildingId } from '../../store';
import Select from '../primitives/Select';
import DownloadButton from '../primitives/DownloadButton';
import type { EnergyGraphType } from '../../types';
import ScrollContainer from '../primitives/ScrollContainer';
import Icons from '../Icons';
import type { EnergyProperties } from '../../content.config';
const energyData = import.meta.glob('../../content/energy/*.json');

type EnergyProps = {
  graphType: EnergyGraphType;
  setGraphType: (graphType: EnergyGraphType) => void;
};

const keys: Array<keyof EnergyProperties> = ['equipment', 'lighting', 'cooling', 'heating', 'hotWater'];

const Energy = ({ graphType, setGraphType }: EnergyProps) => {
  const $buildingId = useStore(buildingId);
  const [data, setData] = useState<BarDatum[] | null>(null);
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
      setData(res.default as BarDatum[]);
    });
  }, [$buildingId, graphType]);

  return (
    <>
      <div className="menubar-content-header">
        <h2>Controls: Energy</h2>
        <CloseButton page="energy"></CloseButton>
      </div>
      <ScrollContainer>
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
                <>
                  <EnergyChart
                    data={data}
                    graphType={graphType}
                    title={`Building: ${buildingProperties.name}`}
                  ></EnergyChart>
                </>
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
      </ScrollContainer>
      {buildingProperties && (
        <div className="menubar-content-footer flex lg:hidden">
          <button
            className="flex text-left "
            onClick={() => {
              activePages.set({
                left: 'building-info',
                right: '',
                bottom: 'building-info',
              });
            }}
          >
            <Icons.Data className="size-4 shrink-0" />
            View data about {buildingProperties.name}
          </button>
        </div>
      )}
    </>
  );
};

export default Energy;

const EnergyChart = ({ data, graphType, title }: { data: BarDatum[]; graphType: EnergyGraphType; title?: string }) => {
  const colors: Partial<Record<keyof EnergyProperties, string>> = {
    cooling: '#2563eb',
    lighting: '#eab308',
    equipment: '#6b7280',
    heating: '#f87171',
    hotWater: '#fecaca',
  };

  const getColor = (bar: ComputedDatum<BarDatum>) => {
    return colors[bar.id as keyof typeof colors] || '#000000';
  };

  return (
    <div style={{ height: '208px' }}>
      <ResponsiveBar
        theme={{
          legends: {
            text: {
              fontFamily: 'inherit',
              fill: 'var(--color-foreground)',
            },
          },
          axis: {
            ticks: {
              text: {
                fontFamily: 'inherit',
                fill: 'var(--color-foreground)',
              },
            },
            legend: {
              text: {
                fontFamily: 'inherit',
                fill: 'var(--color-foreground)',
              },
            },
          },
        }}
        enableLabel={false}
        data={data}
        keys={keys}
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
          legend: title,
          legendPosition: 'end',
          legendOffset: -132,
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
        ariaLabel={graphType === 'eu' ? 'Energy use graph' : 'Energy use intensity graph'}
      />
    </div>
  );
};
