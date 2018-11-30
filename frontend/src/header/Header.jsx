import React from 'react';
import Navigasjon from './Navigasjon';
import './header.css';
export const Header = ({storyline, username}) => {
  const visHistorie = () => {

  }
  const visRom = () => {

  }
  return(
    <header className="App-header">
      <Navigasjon username={username} />
      <div className='header-storyline'>
          <p className='header-storyline-text'>{storyline}</p>
      </div>
    </header>
  )
}
