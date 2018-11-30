import React from 'react';
import NavigasjonLenke from './NavigasjonLenke';

export const Navigasjon = ({username}) => {
    return (
      <ul className='header-room-list'>
        <NavigasjonLenke tekst='Gå til rom 1' link={`/page-one?username=${username}`} />
        <NavigasjonLenke tekst='Gå til rom 2' link={`/page-two?username=${username}`} />
        <NavigasjonLenke tekst='Gå til rom 3' link={`/page-three?username=${username}`} />
        <NavigasjonLenke tekst='Gå til rom 4' link={`/page-four?username=${username}`} />
        <NavigasjonLenke tekst='Gå til rom 5' link={`/page-five?username=${username}`} />
      </ul>
    );
}

export default Navigasjon;