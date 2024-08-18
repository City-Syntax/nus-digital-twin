import CloseButton from './CloseButton';
import Icons from '../Icons';

const Learning = () => {
  return (
    <>
      <div className="menubar-content-header">
        <h2>Learning</h2>
        <CloseButton page="learning"></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div className="menu-list">
          <a className="menu-link" href="/tutorials">
            <Icons.Learning></Icons.Learning>
            <span>Tutorial Videos</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Learning;
