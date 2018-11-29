import React from 'react';
import Lightbulb from './Lightbulb';

export const Lightbulbs = ({lightbulbs, changeLight}) => {
  
  const bulbs = lightbulbs.map(x => <Lightbulb key={x.id} {...x} changeLight={changeLight} />) 

  return (
    <div className='lightbulb_container'>
    {
      bulbs
    }
    
  </div>
  );
}
export default Lightbulbs;