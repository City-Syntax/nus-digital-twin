import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { buildingId } from '../../../store';
import { useStore } from '@nanostores/react';
import { SECTIONS_TO_DISPLAY, TITLE_MAPPINGS, CATEGORY_MAPPINGS } from './buildingInfoUtils';
import type { BuildingInfoCategories } from '../../../types';
import CategorySelect from './CategorySelect';
import type { BuildingPropertiesProps } from '../../../content/config';
import buildingsData from '../../../content/buildings/buildings.json';
import CloseButton from '../CloseButton';
import Icons from '../../Icons';

type BuildingInfoProps = {
  category: BuildingInfoCategories;
  setCategory: (category: BuildingInfoCategories) => void;
};

type DownloadFileProps = {
  filetype: string;
  url: string;
};

type DownloadProps = {
  type: string;
  credits?: string;
  files: DownloadFileProps[];
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
              {title === 'downloads' ? (
                <div className="download-btn-container">
                  {content.map((c: DownloadProps) => (
                    <DownloadButton key={c.type} {...c}></DownloadButton>
                  ))}
                </div>
              ) : (
                <p>{content}</p>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BuildingInfo;

const DownloadButton = ({ type, credits, files }: DownloadProps) => {
  return (
    <div>
      {type && (
        <div className="hint">
          {type} models are provided by {credits}.
        </div>
      )}
      <div key={type} className="download-btn">
        {files.length === 1 ? (
          <a href={files[0].url} download>
            Download {type} ({files[0].filetype})
          </a>
        ) : (
          <>
            <a href={files[0].url} download>
              Download {type}
            </a>
            <DownloadDropdown files={files}></DownloadDropdown>
          </>
        )}
      </div>
    </div>
  );
};

const DownloadDropdown = ({ files }: { files: DownloadFileProps[] }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="dropdown-trigger">
        {files[0].filetype}
        <Icons.ChevronDown className="dropdown-icon"></Icons.ChevronDown>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="start" className="dropdown-content">
          {files.map((file) => (
            <DropdownMenu.Item className="dropdown-item" asChild key={file.filetype}>
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
