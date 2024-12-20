import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Icons from '../Icons';

const guides = [
  { label: 'User Guide', href: '/user-guide' },
  { label: 'Developer Guide', href: '/dev-guide' },
  { label: 'Tutorial Videos', href: '/tutorials' },
  { label: 'API Reference', href: '/api-reference' },
];

const GuideDropdown = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="dropdown-trigger">
        <Icons.ChevronDown height="1rem"></Icons.ChevronDown>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="start" className="dropdown-content">
          {guides.map((guide) => {
            return (
              <DropdownMenu.Item className="dropdown-item" asChild key={guide.href}>
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
