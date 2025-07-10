import type { DownloadFileProps, DownloadProps } from '../../types';
import { DropdownMenu } from 'radix-ui';
import Icons from '../Icons';
import { toastMessage } from '../../store';

const handleClick = () => {
  toastMessage.set({ msg: 'Download started', type: 'default' });
};

const DownloadButton = ({ type, credits, files }: DownloadProps) => {
  return (
    <div>
      {credits && (
        <div className="hint">
          {type} provided by {credits}.
        </div>
      )}
      {files && (
        <div
          key={type}
          className="flex [&>*]:btn [&>*]:btn-secondary [&>*]:btn-sm [&>*]:rounded-none [&>*:first-child]:rounded-l-(--btn-radius)
        [&>*:last-child]:rounded-r-(--btn-radius) [&>*:not(:first-child)]:ml-[1px]"
        >
          {files.length === 1 ? (
            <a href={files[0].url} target="_blank" download onClick={handleClick}>
              Download {type} ({files[0].filetype})
            </a>
          ) : (
            <>
              <a href={files[0].url} target="_blank" download onClick={handleClick}>
                Download {type}
              </a>
              <DownloadDropdown files={files}></DownloadDropdown>
            </>
          )}
        </div>
      )}
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
              <a href={file.url} target="_blank" download onClick={handleClick}>
                {file.filetype}
              </a>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
