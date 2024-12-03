import CloseButton from './CloseButton';
import LazyImage from '../primitives/LazyImage';
import ScrollContainer from '../primitives/ScrollContainer';

const Wind = () => {
  return (
    <>
      <div className="menubar-content-header">
        <h2>Controls: Wind</h2>
        <CloseButton page="wind"></CloseButton>
      </div>
      <ScrollContainer>
        <div className="menubar-content-body">
          <div>
            <h3>Wind Speed</h3>
            <div>
              <LazyImage ratio="13/7" img={{ src: '/src/assets/wind/Wind Speed.png' }} />
            </div>
          </div>
          <div>
            <h3>Wind Rose</h3>
            <div>
              <LazyImage ratio="13/8" img={{ src: '/src/assets/wind/WindRose.png' }} />
            </div>
          </div>
        </div>
      </ScrollContainer>
    </>
  );
};

export default Wind;
