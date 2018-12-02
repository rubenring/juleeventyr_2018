import React, { Component } from 'react';
import NavigasjonLenke from './NavigasjonLenke';

export class Navigasjon extends Component {
  constructor(props){
    super(props);
    this.state = {
      showLinks: true
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
            <NavigasjonLenke tekst='Gå til rom 1' link={`/page-one?username=${username}`} />
            <NavigasjonLenke tekst='Gå til rom 2' link={`/page-two?username=${username}`} />
            <NavigasjonLenke tekst='Gå til rom 3' link={`/page-three?username=${username}`} />
            <NavigasjonLenke tekst='Gå til rom 4' link={`/page-four?username=${username}`} />
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