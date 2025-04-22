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
          <Dialog.Description>
            NUS Digital Twin is an{' '}
            <a className="link" href="http://github.com/city-Syntax/nus-digital-twin" target="_blank" rel="noreferrer">
              open-source project
            </a>{' '}
            developed by{' '}
            <a className="link" href="https://www.citysyntax.io" target="_blank" rel="noreferrer">
              City Syntax Lab
            </a>
            .<h3>Conferences</h3>
            <div>
              Ang, Y.Q., Ong, L., Teo, J., Gan, J.L. (2024) Crowdsourced Campus Digital Twin for Building Performance
              Simulation Teaching and Research.{' '}
              <i>The 5th Asia Conference of International Building Performance Simulation Association 2024</i>.
            </div>
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AboutModal;
