import React, { Component } from 'react';
import NavigasjonLenke from './NavigasjonLenke';

export class Navigasjon extends Component {
  constructor(props){
    super(props);
    this.state = {
      showLinks: false
    }
    this.toggleLinks = this.toggleLinks.bind(this);
  }
  toggleLinks(){
    this.setState({
      showLinks: !this.state.showLinks
    })
  }
  render(){
    const { username } = this.props;
    return (
      <div className='room-link-container'>
        <div className='room-link-stylediv'>
          {this.state.showLinks ? <ul className='header-room-list'>
            <NavigasjonLenke tekst='Hvelv' link={`/page-one?username=${username}`} />
            <NavigasjonLenke tekst='Bøttekott' link={`/page-two?username=${username}`} />
            <NavigasjonLenke tekst='Vaktbu' link={`/page-three?username=${username}`} />
            <NavigasjonLenke tekst='kjeller' link={`/page-four?username=${username}`} />
            <NavigasjonLenke tekst='Gå til rom 5' link={`/page-five?username=${username}`} />
          </ul>: null}
          <div className='link-toggler' onClick={this.toggleLinks}>
            {this.state.showLinks ? <p>Lukk</p> : <p>Vis</p> }
          </div>
        </div>
      </div>
    );
  }  

}

export default Navigasjon;