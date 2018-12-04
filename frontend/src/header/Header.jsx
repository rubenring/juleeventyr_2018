import React from 'react';
import Navigasjon from './Navigasjon';
import Storyline from './Storyline';
import './header.css';
export const Header = ({storyline, username}) => {
  return(
    <header className="App-header">
      <Navigasjon username={username} />
      <Storyline storyline={storyline} />
    </header>
  )
}
