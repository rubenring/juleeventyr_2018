import React from 'react';
import olakari from '../norge_400x400.jpg';

export const Header = (props) => {
  return(
    <header className="App-header" style={{height: '250px'}}>
      <div className='user-container' style={{height: '150px'}}>
          <img style={{height: '100%'}} src={olakari} alt="olakri"/>
      </div>
      <h1 className="App-title">Velkommen til reisen gjennom Norge!</h1>
    </header>
  )
}
