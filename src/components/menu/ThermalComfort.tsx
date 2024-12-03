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
            <h3>Diurnal Averages</h3>
            <div>
              <LazyImage ratio="13/8" img={{ src: '/src/assets/thermal-comfort/DiurnalAverages.png' }} />
            </div>
          </div>
        </div>
      </ScrollContainer>
    </>
  );
};

export default ThermalComfort;
