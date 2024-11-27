import CloseButton from './CloseButton';
import ScrollContainer from '../primitives/ScrollContainer';

const Resources = () => {
  return (
    <>
      <div className="menubar-content-header">
        <h2>Resources</h2>
        <CloseButton page="resources"></CloseButton>
      </div>
      <ScrollContainer>
        <div className="menubar-content-body">Hello</div>
      </ScrollContainer>
    </>
  );
};

export default Resources;
