import React from 'react';

export const Hint = ({lightbulbs}) => {
  const showHint = () => {
    return lightbulbs.filter(x => {
      return x.on === true
    }).length === lightbulbs.length ? true : false;
  }
  return (
    showHint() ? <div className='text'>
      gnihtyrevE dna ,esrevinU ehT ,efiL fo noitseuQ etamitlU eht ot rewsnA eht
    </div> : null
  )
}
export default Hint;