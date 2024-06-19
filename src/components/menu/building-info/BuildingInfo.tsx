import React from 'react';
import { buildingId } from '../../../store';
import { useStore } from '@nanostores/react';
import { SECTIONS_TO_DISPLAY, TITLE_MAPPINGS, CATEGORY_MAPPINGS } from './buildingInfoUtils';
import type { BuildingInfoCategories } from '../../../types';
import CategorySelect from './CategorySelect';
import type { BuildingPropertiesProps } from '../../../content/config';
import buildingsData from '../../../content/buildings/buildings.json';
import CloseButton from '../CloseButton';
import Icons from '../../Icons';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

type BuildingInfoProps = {
  category: BuildingInfoCategories;
  setCategory: (category: BuildingInfoCategories) => void;
};

const BuildingInfo = ({ category, setCategory }: BuildingInfoProps) => {
  const $buildingId = useStore(buildingId);
  const buildingProperties = buildingsData.filter((d) => d.elementId == $buildingId)[0];
  const propertiesToDisplay = Object.entries(buildingProperties).filter((data) =>
    SECTIONS_TO_DISPLAY[category].includes(data[0] as keyof BuildingPropertiesProps),
  );
  buildingId.listen(() => setCategory('general'));

  return (
    <>
      <div className="menubar-content-header">
        <h2>{buildingProperties.name}</h2>
        <CloseButton></CloseButton>
      </div>
      <div className="menubar-content-body">
        <CategorySelect
          value={category}
          onValueChange={(value: BuildingInfoCategories) => setCategory(value)}
        ></CategorySelect>
        {propertiesToDisplay.length < 1 && <p>No information under '{CATEGORY_MAPPINGS[category]}' yet.</p>}
        {propertiesToDisplay.map((data) => {
          const title = data[0] as keyof BuildingPropertiesProps;
          const content = data[1];
          return (
            <div key={title}>
              <h3>{TITLE_MAPPINGS[title]}</h3>
              {title === 'downloads' ? <DownloadButtons content={content}></DownloadButtons> : <p>{content}</p>}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BuildingInfo;

const DownloadButtons = ({
  content,
}: {
  content: { type: string; credits?: string; files: { filetype: string; url: string }[] }[];
}) => {
  return (
    <>
      <div className="download-btn-container">
        {content.map((c) => (
          <div>
            {c.type && (
              <div className="hint">
                {c.type} models are provided by {c.credits}.
              </div>
            )}
            <div key={c.type} className="download-btn">
              {c.files.length === 1 ? (
                <a href={c.files[0].url} download>
                  Download {c.type} ({c.files[0].filetype})
                </a>
              ) : (
                <>
                  <a href={c.files[0].url} download>
                    Download {c.type}
                  </a>
                  <DownloadDropdown files={c.files}></DownloadDropdown>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const DownloadDropdown = ({ files }: { files: { filetype: string; url: string }[] }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="DropdownMenuTrigger">
        {files[0].filetype}
        <Icons.ChevronDown style={{ marginLeft: '4px' }}></Icons.ChevronDown>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="start" className="DropdownMenuContent">
          {files.map((file) => (
            <DropdownMenu.Item className="DropdownMenuItem" asChild key={file.filetype}>
              <a href={file.url} download>
                {file.filetype}
              </a>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
