import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { activeModel, toastMessage } from '../../store';
import Icons from '../Icons';

activeModel.listen((model) => {
  if (model === '') {
    toast('No building models selected', {
      className: 'notification notification--danger',
      duration: Infinity,
      id: 'building-models',
      icon: <Icons.Warning></Icons.Warning>,
    });
  } else {
    toast.dismiss('building-models');
  }
});

toastMessage.listen(({ msg, type }) => {
  if (!msg) {
    return;
  }

  switch (type) {
    case 'default':
      toast(msg);
      toastMessage.setKey('msg', '');
      break;
    case 'loading':
      toast.loading(msg, {
        id: 'loading-toast',
        duration: Infinity,
      });
      break;
    case 'loaded':
      toast.success(msg, {
        id: 'loading-toast',
        duration: 1500,
      });
      break;
  }
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
        className: 'notification',
      }}
    />
  );
};

export default Toast;
