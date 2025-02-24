import CloseButton from './CloseButton';
import ScrollContainer from '../primitives/ScrollContainer';
import MenuLinks from './MenuLinks';

const Resources = () => {
  return (
    <>
      <div className="menubar-content-header">
        <h2>Resources</h2>
        <CloseButton page="resources"></CloseButton>
      </div>
      <ScrollContainer>
        <div className="menubar-content-body">
          <div className="menu-list">
            <MenuLinks.Resources></MenuLinks.Resources>
          </div>
        </div>
      </ScrollContainer>
    </>
  );
};

export default Resources;
