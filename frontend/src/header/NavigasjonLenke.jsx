import React from 'react';
import { Link } from 'react-router-dom';

export const NavigasjonLenke = ({link, tekst}) => {
    return (
        <li 
          className='header-room-list-element'
        >
          <Link 
            className='roomLink'
            to={link}
          >
             {tekst}
          </Link>
        </li>
    );
}

export default NavigasjonLenke;