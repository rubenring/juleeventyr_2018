import React from 'react';
import lightbulbOn from '../content/lightbulb_on.png';
import lightbulbOff from '../content/lightbulb_off.png';

export const Lightbulb = ({id, on, changeLight}) => {
  return (
    <div className='lightbulb' onClick={() => changeLight(id)}>
        <img className='lightbulb_img' src={on ? lightbulbOn : lightbulbOff} alt='lightbulb'/>
    </div>
  );
}
export default Lightbulb;