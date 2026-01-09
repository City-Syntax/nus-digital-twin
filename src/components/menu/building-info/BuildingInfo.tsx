import { activePages, buildingId } from '../../../store';
import { useStore } from '@nanostores/react';
import { SECTIONS_TO_DISPLAY, TITLE_MAPPINGS, CATEGORY_MAPPINGS, SORT_ORDER } from './buildingInfoUtils';
import type { BuildingInfoCategories, DownloadProps } from '../../../types';
import type { BuildingPropertiesProps } from '../../../content.config';
import buildingsData from '../../../content/buildings/buildings.json';
import CloseButton from '../CloseButton';
import DownloadButton from '../../primitives/DownloadButton';
import Carousel from '../../primitives/Carousel';
import Icons from '../../Icons';
import ScrollContainer from '../../primitives/ScrollContainer';
import Tippy from '@tippyjs/react';
import Select from '../../primitives/Select';
import { cn } from '@lib/utils';

type BuildingInfoProps = {
  category: BuildingInfoCategories;
  setCategory: (category: BuildingInfoCategories) => void;
};

const BuildingInfo = ({ category, setCategory }: BuildingInfoProps) => {
  const $activePages = useStore(activePages);
  const $buildingId = useStore(buildingId);
  const buildingProperties = buildingsData.filter((d) => d.elementId == $buildingId)[0];
  const propertiesToDisplay = Object.entries(buildingProperties).filter((data) =>
    SECTIONS_TO_DISPLAY[category].includes(data[0] as keyof BuildingPropertiesProps),
  );
  buildingId.listen(() => setCategory('general'));

  // TODO: Refactor to all use ACH
  const isCoreOutsideAirFlowRateInACH = ['54619685'].includes($buildingId);

  console.log(isCoreOutsideAirFlowRateInACH);

  if (buildingId.get() == '54583930') {
    return (
      <>
        <div className="menubar-content-header">
          <h2>{buildingProperties.name}</h2>
          <CloseButton page="building-info"></CloseButton>
        </div>
        <div className="menubar-content-body">
          <div>
            This selection contains 2 buildings. Click on any button below to view specific building-level data.
          </div>
          <button
            className="btn btn-secondary btn-sm w-full"
            onClick={() => buildingId.set('UNIVERSITY_CULTURAL_CENTRE')}
          >
            View data for University Cultural Centre
          </button>
          <button className="btn btn-secondary btn-sm w-full" onClick={() => buildingId.set('NUS_MUSEUM')}>
            View data for NUS Museum
          </button>
        </div>
      </>
    );
  }

  if (['238932766', '238932773'].includes(buildingId.get().toString())) {
    return (
      <>
        <div className="menubar-content-header">
          <h2>{buildingProperties.name}</h2>
          <CloseButton page="building-info"></CloseButton>
        </div>
        <div className="menubar-content-body">
          <div>This selection forms part of the Helix House building.</div>
          <button className="btn btn-secondary btn-sm w-full" onClick={() => buildingId.set('HELIX_HOUSE')}>
            View data for Helix House
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="menubar-content-header">
        <h2>{buildingProperties.name}</h2>
        <CloseButton page="building-info"></CloseButton>
      </div>
      <ScrollContainer key={buildingId.get()}>
        <div className="menubar-content-body">
          <Select<BuildingInfoCategories>
            value={category}
            onValueChange={(value) => setCategory(value)}
            options={Object.entries(CATEGORY_MAPPINGS).map(([id, label]) => ({
              id: id as BuildingInfoCategories,
              label,
            }))}
          ></Select>
          {propertiesToDisplay.length < 1 && <p>No information under '{CATEGORY_MAPPINGS[category]}' yet.</p>}
          {propertiesToDisplay
            .sort((a, b) => {
              const firstTitle = a[0] as keyof BuildingPropertiesProps;
              const secondTitle = b[0] as keyof BuildingPropertiesProps;
              return SORT_ORDER.indexOf(firstTitle) - SORT_ORDER.indexOf(secondTitle);
            })
            .map((data) => {
              return (
                <div key={`${data[0]}-${$buildingId}`}>
                  <BuildingInfoContent
                    title={data[0] as keyof BuildingPropertiesProps}
                    content={data[1]}
                    isACH={isCoreOutsideAirFlowRateInACH}
                  ></BuildingInfoContent>
                </div>
              );
            })}
        </div>
      </ScrollContainer>
      <div className="menubar-content-footer">
        <a
          href={`https://docs.google.com/forms/d/e/1FAIpQLSdPktLMj_Ob6YvreQBa7M4_nd8FXK0sLGwQnCeAd8gtbk9HBw/viewform?entry.1908367072=Issue with building: ${buildingProperties.name} (${$buildingId})`}
          target="_blank"
          rel="noreferrer"
        >
          {/* TODO: Remove the important */}
          <button className="flex text-left hover:text-amber-600!">
            <Icons.Flag className="size-4 shrink-0"></Icons.Flag>
            Report issue
          </button>
        </a>
        <span className="flex gap-2 justify-start">
          {(buildingProperties.energyUse || buildingProperties.energyUseIntensity) && (
            <Tippy
              content={`${$activePages.right === 'energy' ? 'Close' : 'View'} energy use data`}
              arrow={false}
              placement="top-end"
            >
              {/* TODO: Remove the important when migration complete */}
              <button
                className={cn({
                  'text-yellow-500! hover:text-yellow-500!': $activePages.right === 'energy',
                })}
                onClick={() => {
                  if ($activePages.right === 'energy') {
                    activePages.set({
                      left: 'building-info',
                      right: '',
                      bottom: 'building-info',
                    });
                  } else {
                    activePages.set({
                      left: 'building-info',
                      right: 'energy',
                      bottom: 'energy',
                    });
                  }
                }}
              >
                <Icons.Energy></Icons.Energy>
              </button>
            </Tippy>
          )}
          {buildingProperties.buildingDataCredits && (
            <Tippy
              content={`Building data by ${buildingProperties.buildingDataCredits}.`}
              arrow={false}
              placement="top-end"
              maxWidth={'min(calc(100vw - (var(--padding-xs) * 2) - (var(--padding-base)) * 2), 350px)'}
            >
              <button>
                <Icons.About height="20"></Icons.About>
              </button>
            </Tippy>
          )}
        </span>
      </div>
    </>
  );
};

export default BuildingInfo;

const BuildingInfoContent = ({
  title,
  content,
  isACH,
}: {
  title: keyof BuildingPropertiesProps;
  content: any;
  isACH: boolean;
}) => {
  switch (title) {
    case 'downloads':
      return (
        <>
          <h3>{TITLE_MAPPINGS[title]}</h3>
          <div className="flex flex-col gap-2">
            {content.map((c: DownloadProps) => (
              <DownloadButton key={c.type} {...c}></DownloadButton>
            ))}
          </div>
        </>
      );
    case 'images':
      return (
        <>
          <Carousel images={content}></Carousel>
        </>
      );
    case 'floorToFloorHeight':
      if (Array.isArray(content)) {
        return (
          <>
            <h3>{TITLE_MAPPINGS[title]}</h3>
            {content.map((c) => (
              <p key={c.label}>
                {c.label}: {c.value} m
              </p>
            ))}
          </>
        );
      }
      return (
        <>
          <h3>{TITLE_MAPPINGS[title]}</h3>
          <p>{content} m</p>
        </>
      );
    case 'perimeterZoneDepth':
      return (
        <>
          <h3>{TITLE_MAPPINGS[title]}</h3>
          <p>{content} m</p>
        </>
      );
    case 'wallConstruction':
    case 'roofConstruction':
    case 'windowFrameConductance':
      if (typeof content === 'string') {
        return (
          <>
            <h3>{TITLE_MAPPINGS[title]}</h3>
            <p>{content}</p>
          </>
        );
      }
      return (
        <>
          <h3>{TITLE_MAPPINGS[title]}</h3>
          <p>
            U:{Number.isInteger(content) ? content + '.0' : content} W/m<sup>2</sup>K
          </p>
        </>
      );
    case 'northWindowToWallRatio':
    case 'southWindowToWallRatio':
    case 'eastWindowToWallRatio':
    case 'westWindowToWallRatio':
      return (
        <>
          <h3>{TITLE_MAPPINGS[title]}</h3>
          <p>{content}%</p>
        </>
      );
    case 'coreOutsideAirFlowrate':
      return (
        <>
          <h3>{TITLE_MAPPINGS[title]}</h3>
          <p>
            {Number.isInteger(content) ? content + '.0' : content} {isACH ? 'ACH' : 'L/s/Person'}
          </p>
        </>
      );
    case 'windowLeakage':
    case 'perimeterOutsideAirFlowrate':
      return (
        <>
          <h3>{TITLE_MAPPINGS[title]}</h3>
          <p>{Number.isInteger(content) ? content + '.0' : content} ACH</p>
        </>
      );
    case 'thermostatSetPoint':
      if (Array.isArray(content)) {
        return (
          <>
            <h3>{TITLE_MAPPINGS[title]}</h3>
            {content.map((c) => (
              <p key={c.label}>
                {c.label}: {c.value}&deg;C
              </p>
            ))}
          </>
        );
      }
      return (
        <>
          <h3>{TITLE_MAPPINGS[title]}</h3>
          <p>{content}&deg;C</p>
        </>
      );
    case 'coreOccupantDensity':
    case 'perimeterOccupantDensity':
      return (
        <>
          <h3>{TITLE_MAPPINGS[title]}</h3>
          <p>
            {content} pp/m<sup>2</sup>
          </p>
        </>
      );
    case 'coreEquipmentPower':
    case 'perimeterEquipmentPower':
    case 'coreLightingPower':
    case 'perimeterLightingPower':
      return (
        <>
          <h3>{TITLE_MAPPINGS[title]}</h3>
          <p>
            {content} W/m<sup>2</sup>
          </p>
        </>
      );
    case 'occupancySchedule':
    case 'equipmentUsage':
    case 'lightingUsage':
      return (
        <>
          <h3>{TITLE_MAPPINGS[title]}</h3>
          <p>{content} h/wk</p>
        </>
      );
    default:
      return (
        <>
          <h3>{TITLE_MAPPINGS[title]}</h3>
          <p>{content}</p>
        </>
      );
  }
};
