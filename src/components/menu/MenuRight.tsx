import ScrollContainer from '../primitives/ScrollContainer';
import MenuLinks from './MenuLinks';

const MenuRight = () => {
  return (
    <nav className="bg-base flex flex-col py-4 rounded-menu gap-(--content-gap) w-(--menu-right-width)">
      <ScrollContainer>
        <div className="menubar-body">
          <div className="menu-list">
            <div className="menu-list-title">Controls</div>
            <MenuLinks.Controls dir="right" />
          </div>
          <div className="menu-list">
            <div className="menu-list-title">Resources</div>
            <MenuLinks.Resources />
          </div>
        </div>
      </ScrollContainer>
    </nav>
  );
};

export default MenuRight;
