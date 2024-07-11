import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { toastMessage } from '../../store';

toastMessage.listen((msg) => {
  if (msg === '') {
    return;
  }
  toast(msg);
  toastMessage.set('');
});

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      gutter={4}
      containerStyle={{
        position: 'relative',
        top: 'unset',
        bottom: 'unset',
        left: 'unset',
        right: 'unset',
        width: '100%',
      }}
      toastOptions={{
        className: 'toast',
      }}
    />
  );
};

export default Toast;
