import CloseButton from './CloseButton';

const Citations = () => {
  return (
    <>
      <div className="menubar-content-header">
        <h2>Citations</h2>
        <CloseButton page="citations"></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div>
          NUS Digital Twin is an{' '}
          <a className="link" href="http://github.com/City-Syntax/nus-digital-twin" target="_blank" rel="noreferrer">
            open-source project
          </a>{' '}
          developed by{' '}
          <a className="link" href="https://www.citysyntax.io" target="_blank" rel="noreferrer">
            City Syntax Lab
          </a>
          .
        </div>
        <div>
          <h3>Publications</h3>
          <div>
            Ang, Y. Q., Ong, L., Teo, J., Gan, J. V., & Han, J. (2025). Advancing building performance simulation
            education through a crowdsourced campus digital twin.{' '}
            <i>Journal of Building Performance Simulation, 1–25</i>.{' '}
            <a
              className="link"
              href="https://doi.org/10.1080/19401493.2025.2493866"
              target="_blank"
              rel="noreferrer"
              style={{ wordBreak: 'break-all' }}
            >
              https://doi.org/10.1080/19401493.2025.2493866
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Citations;
