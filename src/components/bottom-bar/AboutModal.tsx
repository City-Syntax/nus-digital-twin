import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

const AboutModal = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="link">About</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="modal__overlay" />
        <Dialog.Content className="modal__content">
          <Dialog.Title>About NUS Digital Twin</Dialog.Title>
          <div>
            NUS Digital Twin is an{' '}
            <a className="link" href="http://github.com/City-Syntax/nus-digital-twin" target="_blank" rel="noreferrer">
              open-source project
            </a>{' '}
            developed by{' '}
            <a className="link" href="https://www.citysyntax.io" target="_blank" rel="noreferrer">
              City Syntax Lab
            </a>
            .<h3>Publications</h3>
            <div>
              Ang, Y. Q., Ong, L., Teo, J., Gan, J. V., & Han, J. (2025). Advancing building performance simulation
              education through a crowdsourced campus digital twin.{' '}
              <i>Journal of Building Performance Simulation, 1–25</i>.{' '}
              <a
                className="link break-all"
                href="https://doi.org/10.1080/19401493.2025.2493866"
                target="_blank"
                rel="noreferrer"
              >
                https://doi.org/10.1080/19401493.2025.2493866
              </a>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AboutModal;
