import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Icons from '../Icons';

const guides = [
  { label: 'User Guide', href: '/user-guide' },
  { label: 'Developer Guide', href: '/dev-guide' },
  { label: 'Tutorial Videos', href: '/tutorials' },
  { label: 'API Reference', href: '/api-reference' },
];

type GuideDropdownProps = {
  label: String;
};

const GuideDropdown = ({ label }: GuideDropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="group flex items-center gap-2 cursor-pointer color-(--sl-color-white) bg-transparent px-0 py-2 transition-colors duration-100 text-(--sl-color-white) hover:text-(--sl-color-gray-2) data-open:text-(--sl-color-gray-2)">
        <div>{label}</div>
        <Icons.ChevronDown className="h-4"></Icons.ChevronDown>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          className="z-10 flex flex-col gap-2 rounded-lg bg-(--sl-color-black) border border-(--sl-color-gray-5) px-4 py-3"
        >
          {guides.map((guide) => {
            return (
              <DropdownMenu.Item
                className="no-underline text-(--sl-color-gray-2) hover:text-(--sl-color-white) hover:outline-none"
                asChild
                key={guide.href}
              >
                <a href={guide.href}>{guide.label}</a>
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default GuideDropdown;
