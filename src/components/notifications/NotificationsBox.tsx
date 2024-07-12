import React from 'react';
import Toast from './Toast';

const NotificationsBox = () => {
  return (
    <div className="notifications-box">
      <a href="https://forms.gle/SbtKCbAqF1AKzKhi7" target="_blank" rel="noreferrer" id="construction">
        This application is under construction. Report any issues or feedback here.
      </a>
      <Toast />
    </div>
  );
};

export default NotificationsBox;
