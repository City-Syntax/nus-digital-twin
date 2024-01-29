import React from 'react';
import Styles from '../styles/Navigation.module.scss';

const ButtonGroup = () => {
  return (
    <form onChange={(e) => console.log(e.target)} className={Styles['btn-group']}>
      <input type="radio" id="toggle-on" name="toggle" defaultChecked onClick={() => console.log('ON')} />
      <label htmlFor="toggle-on">On</label>
      <input type="radio" id="toggle-off" name="toggle" onClick={() => console.log('OFF')} />
      <label htmlFor="toggle-off">Off</label>
    </form>
  );
};

export default ButtonGroup;
