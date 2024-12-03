import CloseButton from './CloseButton';
import LazyImage from '../primitives/LazyImage';
import ScrollContainer from '../primitives/ScrollContainer';

const ThermalComfort = () => {
  return (
    <>
      <div className="menubar-content-header">
        <h2>Controls: Thermal Comfort</h2>
        <CloseButton page="thermal-comfort"></CloseButton>
      </div>
      <ScrollContainer>
        <div className="menubar-content-body">
          <div>
            <h3>University Thermal Comfort Index</h3>
            <div>
              <LazyImage
                ratio="13/7"
                img={{ src: '/src/assets/thermal-comfort/University Thermal Comfort Index.png' }}
              />
            </div>
          </div>
          <div>
            <h3>Diurnal Averages</h3>
            <div>
              <LazyImage ratio="13/8" img={{ src: '/src/assets/thermal-comfort/DiurnalAverages.png' }} />
            </div>
          </div>
          <div>
            <h3>Heat Index</h3>
            <div>
              <LazyImage ratio="13/7" img={{ src: '/src/assets/thermal-comfort/Heat Index.png' }} />
            </div>
          </div>
          <div>
            <h3>Psychrometric Chart</h3>
            <div>
              <LazyImage ratio="13/8" img={{ src: '/src/assets/thermal-comfort/PsychrometricChart.png' }} />
            </div>
          </div>
        </div>
      </ScrollContainer>
    </>
  );
};

export default ThermalComfort;
