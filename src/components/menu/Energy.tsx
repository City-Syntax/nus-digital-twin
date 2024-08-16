import React from 'react';
import CloseButton from './CloseButton';
import { ResponsiveBar } from '@nivo/bar';

const Energy = () => {
  const colors = { cool: '#2563eb', light: '#eab308', equip: '#6b7280' };
  const getColor = (bar: any) => {
    return colors[bar.id as keyof typeof colors];
  };
  const data = [
    {
      month: 'AD',
      cool: 93,
      light: 75,
      equip: 189,
    },
    {
      month: 'AE',
      cool: 53,
      light: 121,
      equip: 76,
    },
    {
      month: 'AF',
      cool: 93,
      light: 86,
      equip: 88,
    },
    {
      month: 'AG',
      cool: 154,
      light: 92,
      equip: 49,
    },
    {
      month: 'AI',
      cool: 17,
      light: 41,
      equip: 175,
    },
    {
      month: 'AL',
      cool: 111,
      light: 18,
      equip: 150,
    },
    {
      month: 'AM',
      cool: 108,
      light: 130,
      equip: 199,
    },
  ];

  return (
    <>
      <div className="menubar-content-header">
        <h2>Controls: Energy</h2>
        <CloseButton page="energy"></CloseButton>
      </div>
      <div className="menubar-content-body" style={{ height: '300px' }}>
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
          data={data}
          keys={['equip', 'light', 'cool']}
          indexBy="month"
          margin={{ top: 20, right: 90, bottom: 50, left: 60 }}
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
            legend: 'month',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'kWh',
            legendPosition: 'middle',
            legendOffset: -40,
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
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 16,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 16,
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
    </>
  );
};

export default Energy;
