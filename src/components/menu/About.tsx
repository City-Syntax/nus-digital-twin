import CloseButton from './CloseButton';
import ScrollContainer from '../primitives/ScrollContainer';
import MenuLinks from './MenuLinks';
import MenuLink from './MenuLink';

const About = () => {
  return (
    <>
      <div className="menubar-content-header">
        <h2>About</h2>
        <CloseButton page="about"></CloseButton>
      </div>
      <ScrollContainer>
        <div className="menubar-content-body">
          <div className="menu-list">
            <div className="hide-sm">
              <MenuLink toPage="resources" label="Resources" iconName="Resources" dir="bottom" isBottom></MenuLink>
            </div>
            <MenuLinks.About dir="bottom"></MenuLinks.About>
          </div>
        </div>
      </ScrollContainer>
    </>
  );
};

export default About;
