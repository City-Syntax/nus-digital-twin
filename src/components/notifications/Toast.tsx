import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { toastMessage } from '../../store';

toastMessage.listen((newVal) => {
  if (newVal != '') {
    toast(newVal);
    toastMessage.set('');
  }
});

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      containerStyle={{
        position: 'relative',
        top: 'unset',
        bottom: 'unset',
        left: 'unset',
        right: 'unset',
        width: '100%',
      }}
    />
  );
};

export default Toast;
