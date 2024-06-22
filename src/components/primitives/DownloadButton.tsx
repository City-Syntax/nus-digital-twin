import React from 'react';
import type { DownloadFileProps, DownloadProps } from '../../types';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Icons from '../Icons';

const DownloadButton = ({ type, credits, files }: DownloadProps) => {
  return (
    <div>
      {credits && (
        <div className="hint">
          {type} is provided by {credits}.
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

export default DownloadButton;

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
