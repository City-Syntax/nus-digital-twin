import React, { useEffect } from 'react';
import Icons from '../Icons';
import { activeModel } from '../../store';

const NotificationsBox = () => {
  const removeElement = (element: HTMLElement | null) => {
    if (!element) {
      return;
    }

    element.classList.add('notification--state-hide');
    setTimeout(() => (element.style.display = 'none'), 150);
  };

  const addElement = (element: HTMLElement | null) => {
    if (!element) {
      return;
    }
    element.style.display = '';
    setTimeout(() => element.classList.remove('notification--state-hide'), 0);
  };

  useEffect(() => {
    activeModel.subscribe((val) => {
      const buildingsAlert = document.querySelector<HTMLElement>('#no-buildings-alert');
      if (val === '') {
        addElement(buildingsAlert);
      } else {
        removeElement(buildingsAlert);
      }
    });
  }, []);

  return (
    <div id="notifications-box">
      <a
        className="notification notification--primary"
        href="https://forms.gle/SbtKCbAqF1AKzKhi7"
        target="_blank"
        rel="noreferrer"
        id="construction"
      >
        This application is under construction. Report any issues or feedback here.
      </a>
      <div className="notification notification--danger notification--state-hide" id="no-buildings-alert">
        <Icons.Warning /> No building models selected.
      </div>
    </div>
  );
};

export default NotificationsBox;
