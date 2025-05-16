import MenuLink from './MenuLink';

const MenuBottom = () => {
  return (
    <nav className="bg-base flex justify-between px-5 rounded-menu">
      <div className="menu-list">
        <MenuLink toPage="search" dir="bottom" isVertical isBottom label="Search" iconName="Search"></MenuLink>
      </div>
      <div className="menu-list">
        <MenuLink toPage="about" dir="bottom" isVertical isBottom label="About" iconName="About"></MenuLink>
      </div>
      <div className="menu-list">
        <MenuLink toPage="layers" dir="bottom" isVertical isBottom label="Layers" iconName="Layers"></MenuLink>
      </div>
      <div className="menu-list">
        <MenuLink toPage="controls" dir="bottom" isVertical isBottom label="Controls" iconName="Controls"></MenuLink>
      </div>
      {/* TODO: Fix the important */}
      <div className="menu-list hidden! sm:flex!">
        <MenuLink toPage="resources" dir="bottom" isVertical isBottom label="Resources" iconName="Resources"></MenuLink>
      </div>
      <div className="menu-list">
        <MenuLink toPage="menu" dir="bottom" isVertical isBottom label="Menu" iconName="Menu"></MenuLink>
      </div>
    </nav>
  );
};

export default MenuBottom;
